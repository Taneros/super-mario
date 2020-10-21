import SpriteSheet from "./SpriteSheet.js";
import { loadImage, loadLevel } from "./loaders.js";

function drawBackground(background, context, sprites) {
    console.log('background.ranges', background.ranges)
    background.ranges.forEach(([x1, x2, y1, y2]) => {
        for (let x = x1; x < x2; ++x) {
            for (let y = y1; y < y2; ++y) {
                sprites.drawTile(background.tile, context, x, y)
            }
        }
    });
}

const canvas = document.getElementById('screen')
const context = canvas.getContext('2d')


// console.log(context)

loadImage('/img/tiles.png')
    .then(image => {
        const sprites = new SpriteSheet(image, 16, 16)
        sprites.define('ground', 0, 0)
        sprites.define('sky', 3, 23)

        loadLevel('1-1')
            .then(level => {
                // console.log(level)
                level.backgrounds.forEach(background => {
                    drawBackground(level.backgrounds[0], context, sprites) // 0 is for sky
                    drawBackground(level.backgrounds[1], context, sprites) // 0 is for sky
                })
            })


        // draw image on the convas when it is loaded
        // context.drawImage(image,
        //     0, 0, 16, 16, // subset to draw
        //     30, 30, 20, 20) // where we want to draw it
    })