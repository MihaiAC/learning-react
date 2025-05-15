# Simple gallery

Wanted to recreate the following gallery component (found in a Wordpress template):

- Display a collection of images, in a single column on < lg screens and in a single row on >= lg screens.

- On small screens, it's a simple flex-col. On larger screens, the images will continue off-screen to the right and scrolling up-down goes left-right instead. The scroll bar should also not be visible on large screens.

- On image hover, the image should shrink a little.

- On image hover, the image name should appear under the cursor and follow it until it leaves the image box.

- On right click on an image, the image name should disappear and the image should "turn" 180 and become a blurred version of itself. A custom description should appear in its center. On a second right click, the image returns to its previous behaviour.

- The cursor should be a tiny black point with a tiny transparent circle around it, which follows it around with a small but noticeable lag (deliberate choice).

## Additional features

- Smooth scroll;
