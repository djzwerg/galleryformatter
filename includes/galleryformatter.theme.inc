<?php
// $Id$

/**
 * @file
 * Provides theme preprocess for the galleryformatter default formatter
 */

/**
 * Preprocess function for galleryformatter.tpl.php
 */
function template_preprocess_galleryformatter_formatter_galleryformatter_default(&$vars) {
  // grab the widget settings for for both image cache presets we will be using later
  $widget = galleryformatter_get_field_settings($vars['element']['#field_name']);
  $thumb_preset = $widget['thumb_preset'];
  $slide_preset = $widget['slide_preset'];
  $style = $widget['style'];

  // ONLY do something if both of these presets are set for this field
  if (isset($thumb_preset) && ($thumb_preset !== '0') && isset($slide_preset) && ($slide_preset !== '0')) {
    $children = element_children($vars['element']);
    foreach ($children as $key) {
      $items[] = $vars['element'][$key]['#item'];
    }
    // Setup our arrays of variables for the template file to use
    foreach ($items as $id => $field) {
      // Grab and sanitize image information
      $description = check_plain($field['data']['description']);
      $title = check_plain($field['data']['title']);
      $filename = $field['filename'];
      $filepath = $field['filepath'];

      // default alt attribute is a good thing
      $alt = ($field['data']['alt']) ? check_plain($field['data']['alt']) : $filename;
      $img_attributes = array('alt' => $alt, );

      // prepare slides
      $slides[$id]['image'] = theme('imagecache', $slide_preset, $filepath, $filename, $title, $img_attributes);
      $slides[$id]['title'] = $title;
      $slides[$id]['description'] = $description ;
      $slides[$id]['filepath'] = $filepath;

      // prepare link to the original file
      $link_attributes = array(
        'title' => $title,
        'class' => 'view-full',
      );
      if (module_exists('colorbox')) {
        $link_attributes['class'] .= ' colorbox';
      }
      if (module_exists('thickbox')) {
        $link_attributes['class'] .= ' thickbox';
      }
      if (module_exists('shadowbox')) {
        $link_attributes['rel'] = 'shadowbox';
      }
      $slides[$id]['link_to_original'] = l(t('View original'), $filepath, array('attributes' => $link_attributes));

      // setup thumbnail images
      $thumbs[$id] = theme('imagecache', $thumb_preset, $filepath, $filename, $title, $img_attributes);
    }

    // insert into the variables for the template file
    $vars['gallery_thumbs'] = $thumbs;
    $vars['gallery_slides'] = $slides;

    // starting to get the images width and height for use by the template
    $image_path = $slides[0]['filepath']; // an image path to get image dimensions from

    // grab the thumb image info
    if (file_exists($image_path)) {
      $thumb_image = image_get_info(imagecache_create_path($thumb_preset, $image_path));
      // set it up for the template to use
      $vars['gallery_thumb_height'] = $thumb_image['height'];
      $vars['gallery_thumb_width'] = $thumb_image['width'];

      // grab the slide image info
      $slide_image = image_get_info(imagecache_create_path($slide_preset, $image_path));
      // set it up for the template to use
      $vars['gallery_slide_height'] = $slide_image['height'];
      $vars['gallery_slide_width'] = $slide_image['width'];
    }
    $vars['gallery_style'] = 'galleryformatter-'. drupal_strtolower($style);

    // add the necessary JS and CSS files
    $modulepath = drupal_get_path('module', 'galleryformatter');
    /**
     * @todo:
     * Give our js some settings maybe
     * Give users some options on click vs. hover?
     */
/*
    $settings = array();
    $settings['galleryformatter']['settingname'] = 'settingvalue';
    drupal_add_js($settings, 'setting');
*/
    drupal_add_js($modulepath .'/theme/infiniteCarousel.js');
    drupal_add_js($modulepath .'/theme/galleryformatter.js');
    galleryformatter_add_css($style);
  }

}
