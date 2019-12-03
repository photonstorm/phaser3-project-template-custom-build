# Phaser 3 Webpack Project Template with custom Phaser Build

A Phaser 3 project template with ES6 support via [Babel 7](https://babeljs.io/) and [Webpack 4](https://webpack.js.org/)
that includes hot-reloading for development and production-ready builds.

Loading images via JavaScript module `import` is also supported, or are copied from the `assets` folder.

## Requirements

[Node.js](https://nodejs.org) is required to install dependencies and run scripts via `npm`.

## Available Commands

| Command | Description |
|---------|-------------|
| `npm install` | Install project dependencies |
| `npm start` | Build project and open web server running project |
| `npm run build` | Builds code bundle with production settings (minification, uglification, etc..) |

## Writing Code

After cloning the repo, run `npm install` from your project directory. Then, you can start the local development
server by running `npm start`.

After starting the development server with `npm start`, you can edit the `src/index.js` files 
and webpack will automatically recompile and reload your server (available at `http://localhost:8080`
by default).

## Customizing the Template

### How to import a custom Phaser build

If you look in the `src/index.js` file, you will see that Phaser has been imported at the top of the file:

```javascript
import Phaser from './phaser-custom-sprite-loader';
```

Note that you do not import the _entire_ Phaser package, but rather a custom entry point that contains only the
parts your game needs. If you open the file `phaser-custom-sprite-loader.js` you'll see the modules that have
been exposed:

```javascript
require('../node_modules/phaser/src/polyfills');

var CONST = require('../node_modules/phaser/src/const');
var Extend = require('../node_modules/phaser/src/utils/object/Extend');

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

Phaser = Extend(false, Phaser, CONST);

module.exports = Phaser;
```

This file is creating a custom Phaser API bundle, so that only those APIs listed (and those required internally by them) are bundled together. This can dramatically decrease the size of your final bundle. There are several custom build entry points included in this project template. Use which-ever one you need, or take one and customise it as you see fit. Full instructions on creating custom entry points can be found below.

### Babel

You can write modern ES6+ JavaScript and Babel will transpile it to a version of JavaScript that you
want your project to support. The targeted browsers are set in the `.babelrc` file and the default currently
targets all browsers with total usage over "0.25%" but excludes IE11 and Opera Mini.

  ```
  "browsers": [
    ">0.25%",
    "not ie 11",
    "not op_mini all"
  ]
  ```

### Webpack

If you want to customize your build, such as adding a new webpack loader or plugin (i.e. for loading CSS or fonts), you can
modify the `webpack/base.js` file for cross-project changes, or you can modify and / or create
new configuration files and target them in specific npm tasks inside of `package.json'.

## Deploying Code

After you run the `npm run build` command, your code will be built into a single bundle located at 
`dist/bundle.min.js` along with any other assets you project depended. 

If you put the contents of the `dist` folder in a publicly-accessible location (say something like `http://mycoolserver.com`), 
you should be able to open `http://mycoolserver.com/index.html` and play your game.

# Creating Custom Phaser 3 Builds

By default, Phaser will include pretty much everything, especially if you just require or import the main entry point. This will add 770KB of minified JavaScript to your bundle which is a considerable amount, especially if you aren't even using a large chunk of it. However, you can choose what you actually need in your bundle to a very granular degree. It just takes a little configuration to do it.

To create custom builds you're going to need [webpack](https://webpack.js.org/). If you've no experience with webpack it'd be best to go and learn how it works before carrying on, as Phaser is built specifically with it. Other bundlers, like Parcel, may also work but it's up to you to translate this guide into their respective formats.

The important thing to remember is that the Phaser module entry point, as defined in webpack, controls the whole structure of the exposed API. That is, everything it includes is made available under the Phaser namespace. It literally defines which features are included in the library. That's an important distinction you should understand: it controls what is available in the library, it's not meant as an entry point for a _project_.

## Building Phaser

This guide is based on creating a custom build of Phaser 3.11. When newer versions ship, it'll change slightly, because more things will be available to bundle in, but the core concept will remain exactly the same.

To start with I'd recommend you [clone this template repo](https://github.com/photonstorm/phaser3-custom-build). It will save a whole bunch of time getting set-up. Clone it, then `npm install` to grab the dependencies. You're now ready to do a custom build.

If you issue the command `npm run build` (or `webpack` if you've got it available globally) from the project folder then it'll create a custom build into the `dist` folder. This file is called `phaser-custom.js`. Inside the `test` folder you'll find an `index.html` file. Open this in a browser via an http server, or with local file permissions enabled, and you should see the following:

[![image](https://cascade.madmimi.com/promotion_images/6092/3212/original/custom1.png?1535988194)]()

If you're wondering where on earth the Star Wars logo is coming from that's a valid question :) Let's break it down.

The webpack config in the template uses the file [phaser-custom.js](https://github.com/photonstorm/phaser3-custom-build/blob/master/phaser-custom.js) as its entry point. Here's the complete file:

[![image](https://cascade.madmimi.com/promotion_images/6092/4444/original/custom2.png?1535989284)]()

If you look at the file, or the above image, you'll see it defines what's available in the Phaser namespace. It starts by including the standard polyfills and CONSTs. Then it pulls in the 2D Camera system, the Events, the Game, the Graphics object and finally one Math function called Between.

This is concluded by merging in the constants and exporting it globally. Combined with the webpack config this will build into the phaser-custom.js bundle which will have everything Phaser needs to run, plus the extras identified above. By default Phaser doesn't include a camera system or any Game Objects, which makes the 'base' use somewhat limited. So in this case we've added the Graphics object, because at the very least we can render something with that.

The `GraphicsFactory` function is what allows you to use the command `this.add.graphics` from within a Scene. You could exclude this to save a couple of KB if you wish, but then you'd have to alter your code to create a Graphics instance directly and add it to the Display List.

In the `test/index.html` file you'll see the code for our demo. All it does is create an 800 x 600 game instance and then renders the Star Wars logo to the Graphics object. It's not exactly a game but it demonstrates that, fundamentally, everything is working.

If you look in the `dist` folder you'll see that the `phaser-custom` file is 274 KB minified, or 71 KB gzipped. So, it's _significantly_ smaller than the default build that Phaser ships with.

## Tweaking the Custom Build

So, how do you now edit the custom build to include the ability to do something useful like load images and display them? To do this we need two extra things added to our package: Sprites and the File Loader, otherwise, we can't get the files into Phaser. Here is a tweaked version of the `phaser-custom.js` file from above. You can find this in the repo called [phaser-custom-sprite.js](https://github.com/photonstorm/phaser3-custom-build/blob/master/phaser-custom-sprite.js):

[![image](https://cascade.madmimi.com/promotion_images/6092/7835/original/custom4.png?1535991630)]()

If you look at the file above you'll see we've added in the Image and Sprite Game Objects (and removed Graphics) and also added the Loader module. This pulls in the entire Loader and all possible File Types, which is actually overkill for this bundle, so I'll show you how to refine that shortly. For now, though, it will do what we need. Issue the command `npm run buildsprite` and it'll build a new bundle to the `dist` folder. Launch the file `test/indexsprite.html` and you should get the following:

[![image](https://cascade.madmimi.com/promotion_images/6092/7999/original/custom3.png?1535991809)]()

Taa-da, working Sprites and image loading! The bundle size is now 78 KB min+gz, which is 7 KB bigger than our Graphics only bundle, but that's to be expected as we've added the whole Loader module to our build and a couple of meaty Game Objects too.

Let's refine it a little bit though. We really don't need all of the file types the Loader supports. In fact, for this test, we literally only need one: the Image loader. Let's tweak our entry point so it includes only the LoaderPlugin and the Image File Type:

[![image](https://cascade.madmimi.com/promotion_images/6094/9597/original/custom5.png?1536004657)]()

If we re-run the build command our new minified file is 284 KB which is 19 KB less than before. It's not just about file size, though, that's less JavaScript for the browser to process when it's launching your game for the first time too.

How do you know which things to include back in the entry point? You can work it out by looking at the `phaser.js` and `phaser-core.js` files in the root src folder of the main Phaser repo. Using those, plus just browsing the source folders for yourself, you can quickly find what you need.

There's still quite a lot of modules being included that we may not require though. We can visualize that by creating a webpack profile. Use the command `npm run buildlog`. This will build Phaser and also create a JSON file that details the build process. You can upload this JSON file to the online [webpack analyzer](http://webpack.github.io/analyse/). I've included a json file in the repo so you can try it out for yourself. Just [download it from here](https://github.com/photonstorm/phaser3-custom-build/blob/master/webpack.build-log.json), then go to the webpack analyzer and upload it. After a short while it will generate a report. Click on 'modules' to view the module tree:

[![image](https://cascade.madmimi.com/promotion_images/6095/0953/original/custom6.png?1536005428)]()

All of the modules are listed below the interactive tree. Click any node on the tree to see what is requiring that module and how many dependencies it has. Let's pick a particularly busy node:

[![image](https://cascade.madmimi.com/promotion_images/6095/1504/original/custom7.png?1536005667)]()

As we can see, lots of modules include the entire Array Utils package. This isn't a bad thing in itself, because it's a pretty compact and widely used area of the API, but this exploration process did highlight a lot to me. If you look at the Game module you'll see it pulls in plenty of things. The Texture Manager, the Sound Manager, the Animation Manager. All the things it expects to need in order to operate. Yet, the Sound Manager is entirely optional - we could easily hide that behind a custom build flag and it'd stop including 140 KB worth of un-minified source, because if you're literally not using it, why even bother to have it in the API? The same can be said for a number of other systems, such as the Animation Manager. The Device module could be made into a much more compact version that only includes checks that Phaser needs to boot-up, too.

In short, I'm quite happy that it's really easy to create a significantly smaller version of Phaser 3 with very little effort on your part. Use the custom build template and smash away parts of the API you don't need and get your games even leaner. This is especially important for Facebook Instant Games, where time-to-play needs to be as tiny as possible. Reducing your build from several hundred KB down to 70 KB certainly gets you a lot further along that path.
