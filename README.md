# Gallery formatter

## About this module

Gallery formatter provides a field formatter for image fields, which will turn any image field into a jQuery Gallery.

## Features

* Two imagecache presets which will work out of the box beautifully.
* The thumbnails run under an infinite carousel.
* Degrades gracefully without JS enabled, the gallery still works.
* Integrated out of the box with thickbox (not ported yet), colorbox (recommended as the thickbox upgrade path), shadowbox (not ported yet) and lightbox2 (not ported yet) for the view full links.
* Works with the swfupload (not ported yet), image_fupload (not ported yet), and imagefield_crop widgets (not ported yet).
* A hook for modules to provide styles for the galleries.
* Two options for styles, no style and a green arrows style. No style should be used for developing your own styles.
* Source svgs for the green arrows style, so you can use it as an example to expand on, using [inkscape](https://inkscape.org/) for example.
* Fully themeable through tpl file, overriding the template_preprocess, or just CSS. You should know what you are doing if you do so.

## Requirements

* This module has no requirements yet.

## Installation

* Install this module using the official Backdrop CMS instructions at
  https://backdropcms.org/guide/modules.

* Edit the field settings for your image field, select which slide imagecache preset and thumbnail imagecache preset you would like to use. 
  Select the jQuery Gallery formatter in the display section for your imagefield.

## Issues

  Bugs and Feature requests should be reported in the Issue Queue:
  https://github.com/backdrop-contrib/galleryformatter/issues.

## Current Maintainers

* Seeking maintainers.

## Credits

* Ported to Backdrop by [djzwerg](https://github.com/djzwerg)
* Originally developed for Drupal by [manuee](https://github.com/manuee)

## License

This project is GNU GPL v2 software. See the LICENSE.txt file in this directory for complete text.
