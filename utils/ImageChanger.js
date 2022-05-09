/*
 *  file: ImageChanger.js
 *  author: Rinku Ansari <raf122@uregina.ca>
 *  version: 0.1
 *  date-created: apr-22-2022
 *  last-modified: apr-22-2022
 */

export function getImageSource(target) {
    /**
       * getImageSource
       * Purpose: Define the different values for sources of Egg Button image.
``*/
  switch (target) {
    case "win": return require('../assets/egg-hatch-win.gif');
    case "default": return require('../assets/egg.png');
  }
}