/* ============================================================
   main.js - Member A: menu click-to-reveal animation + lightbox
   (jQuery CDN is loaded with defer in each page)
   ============================================================ */
$(function () {
  // ---- Menu page: click a drink card, slideDown reveals details ----
  $('.card-head').on('click', function () {
    var $btn = $(this);
    var $detail = $('#' + $btn.attr('aria-controls'));
    var isOpen = $btn.attr('aria-expanded') === 'true';

    if (isOpen) {
      $detail.slideUp(300, function () { $detail.attr('hidden', true); });
      $btn.attr('aria-expanded', 'false');
    } else {
      // only one card open at a time keeps the page tidy
      $('.card-detail[hidden!="hidden"]').slideUp(250).attr('hidden', true);
      $('.card-head[aria-expanded="true"]').attr('aria-expanded', 'false');
      $detail.removeAttr('hidden').hide().slideDown(350);
      $btn.attr('aria-expanded', 'true');
    }
  });

  // ---- Gallery page: lightbox ----
  var $lb = $('#lightbox');
  $('.gal-btn').on('click', function () {
    $('#lb-img').attr({ src: $(this).data('src'), alt: $(this).data('name') + ' - full size view' });
    $lb.removeAttr('hidden').hide().fadeIn(250);
    $('.lb-close').trigger('focus');
  });
  function closeLb() { $lb.fadeOut(200, function () { $lb.attr('hidden', true); }); }
  $('.lb-close').on('click', closeLb);
  $(document).on('keyup', function (e) { if (e.key === 'Escape') closeLb(); });
});
