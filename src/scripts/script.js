import 'jquery';
import 'slick-carousel';

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

  $('.slider--tablet').each(function(key, item) {
    var sliderIdName = 'slider--tablet-' + key;
    var sliderNavIdName = 'slider--content-' + key;

    this.id = sliderIdName;
    $('.slider--content')[key].id = sliderNavIdName;

    var sliderId = '#' + sliderIdName;
    var sliderNavId = '#' + sliderNavIdName;

    $(sliderId)
      .slick({
        rows: 0,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        infinite: false,
        initialSlide: 0,
        // asNavFor: '.slider--content'
        asNavFor: sliderNavId
      })
      .on('afterChange', (event, slick, currentSlide) => {
        slick.$slides.each(function(indx) {
          if (indx !== currentSlide) {
            $(this)
              .find('.image--content img')
              .removeClass('animate');
          } else {
            $(this)
              .find('.image--content img')
              .addClass('animate');
          }
        });

        // slick.$slides
        //   .eq(currentSlide)
        //   .find('.image--content img')
        //   .addClass('animate');
      });

    $(sliderNavId)
      .slick({
        rows: 0,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dots: true,
        infinite: false,
        initialSlide: 0,
        // asNavFor: '.slider--tablet'
        asNavFor: sliderId
      })
      .on('afterChange', (event, slick, currentSlide) => {
        if (slick.$slides.length - 1 == currentSlide) {
          mouseWheelReturn(slick);
        }
      });
  });

  // $('.slider--tablet')
  //   .slick({
  //     rows: 0,
  //     slidesToShow: 1,
  //     slidesToScroll: 1,
  //     arrows: false,
  //     fade: true,
  //     infinite: false,
  //     initialSlide: 0,
  //     // asNavFor: '.slider--content'
  //     asNavFor: $(this)
  //       .parent('.block')
  //       .find('.slider--content')
  //   })
  //   .on('afterChange', (event, slick, currentSlide) => {
  //     console.log(currentSlide);
  //   });

  // $('.slider--content')
  //   .slick({
  //     rows: 0,
  //     slidesToShow: 1,
  //     slidesToScroll: 1,
  //     arrows: false,
  //     dots: true,
  //     infinite: false,
  //     initialSlide: 0,
  //     // asNavFor: '.slider--tablet'
  //     asNavFor: $(this)
  //       .parent('.block')
  //       .find('.slider--tablet')
  //   })
  //   .on('afterChange', (event, slick, currentSlide) => {
  //     if (slick.$slides.length - 1 == currentSlide) {
  //       mouseWheelReturn(slick);
  //     }
  //   });

  function mouseWheel($slider) {
    $(window).on('wheel', { $slider: $slider }, mouseWheelHandler);
  }
  function mouseWheelReturn($slider) {
    // if($slider.$slider.index() < 2) {
    //   $(window).scrollTop($slider.$slider.next('.slider').attr('data-st') - $(document.body).attr('wh')/2)
    // }
    $(window).off('wheel');
  }
  function mouseWheelHandler(event) {
    event.preventDefault();
    const $slider = event.data.$slider;
    const delta = event.originalEvent.deltaY;
    if (delta < 0) {
      $slider.slick('slickPrev');
    } else {
      $slider.slick('slickNext');
    }
  }

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

  function addSt() {
    animObj.each(function(index, element) {
      // element == this
      $(element).attr('data-st', parseInt($(element).offset().top));

      if ($(element).attr('data-st') < 700) {
        addAnimateCSS(element, $(element).attr('data-animation'));
        $(element).attr('data-emergence', 'visible');
      }
    });
  }

  $('.slider').on('init', function(event, slick) {
    addSt();
  });

  addSt();

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
