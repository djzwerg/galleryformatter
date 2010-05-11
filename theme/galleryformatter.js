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

  var $thumbs = $('.gallery-thumbs', $el);
  var $thumbsLi = $('li', $thumbs);
  var thumbWidth = $thumbsLi.filter(':first').width() + 'px';

  $thumbs.infiniteCarousel();

  $thumbsLi = $('li', $thumbs); // we need to reselect because infiniteCarousel inserts new empty li elements if necessary

  $thumbsLi.each(function(){
    $(this).css({
        width: thumbWidth,
      });
  });
  var $thumbslinks = $('a', $thumbsLi);

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
