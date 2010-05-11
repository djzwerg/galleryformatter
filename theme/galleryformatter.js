// $Id$

Drupal.behaviors.galleryformatter = function (context) {
  $('.galleryformatter:not(.gallery-processed)', context).each(function(){
    Drupal.galleryformatter.prepare(this);

  }).addClass('gallery-processed');
};

Drupal.galleryformatter = Drupal.galleryformatter || {};

// setting up the main behaviour
Drupal.galleryformatter.prepare = function(el) {
  // var $settings = Drupal.settings.galleryformatter;
  $el = $(el);
  var $slides = $('li.gallery-slide', $el);
  var $slideContainer = $('div.gallery-slides', $el);
  $single = $slideContainer.filter(':first');
  var slideHeight = Drupal.settings.galleryformatter.slideheight + 'px';
  var slideWidth =  Drupal.settings.galleryformatter.slidewidth + 'px';
  //var slideHeight = $single.outerHeight() + 'px';
  //var slideWidth = $single.outerWidth() + 'px';
  $thumbs = $('.gallery-thumbs', $el);
  var thumbHeight = $thumbs.filter(':first').outerHeight() + 'px';
  // give our thumbs wrapper a fixed width equal to the slide
  $thumbs.css({ width: slideWidth, });
  $thumbs.infiniteCarousel();
  $el = $(el);
  $thumbs = $('.gallery-thumbs', $el);
  var $thumbsLi = $('li', $thumbs).each(function(){
    $(this).css({
        height: Drupal.settings.galleryformatter.thumbheight + 'px',
        width: Drupal.settings.galleryformatter.thumbwidth + 'px',
      });
  });
  var $thumbslinks = $('.gallery-thumbs li a', $thumbs);
  var $thumbslinks = $('.gallery-thumbs li a');



  // give our slide containers a fixed height
   $('div.gallery-frame', $el).each(function(){
    $(this).css("height", slideHeight);
  });



  /*
   * @TODO:
   * figure out how to get this into proper functions reusing selections
   */
  $slides.hide();
  $thumbslinks.click(function(e){
    $hash = $(this.hash);
    if(!$hash.is(':visible')){
      $thumbsLi.removeClass('active');
      $(this).parent().addClass('active');
      $slides.filter(':visible').fadeOut('slow');
      $hash.fadeIn('slow');
      window.location.hash = this.hash;  // not sure if this is the best way to do it.
    }
    e.preventDefault();
  });

  var $locationHash = window.location.hash;
  if ($locationHash) {
   $thumbslinks.filter("[href="+$locationHash+"]").click();  // trigger click event if going directly to the url of one of the tabs
  }
  else {
   $('li.slide-0 a', $thumbs).click();  // trigger click event for our first item if url has no hash
  }
}
