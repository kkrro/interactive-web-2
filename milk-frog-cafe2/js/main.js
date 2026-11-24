/* ============================================================
   main.js - Member A: menu click-to-reveal animation + lightbox
   (jQuery CDN is loaded with defer in each page)
   ============================================================ */
$(function () {
  // Theory note (Shneiderman golden rules):
  // rule 2 shortcuts:  Escape key closes the lightbox instantly
  // rule 3 feedback:   every click is answered with an animation
  // rule 6 reversal:   open cards can be closed again by clicking
  // rule 7 control:    nothing animates unless the user initiates it
  // ---- Menu page: click a drink card, slideDown reveals details ----
  // Layered animation: (1) panel slides down, (2) inner items slide in
  // from the right one after another, (3) other cards dim to keep focus.
  $('.card-head').on('click', function () {
    var $btn = $(this);
    var $detail = $('#' + $btn.attr('aria-controls'));
    var $card = $btn.closest('.card-drink');
    var isOpen = $btn.attr('aria-expanded') === 'true';

    // close any open card first (only one stays open - consistency)
    $('.card-head[aria-expanded="true"]').not($btn).attr('aria-expanded', 'false')
      .closest('.card-drink').removeClass('dimmed')
      .find('.card-detail').slideUp(250).attr('hidden', true).removeClass('open');

    if (isOpen) {
      // reverse everything: rule 6, easy reversal of actions
      $detail.removeClass('open').slideUp(300, function () { $detail.attr('hidden', true); });
      $btn.attr('aria-expanded', 'false');
      $card.removeClass('dimmed');
    } else {
      $btn.attr('aria-expanded', 'true');
      $detail.removeAttr('hidden').hide().slideDown(350);
      // dim the other cards so the opened one stands out
      $('.card-drink').not($card).addClass('dimmed');
      $card.removeClass('dimmed');
      // stagger the inner items after the panel has opened
      setTimeout(function () { $detail.addClass('open'); }, 260);
    }
  });

  // ---- Hero parallax (Home page): the mascot and text drift gently
  //      in opposite directions as the mouse moves - adds depth.
  var $mascot = $('.hero-mascot'), $text = $('.hero-text');
  if ($mascot.length) {
    $('.hero').on('mousemove', function (e) {
      var $el = $(this), off = $el.offset();
      var dx = (e.pageX - off.left - $el.width() / 2) / $el.width();
      var dy = (e.pageY - off.top - $el.height() / 2) / $el.height();
      $mascot.css('transform', 'translate(' + (dx * 18) + 'px,' + (dy * 14) + 'px)');
      $text.css('transform', 'translate(' + (dx * -10) + 'px,' + (dy * -8) + 'px)');
    });
    $('.hero').on('mouseleave', function () {
      $mascot.css('transform', 'translate(0,0)');
      $text.css('transform', 'translate(0,0)');
    });
  }

  // ---- Nav shrink on scroll + menu cards scroll-reveal
  //      IntersectionObserver = native browser API, no extra library.
  var $nav = $('.nav-main');
  $(window).on('scroll', function () {
    $nav.toggleClass('shrink', $(window).scrollTop() > 40);
  });

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          $(en.target).addClass('in-view');
          io.unobserve(en.target);   // animate once, then stop watching
        }
      });
    }, { threshold: 0.15 });
    $('.card-drink').each(function () { io.observe(this); });
  } else {
    $('.card-drink').addClass('in-view');   // fallback for old browsers
  }

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
