<?php
// $Id$
/**
 * @file
 * Template file for the galleryformatter default formatter
 */

/**
 * Only edit this file for switching order of the slides info, adding classes or other minor changes within the overall html structure.
 * KEEP the original html structure or you'll run into problems with the JS.
 * IDs on the slides and the hash for the thumb links MUST be there for the gallery to function.
 *
 * Available variables:
 *
 * $gallery_slide_height
 * $gallery_slide_width
 * $gallery_thumb_height
 * $gallery_thumb_width
 * $gallery_slides - Array containing all slide images, a link to the original and its sanatized title & description ready to print
 * $gallery_thumbs - Array containing all thumbnail images ready to print
 */
?>
<?php if (count($gallery_slides) > 1): ?>
<div class="galleryformatter galleryview <?php print $gallery_style ?>">
  <div class="gallery-slides" style="width: <?php print $gallery_slide_width; ?>px;">
    <div class="gallery-frame">
      <ul>
      <?php foreach ($gallery_slides as $id => $data): ?>
        <li class="gallery-slide" id="slide-<?php print $id; ?>">
          <?php print $data['link_to_original']; ?>
          <?php print $data['image']; ?>
          <?php if ($data['title'] || $data['description']): ?>
            <div class="panel-overlay">
              <div class="overlay-inner">
                <?php if ($data['title']): ?><h3><?php print $data['title']; ?></h3><?php endif; ?>
                <?php if ($data['description']): ?><p><?php print $data['description']; ?></p><?php endif; ?>
              </div>
            </div>
          <?php endif; ?>
        </li>
      <?php endforeach; ?>
      </ul>
    </div>
  </div>
  <div  class="gallery-thumbs">
    <div class="wrapper">
      <ul>
        <?php foreach ($gallery_thumbs as $id => $image): ?>
          <li class="slide-<?php print $id; ?>" style="width: <?php print $gallery_thumb_width; ?>px;"><a href="#slide-<?php print $id; ?>"><?php print $image; ?></a></li>
        <?php endforeach; ?>
      </ul>
    </div>
  </div>
</div>
<?php endif; ?>
