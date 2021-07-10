/**
 * @file
 * Gallery formatter integration with Backdrop module.
 */
(function ($) {
  Backdrop.behaviors.galleryformatter = {
    attach: function (context, settings) {
      var $images = $('.galleryformatter img', context);
      var total_images = $images.length;
      var loaded_images = 0;
      $images.each(function () {
        var img = new Image();
        img.onload = function () {
          loaded_images++;
          if (loaded_images == total_images) {
            $('.galleryformatter:not(.gallery-processed)', context).each(function () {
              Backdrop.galleryformatter.prepare(this);
            }).addClass('gallery-processed');
          }
        }
        img.src = $(this, context).attr('src');
      });
    }
  };

  Backdrop.galleryformatter = Backdrop.galleryformatter || {};

  // setting up the main behaviour
  Backdrop.galleryformatter.prepare = function(el) {
    // var $settings = Backdrop.settings.galleryformatter;
    $el = $(el);
    var $slides = $('li.gallery-slide', $el);
    var $slide_container = $('div.gallery-slides', $el);

    var $thumbs = $('.gallery-thumbs', $el);
    var $thumbs_li = $('li', $thumbs);
    var thumb_width = $thumbs_li.filter(':first').width() + 'px';
    var li_width = $thumbs_li.outerWidth(); // includes padding
    var $wrapper = $('.wrapper', $el);
    var visible_width = $wrapper.outerWidth();

    /*
     * Only start the thumbs carrousel if needed
     */
    if (($thumbs_li.size() * li_width) > $thumbs.width()) {
      $('ul', $thumbs).width('99999px');
      $thumbs.infiniteCarousel();
      $thumbs_li = $('li', $thumbs); // we need to reselect because infiniteCarousel inserts new empty li elements if necessary
      // we need to reselect because infiniteCarousel inserts new empty li elements if necessary
      $el = $(el);
      $thumbs_li = $('.gallery-thumbs ul li', $el);
    }

    $thumbs_li = $('li', $thumbs); // we need to reselect because infiniteCarousel inserts new empty li elements if necessary

    $thumbs_li.each(function(){
      $(this).css({
          width: thumb_width
        });
    });
    var $thumbslinks = $('a', $thumbs_li);

    /*
     * @TODO:
     * figure out how to get this into proper functions reusing selections
     */
    $thumbslinks.click(function(e){
      $hash = $(this.hash);
      if(!$hash.is(':visible')){
        $thumbs_li.removeClass('active');
        $(this).parent().addClass('active');
        $slides.filter(':visible').fadeOut('slow');
        $hash.fadeIn('slow');
        // set the slide container's height to allow use of portrait images
        $slide_container.css("height",$hash.find('img').height());
        /*
         * @FIXME
         * Need to figure out a way to update the location bar of the browser, for bookmarking etc, without making the scroll jump
         * window.location.hash = this.hash; solution below does update the location, but makes the scroll jump.
         */
        // window.location.hash = this.hash;  // not sure if this is the best way to do it.
      }
      e.preventDefault();
    });

    /*
     *  Startup behaviour (when the page first loads)
     */
    if ($slides.length > 1) {
      $slides.hide(); // hide all slides
    }
    var $location_hash = window.location.hash; // if we are being deeplinked to a specific slide, capture that

    function show_first_slide(){
      // Activate the first slide
      $('a', $thumbs_li.filter('.slide-0:not(".cloned")')).trigger('click');
     }

    // if we have a hash in the url
    if ($location_hash) {
      var $slide_to_show = $slides.filter($location_hash);
      // if the hash corresponds to one of our slides
      if ($slide_to_show .length > 0) {
        $slide_to_show .show(); //  show that slide
        $thumbs_li.not($(".cloned")).find("a[href="+$location_hash+"]").parent().addClass('active'); // activate that thumbnail
        // set the slide container's height to allow use of portrait images
        $slide_container.css("height", $slide_to_show .find('img').height());
      }
      // otherwise the default
      else {
        show_first_slide();
      }
    }
    // otherwise the default
    else {
      show_first_slide();
    }

    /*
     * Create a public interface to move to the next and previous images
     */
    // Shows the previous slide and scrolls to the previous page if necessary
    $thumbs.bind('showPrev', function (event) {
      var currentScroll = $wrapper.get(0).scrollLeft;
      var $prev_thumb_li = $thumbs_li.filter('.active').prev(':not(".cloned, .empty, .active")');
      // if no results we are on the first element
      if(!$prev_thumb_li.size()) {
        // select the last one
        $prev_thumb_li = $thumbs_li.not('.empty, .cloned').filter(':last');
      }
      var $slide_to_click = $('a', $prev_thumb_li);
      var $prev_is_visible = (($prev_thumb_li.get(0).offsetLeft >= currentScroll) && ($prev_thumb_li.get(0).offsetLeft <= (visible_width + currentScroll)));
      if($prev_is_visible) {
        $slide_to_click.trigger('click');
      }
      else {
        $thumbs.trigger('prev');
        $slide_to_click.trigger('click');
      }
    });
    // Shows the next slide and scrolls to the next page if necessary
    $thumbs.bind('showNext', function (event) {
      var currentScroll = $wrapper.get(0).scrollLeft;
      // this selector could be optimized perhaps, but
      var $next_thumb_li = $thumbs_li.filter('.active').next(':not(".cloned, .empty, .active")');
      // if no results we are on the last element
      if(!$next_thumb_li.size()) {
        // select the first one
        $next_thumb_li = $thumbs_li.not('.empty, .cloned').filter(':first');
      }

      var $slide_to_click = $('a', $next_thumb_li);
      var $next_is_visible = (($next_thumb_li.get(0).offsetLeft >= currentScroll) && ($next_thumb_li.get(0).offsetLeft <= (visible_width + currentScroll)));
      if($next_is_visible) {
        var $slide_to_click = $('a', $next_thumb_li);
        $('a', $next_thumb_li).trigger('click');
      }
      else {
        $thumbs.trigger('next');
        $slide_to_click.trigger('click');
      }
    });

    $('.shownext + img', $slide_container).click(function(){
      $thumbs.trigger('showNext');
    });

    if ($slides.length > 1) {
      // Setup buttons for next/prev slide
      $slide_buttons = ('<a href="#" class="prev-slide slide-button" title="'+ Backdrop.t('Previous image') +'">&lt;</a><a href="#" class="next-slide slide-button" title="'+ Backdrop.t('Next image') +'">&gt;</a>');
      $('.gallery-slides', $el).append($slide_buttons);
      // Trigger the appropiate events on click
      $('a.prev-slide', $el).click(function(e){
        e.preventDefault();
        $thumbs.trigger('showPrev');
      });
      $('a.next-slide', $el).click(function(e){
        e.preventDefault();
        $thumbs.trigger('showNext');
      });
    }
  }
})(jQuery);