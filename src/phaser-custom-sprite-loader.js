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

        Image: require('../node_modules/phaser/src/gameobjects/image/Image'),
        Sprite: require('../node_modules/phaser/src/gameobjects/sprite/Sprite'),

        Factories: {
            Image: require('../node_modules/phaser/src/gameobjects/image/ImageFactory'),
            Sprite: require('../node_modules/phaser/src/gameobjects/sprite/SpriteFactory')
        },

        Creators: {
            Image: require('../node_modules/phaser/src/gameobjects/image/ImageCreator'),
            Sprite: require('../node_modules/phaser/src/gameobjects/sprite/SpriteCreator')
        }
    },
    Loader: {
        FileTypes: {
            ImageFile: require('../node_modules/phaser/src/loader/filetypes/ImageFile')
        },
        LoaderPlugin: require('../node_modules/phaser/src/loader/LoaderPlugin')
    },
    Math: {
        Between: require('../node_modules/phaser/src/math/Between')
    },
    Tweens: require('../node_modules/phaser/src/tweens')
};

//  Merge in the consts

Phaser = Extend(false, Phaser, CONST);

//  Export it

module.exports = Phaser;

global.Phaser = Phaser;
