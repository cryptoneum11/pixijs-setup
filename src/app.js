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
import './images/text.png';
// svg lib
import {toPoints} from 'svg-points';
const path = {
  type: 'path',
  d: `
  M 447.95 47.85
  Q 450.85 44.2 450.85 34.25 450.85 25.35 448.9 21.9 446.1 17.1 437.7 17.1 429.4 17.1 426.9 21.7
  L 426.8 21.55 426.8 17.45 421.7 17.45 421.7 65.6 426.8 65.6 426.8 47.1 426.9 47.1
  Q 426.924609375 47.149609375 426.95 47.2
  L 426.95 38.4
  Q 426.8 36.584375 426.8 34.25 426.8 26.55 427.95 24.4 429.75 21.2 436.3 21.2 442.45 21.2 444.15 23.95 445.6 26.25 445.6 34.25 445.6 42.45 443.9 44.9 442.15 47.35 436.3 47.35 430.15 47.35 428.15 43.8 427.6619140625 42.8779296875 427.35 41.35
  L 427.35 47.85
  Q 429.8451171875 51.45 437.7 51.45 445.2 51.45 447.95 47.85
  M 486.95 42.1
  L 486.95 40.85 481.75 40.85 481.75 42.15
  Q 481.75 45.55 479.75 46.5 478.1 47.35 472.6 47.35 465.85 47.35 464.25 45.35 462.7 43.45 462.7 35.35
  L 462.85 35.35 462.85 31.25 462.7 31.25
  Q 463.05 24.95 464.35 23.3 466.1 21.2 472.6 21.2 478.5 21.2 479.9 22.65 481.5 24.25 481.7 31.25
  L 463.4 31.25 463.4 35.35 486.95 35.35 486.95 32
  Q 486.95 26.7 485.9 23.45 485.9 23.4 485.85 23.3 485.85 23.2 485.8 23.15 485.05 21.05 483.85 19.85 480.95 17.1 472.6 17.1 463.55 17.1 460.55 20.45 457.45 23.85 457.45 34.25 457.45 44.35 460.1 47.65 463.1 51.45 472.6 51.45 479.7 51.45 482.55 50.1 484.7 49.1 485.8 47.2 485.85 47.15 485.85 47.1 485.9 47.05 485.9 47 486.95 45.05 486.95 42.1
  M 408.2 27.9
  L 408.2 34.1 407.85 34.1
  Q 407.1 30.7 397.3 30.7 390.35 30.7 387.6 32.5 384.2 34.75 384.2 41.25 384.2 47.35 387.75 49.65 390.55 51.45 397 51.45 401.25 51.45 403.4 50.9 405.62890625 50.301171875 406.95 48.95 407.106640625 48.816796875 407.25 48.65 407.4642578125 48.398828125 407.65 48.1
  L 407.65 43.65
  Q 407.484375 44.1041015625 407.25 44.5 407.112109375 44.7369140625 406.95 44.95 406.1740234375 45.962109375 404.85 46.5 402.85 47.35 397.9 47.35 393 47.35 391.5 46.35 389.45 45.1 389.45 40.6 389.45 36.8 391.4 35.7 392.95 34.8 397.9 34.8 403.7 34.8 405.35 35.55 408.05 36.75 408.05 41.1 408.05 41.65 408 42.85
  L 408.1 42.15 408.1 47.5 408.2 47.6 408.2 51.05 413.25 51.05 413.25 28.15
  Q 413.3 21.1 409.15 18.75 406.15 17 398.65 17.1 391.85 17 389.1 18.4 385.2 20.35 385.2 26.2
  L 385.2 26.95 390.45 26.95 390.45 25.75
  Q 390.45 22.75 393.35 21.75 395 21.2 399.25 21.2 404.1 21.2 405.85 22.2 408.2 23.6 408.2 27.9
  M 50.25 23.3
  Q 52 21.2 58.5 21.2 64.4 21.2 65.8 22.65 67.4 24.25 67.6 31.25
  L 49.3 31.25 49.3 35.35 72.85 35.35 72.85 32
  Q 72.85 22.9 69.75 19.85 66.85 17.1 58.5 17.1 49.45 17.1 46.45 20.45 43.35 23.85 43.35 34.25 43.35 44.35 46 47.65 49 51.45 58.5 51.45 65.6 51.45 68.45 50.1 72.85 48.1 72.85 42.1
  L 72.85 40.85 67.65 40.85 67.65 42.15
  Q 67.65 45.55 65.65 46.5 64 47.35 58.5 47.35 51.75 47.35 50.15 45.35 48.6 43.45 48.6 35.35
  L 48.6 31.25
  Q 48.95 24.95 50.25 23.3
  M 211.5 21.2
  Q 217.4 21.2 218.8 22.65 220.4 24.25 220.6 31.25
  L 202.2 31.35 202.1 35.35 225.85 35.35 225.85 32
  Q 225.85 22.9 222.75 19.85 219.85 17.1 211.5 17.1 202.45 17.1 199.45 20.45 196.35 23.85 196.35 34.25 196.35 44.35 199 47.65 202 51.45 211.5 51.45 218.6 51.45 221.45 50.1 225.85 48.1 225.85 42.1
  L 225.85 40.85 220.65 40.85 220.65 42.15
  Q 220.65 45.55 218.65 46.5 217 47.35 211.5 47.35 204.75 47.35 203.15 45.35 201.6 43.45 201.6 35.35
  L 201.6 31.25
  Q 201.95 24.95 203.25 23.3 205 21.2 211.5 21.2
  M 3.25 3.05
  L 3.25 7.85 18.8 7.85 18.8 51.05 24.25 51.05 24.25 7.85 39.8 7.85 39.8 3.05 3.25 3.05
  M 94.05 21.55
  Q 98.65 21.55 100 21.95 101.9 22.6 101.9 24.95
  L 101.9 26.2 107.15 26.2 107.15 24.95
  Q 107.15 19.9 102.85 18.15 100.1 17.1 94.05 17.1 85.95 17.1 83.35 18.4 79.4 20.35 79.4 27 79.4 33.25 84 35 85.75 35.7 88.7 35.95
  L 98 36.4
  Q 99.9 36.5 100.75 36.8 102.85 37.6 102.85 41.75 102.85 45.6 99.75 46.6 98.6 46.95 94.05 46.95 88.25 46.95 86.35 46.2 84.4 45.45 84.4 43.05
  L 84.4 40.45 79.15 40.45 79.15 43.55
  Q 79.15 48.6 83.85 50.3 86.95 51.45 94.05 51.45 101.1 51.45 103.85 50.05 108.1 47.95 108.1 41.6 108.1 34.45 103.05 32.6 101.15 31.95 97.8 31.75
  L 91.6 31.45
  Q 87 31.25 86.15 30.7 84.65 29.75 84.65 25.65 84.65 22.8 87 22 88.5 21.55 94.05 21.55
  M 132.7 21.55
  L 132.7 17.45 119.7 17.45 119.7 9.35 114.65 9.35 114.65 17.45 110.2 17.45 110.2 21.55 114.65 21.55 114.65 41.35
  Q 114.65 47.3 116.5 49.35 118.5 51.45 124.3 51.45 129.45 51.45 131.75 49 134 46.7 134 41.65
  L 134 39.15 129.2 39.15 129.2 41.65
  Q 129.2 44.7 128.6 45.7 127.65 47.35 124.45 47.35 121.65 47.35 120.7 46.45 119.75 45.6 119.7 42.85
  L 119.7 21.55 132.7 21.55
  M 177.25 7.85
  L 192.8 7.85 192.8 3.05 156.25 3.05 156.25 7.85 171.8 7.85 171.8 51.05 177.25 51.05 177.25 7.85
  M 257.25 17.45
  L 251.35 17.45 243.75 29.75 235.9 17.45 230.25 17.45 241.1 33.5 228.95 51.05 235 51.05 243.75 37.5 252.4 51.05 258.5 51.05 246.55 33.5 257.25 17.45
  M 280.4 21.55
  L 280.4 17.45 267.4 17.45 267.4 9.35 262.35 9.35 262.35 17.45 257.9 17.45 257.9 21.55 262.35 21.55 262.35 41.35
  Q 262.35 47.3 264.2 49.35 266.2 51.45 272 51.45 277.15 51.45 279.45 49 281.7 46.7 281.7 41.65
  L 281.7 39.15 276.9 39.15 276.9 41.65
  Q 276.9 44.7 276.3 45.7 275.35 47.35 272.15 47.35 269.35 47.35 268.4 46.45 267.45 45.6 267.4 42.85
  L 267.4 21.55 280.4 21.55
  M 332.25 24.65
  L 324.75 24.1
  Q 316.4 23.85 314.75 23.1 311.45 21.65 311.45 15.45 311.45 10.4 313.5 8.95 315.7 7.45 323.55 7.45 331.45 7.45 333.25 8.7 335.4 10.1 335.6 16.2
  L 341 16.2
  Q 341.4 7.3 336.5 4.5 333.15 2.7 323.75 2.7 313.85 2.7 310.4 4.85 307.4 6.8 306.45 11.55 306 13.75 306 16.6 306 19.05 306.45 21 307.55 25.6 311.25 27.25 313.3 28.1 316.85 28.45
  L 329.35 29.2
  Q 332.05 29.4 333.35 29.9 336.5 31.15 336.5 37.25 336.5 43.85 333.8 45.45 331.8 46.65 323.4 46.65 315.25 46.65 313.5 45.3 311.25 43.6 311.35 36.1
  L 305.9 36.1
  Q 305.55 40.9 306.45 44.1 307.4 47.35 309.65 48.95 313.15 51.45 323.4 51.45 333.9 51.45 337.2 49.5 341.9 46.75 341.9 37.45 341.9 28.6 337.6 26.15 335.7 25.05 332.25 24.65
  M 376.6 28.7
  Q 376.65 22 373.55 19.4 370.75 17.1 363.9 17.1 355.35 17.1 353.55 21.55
  L 353.4 21.55 353.4 3.05 348.35 3.05 348.35 51.05 353.4 51.05 353.4 31.45
  Q 353.4 25.5 355.35 23.45 357.4 21.2 363.5 21.2 368 21.2 369.65 22.45 371.55 23.95 371.55 28.35
  L 371.55 51.05 376.6 51.05 376.6 28.7 Z
  `
};

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
  .add( './images/circle.png' )
  .add( './images/text.png' )
  // .add( './images/text.svg' )
  .load( setup );

