/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2019 Photon Storm Ltd.
 * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
 */

require('../node_modules/phaser/src/polyfills');

var CONST = require('../node_modules/phaser/src/const');
var Extend = require('../node_modules/phaser/src/utils/object/Extend');

/**
 * @namespace Phaser
 */

var Phaser = {

   Cameras: {
       Scene2D: require('../node_modules/phaser/src/cameras/2d')
   },
   Events: require('../node_modules/phaser/src/events/EventEmitter'),
   Game: require('../node_modules/phaser/src/core/Game'),
   GameObjects: {
       DisplayList: require('../node_modules/phaser/src/gameobjects/DisplayList'),
       UpdateList: require('../node_modules/phaser/src/gameobjects/UpdateList'),
       Graphics: require('../node_modules/phaser/src/gameobjects/graphics/Graphics.js'),
       Factories: {
           Graphics: require('../node_modules/phaser/src/gameobjects/graphics/GraphicsFactory')
       },
       Creators: {
           Graphics: require('../node_modules/phaser/src/gameobjects/graphics/GraphicsCreator')
       }
   },
   Math: {
        Between: require('../node_modules/phaser/src/math/Between')
   }
};

//  Merge in the consts

Phaser = Extend(false, Phaser, CONST);

//  Export it

module.exports = Phaser;

global.Phaser = Phaser;
