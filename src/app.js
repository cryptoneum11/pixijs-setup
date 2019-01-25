import './scss/styles.scss';
import * as PIXI from 'pixi.js';
import $ from 'jquery';
import PixiFps from 'pixi-fps';
const fpsCounter = new PixiFps();
// modules
import {getRandomInt} from './js/modules/myutils.js';
import {Bump} from './js/modules/bump.js';
import {TweenLite,PixiPlugin} from 'gsap';
// images
import './images/circle.png';


let type = "WebGL"
if(!PIXI.utils.isWebGLSupported()){
  type = "canvas"
}

let app = new PIXI.Application({
    width: innerWidth,   // default: 800
    height: innerHeight, // default: 600
    antialias: true,     // default: false
    transparent: false,  // default: false
    resolution: 1        // default: 1
  }
);
app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
app.renderer.autoResize = true;

$( 'body' ).append( app.view );
app.stage.addChild(fpsCounter);

PIXI.loader
  .add( './images/circle.png' )
  .add( './images/text.png' )
  .load( setup );

var sprites = [];
var b = new Bump();

function setup(){
  // add particles
  for(let i = 0; i < 5000; i++){
    let sprite = new PIXI.Sprite( PIXI.loader.resources[ './images/circle.png' ].texture );
    sprite.position.set( getRandomInt( 0, innerWidth ), getRandomInt( 0, innerHeight ) );
    sprite.width = sprite.height = getRandomInt( 4, 10 );
    app.stage.addChild( sprite );
    sprites.push( sprite );
  }
  animate_random();
}

function animate_random(){
  for(let i = 0; i < sprites.length; i++)
    animate_random_particle(sprites[i]);
}

function animate_random_particle( p ){
  TweenLite.to(p, getRandomInt(5, 10), {
    x: getRandomInt( 0, innerWidth ),
    y: getRandomInt( 0, innerHeight ),
    scaleX: getRandomInt( .2, 2 ),
    scaleY: getRandomInt( .2, 2 ),
    ease: Power1.easeInOut,
    onComplete: animate_random_particle,
    onCompleteParams: [ p ],
    onUpdate: ()=>{},
    onUpdateParams: [ p ]
  });
}

$( window ).resize( function(){
  app.renderer.resize(innerWidth, innerHeight);
});
