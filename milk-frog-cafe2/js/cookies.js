/* cookies.js - remember visits and regular customers */
$(function () {
  function setCookie(key, value, days) {
    var d = new Date();
    d.setDate(d.getDate() + days);
    document.cookie = key + '=' + encodeURIComponent(value) +
      '; expires=' + d.toUTCString() + '; path=/';
  }

  function getCookie(key) {
    var parts = document.cookie.split('; ');
    for (var i = 0; i < parts.length; i++) {
      var pair = parts[i].split('=');
      if (pair[0] === key) return decodeURIComponent(pair[1]);
    }
    return '';
  }

  // home page: count how many times this browser has visited
  var $count = $('#visit-count');
  if ($count.length) {
    var visits = (parseInt(getCookie('visits'), 10) || 0) + 1;
    setCookie('visits', visits, 30);
    $count.text(visits === 1
      ? 'First visit? Make yourself at home.'
      : 'Welcome back! This is visit number ' + visits + '.');
  }

  // order page: fill in details for returning customers
  if ($('#order-form').length) {
    var name = getCookie('customerName');
    if (name) {
      $('#name').val(name);
      $('#email').val(getCookie('customerEmail'));
      $('#welcome-back').removeAttr('hidden')
        .text('Welcome back, ' + name + ' - your details are filled in.');
    }
    $('#order-form').on('submit', function () {
      setCookie('customerName', $('#name').val(), 30);
      setCookie('customerEmail', $('#email').val(), 30);
    });
  }
});
