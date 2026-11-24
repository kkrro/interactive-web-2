/* ============================================================
   validate.js - Member C: order form validation + DOM update
   ============================================================ */
$(function () {
  var $form = $('#order-form');

  function setError($field, $err, msg) {
    $err.text(msg);
    $field.toggleClass('invalid', msg !== '');
  }

  function validateField(id, errId) {
    var $f = $('#' + id), $e = $('#' + errId), v = $.trim($f.val());
    var msg = '';
    if (id === 'name' && v === '') msg = 'Please tell Naiwa your name.';
    if (id === 'email') {
      if (v === '') msg = 'Email is required.';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) msg = 'That email does not look right.';
    }
    if (id === 'phone') {
      if (v === '') msg = 'Phone number is required.';
      else if (!/^[\d\s+()-]{7,15}$/.test(v)) msg = 'Please enter a valid phone number (7-15 digits).';
    }
    if (id === 'drink' && v === '') msg = 'Choose a drink first.';
    if (id === 'cups') {
      if (v === '') msg = 'How many cups?';
      else {
        var n = Number(v);
        if (!Number.isInteger(n) || n < 1 || n > 20) msg = 'Cups must be a whole number between 1 and 20.';
      }
    }
    if (id === 'date') {
      if (v === '') msg = 'Pick a pickup date.';
      else if (new Date(v) < new Date(new Date().toDateString())) msg = 'Pickup date cannot be in the past.';
    }
    setError($f, $e, msg);
    return msg === '';
  }

  // validate on blur + input, so users get instant feedback
  ['name','email','phone','drink','cups','date'].forEach(function (id) {
    $('#' + id).on('blur change', function () { validateField(id, 'err-' + id); });
    $('#' + id).on('input', function () {
      if ($('#err-' + id).text() !== '') validateField(id, 'err-' + id);
    });
  });

  $form.on('submit', function (e) {
    e.preventDefault();
    var ok = ['name','email','phone','drink','cups','date']
      .map(function (id) { return validateField(id, 'err-' + id); })
      .every(Boolean);

    if (!ok) {
      $('.invalid').first().trigger('focus');
      return;
    }

    // build the confirmation summary and append it to the DOM
    var $c = $('#confirmation');
    $c.html(
      '<h2>Order Confirmed - Naiwa received it!</h2>' +
      '<ul>' +
      '<li><strong>Name:</strong> ' + $.trim($('#name').val()) + '</li>' +
      '<li><strong>Drink:</strong> ' + $('#drink').val() + ' &times; ' + $('#cups').val() + '</li>' +
      '<li><strong>Pickup:</strong> ' + $('#date').val() + '</li>' +
      '</ul>' +
      '<p>We will email ' + $.trim($('#email').val()) + ' when it is ready. Do not look at us like that.</p>'
    );
    $c.removeAttr('hidden').hide().slideDown(350);
    $c[0].scrollIntoView({ behavior: 'smooth' });
  });
});
