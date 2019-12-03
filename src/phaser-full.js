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

    Actions: require('../node_modules/phaser/src/actions'),
    Animations: require('../node_modules/phaser/src/animations'),
    Cache: require('../node_modules/phaser/src/cache'),
    Cameras: require('../node_modules/phaser/src/cameras'),
    Core: require('../node_modules/phaser/src/core'),
    Class: require('../node_modules/phaser/src/utils/Class'),
    Create: require('../node_modules/phaser/src/create'),
    Curves: require('../node_modules/phaser/src/curves'),
    Data: require('../node_modules/phaser/src/data'),
    Display: require('../node_modules/phaser/src/display'),
    DOM: require('../node_modules/phaser/src/dom'),
    Events: require('../node_modules/phaser/src/events/EventEmitter'),
    Game: require('../node_modules/phaser/src/core/Game'),
    GameObjects: require('../node_modules/phaser/src/gameobjects'),
    Geom: require('../node_modules/phaser/src/geom'),
    Input: require('../node_modules/phaser/src/input'),
    Loader: require('../node_modules/phaser/src/loader'),
    Math: require('../node_modules/phaser/src/math'),
    Physics: require('../node_modules/phaser/src/physics'),
    Plugins: require('../node_modules/phaser/src/plugins'),
    Renderer: require('../node_modules/phaser/src/renderer'),
    Scale: require('../node_modules/phaser/src/scale'),
    Scene: require('../node_modules/phaser/src/scene/Scene'),
    Scenes: require('../node_modules/phaser/src/scene'),
    Sound: require('../node_modules/phaser/src/sound'),
    Structs: require('../node_modules/phaser/src/structs'),
    Textures: require('../node_modules/phaser/src/textures'),
    Tilemaps: require('../node_modules/phaser/src/tilemaps'),
    Time: require('../node_modules/phaser/src/time'),
    Tweens: require('../node_modules/phaser/src/tweens'),
    Utils: require('../node_modules/phaser/src/utils')

};

//   Merge in the consts

Phaser = Extend(false, Phaser, CONST);

//  Export it

module.exports = Phaser;

global.Phaser = Phaser;

/*
 * "Documentation is like pizza: when it is good, it is very, very good;
 * and when it is bad, it is better than nothing."
 *  -- Dick Brandon
 */
