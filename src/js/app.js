import '../scss/styles.scss';
import * as PIXI from 'pixi.js';
import $ from 'jquery';
import PixiFps from 'pixi-fps';
const fpsCounter = new PixiFps();
// modules
import {getRandomInt} from './modules/myutils.js';
// images
import '../images/circle.png';


let type = "WebGL"
if(!PIXI.utils.isWebGLSupported()){
  type = "canvas"
}

let app = new PIXI.Application({
    width: innerWidth,         // default: 800
    height: innerHeight,        // default: 600
    antialias: true,    // default: false
    transparent: false, // default: false
    resolution: 1       // default: 1
  }
);
app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
app.renderer.autoResize = true;

$( 'body' ).append( app.view );
app.stage.addChild(fpsCounter);

PIXI.loader
  .add( '../images/circle.png' )
  .load( setup );

function setup(){
  for(let i = 0; i < 1000; i++){
    let sprite = new PIXI.Sprite( PIXI.loader.resources[ '../images/circle.png' ].texture );
    sprite.position.x = getRandomInt( 0, innerWidth );
    sprite.position.y = getRandomInt( 0, innerHeight );
    app.stage.addChild( sprite );
  }

}




$( window ).resize( function(){
  app.renderer.resize(innerWidth, innerHeight);
});