var sprites = [];
var b = new Bump();
var text,
    gfx;
    // texture,
    // text_sprite;

function setup(){

  // attempt to draw svg text
  draw_svg( path );

  // console.log(text);
  // texture = app.renderer.generateTexture(text);
  // text_sprite = new PIXI.Sprite(texture);

  // add text block
  // text = new PIXI.Text('This is a PixiJS text',{fontFamily : 'Arial', fontSize: 80, fill : 0xff1010, align : 'center'});
  // text.anchor.set( .5, .5 );
  // text.position.set( innerWidth/2, innerHeight/2 );
  // app.stage.addChild( text );

  // let text_image = new PIXI.Sprite( PIXI.loader.resources['./images/text.png'].texture );
  // text_image.anchor.set( .5, .5 );
  // text_image.position.set( innerWidth/2, innerHeight/2 );
  // app.stage.addChild( text_image );

  // gfx = new PIXI.Graphics();
  // gfx.beginFill(0xFFFFFF);
  // gfx.drawRect(0,0,400,100);
  // gfx.endFill();
  // app.stage.addChild(gfx);

  // add particles
  for(let i = 0; i < 2000; i++){
    let sprite = new PIXI.Sprite( PIXI.loader.resources[ './images/circle.png' ].texture );
    sprite.position.set( getRandomInt( 0, innerWidth ), getRandomInt( 0, innerHeight ) );
    sprite.width = sprite.height = getRandomInt( 4, 10 );
    app.stage.addChild( sprite );
    sprites.push( sprite );
  }

  animate_random();

}

function draw_svg( path ){
  const points = toPoints(path);
  console.log(points);
  let _points = [];
  text = new PIXI.Graphics();
  text.beginFill(0xffffff);
  text.moveTo( points[0].x, points[0].y );
  for(let i = 1; i < points.length; i++){
    if ( points[i].moveTo ){
      text.moveTo( points[i].x, points[i].y );
    }else
    if( points[i].curve && points[i].curve.type == "quadratic" ){
      text.quadraticCurveTo( points[i].curve.x1, points[i].curve.y1, points[i].x, points[i].y );
    }else{
      text.lineTo( points[i].x, points[i].y );
    }
  }
  text.drawPolygon( _points );
  text.endFill();
  text.position.set(innerWidth/2-text.width/2,innerHeight/2-text.height/2);
  app.stage.addChild( text );
}

function animate_random(){
  for(var i = 0; i<sprites.length; i++){
    if(sprites[i]){
      animate_random_particle(sprites[i]);
    }
  }
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
    onUpdate: ()=>{
      b.hit(p, text, true, true);
    },
    onUpdateParams: [ p ]
  });
}



$( window ).resize( function(){
  app.renderer.resize(innerWidth, innerHeight);
});
