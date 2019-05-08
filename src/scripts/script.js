import 'jquery';

function addAnimateCSS(element, animationName) {
  var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
  $(element)
    .addClass('animated ' + animationName)
    .one(animationEnd, function() {
      // $(element).removeClass('animated ' + animationName);
    });
}

(function($) {
  $.fn.changeAttr = function(cb, e) {
    e = e || {
      subtree: true,
      childList: true,
      characterData: true
    };
    $(this).each(function() {
      function callback(changes) {
        cb.call(node, changes, this);
      }
      var node = this;
      new MutationObserver(callback).observe(node, e);
    });
  };
})(jQuery);

window.onbeforeunload = function() {
  window.scrollTo(0, 0);
};

$(document).ready(function() {
  var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';

  $('.scroll').text(0);
  $(this, document.body, '.page').scrollTop(0);
  // $(document.body).scrollTop();

  $(document.body).attr('st', '');
  $(document.body).attr('wh', $(window).height());

  setTimeout(() => {
    $('.tablet--first')
      .addClass('animated slideInUp')
      .attr('data-emergence', 'visible')
      .one(animationEnd, function() {
        $(this)
          .find('.image--content img')
          .addClass('animate');
      });
  }, 1000);

  $(window).scroll(function() {
    $('.scroll').text($(this).scrollTop());
    $(document.body).attr('st', $(this).scrollTop());
  });

  $('.image--object').each(function(index, element) {
    // element == this
    $(element).attr({
      'data-factor-x': Math.random(),
      'data-factor-y': Math.random()
    });
  });

  $(window).mousemove(function(e) {
    var change;
    var xpos = e.clientX;
    var ypos = e.clientY;

    $('.image--object').each(function(index, element) {
      // element == this
      var factorX = $(element).attr('data-factor-x');
      var factorY = $(element).attr('data-factor-y');

      $(element).css('transform', 'translate(' + (xpos * factorX) / 50 + '% ,' + (ypos * factorY) / 80 + '%');
    });
  });

  var animObj = $('[data-emergence]');

  animObj.each(function(index, element) {
    // element == this
    $(element).attr('data-st', parseInt($(element).offset().top));

    if ($(element).attr('data-st') < 700) {
      addAnimateCSS(element, $(element).attr('data-animation'));
      $(element).attr('data-emergence', 'visible');
    }
  });

  $(window).on('DOMSubtreeModified', document.body, function() {
    var st = parseInt($('body').attr('st'));
    var wh = parseInt($('body').attr('wh')) / 2;
    animObj.not('.animated').each(function(index, element) {
      var stEl = parseInt($(element).attr('data-st'));
      if (stEl >= st - wh && stEl < st + wh) {
        addAnimateCSS(element, $(element).attr('data-animation'));
        $(element).attr('data-emergence', 'visible');
        if ($(element).hasClass('slider--content')) {
          mouseWheel($(element));
        }
      }
    });
  });
});
