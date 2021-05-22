// Teacher: Ranjitha Kamath
// You have created the web based game now.,
// and convert that into mobile application using thunkable.
// but still we would have a few limitations.
// https://p5js.org/reference/#/p5/touches

// trex color snack p48(1);
//https://snack.expo.io/iwA7uO7-H

// On a touchscreen device, touch
// the canvas using one or more fingers
// at the same time

// examples:-
// function draw() {
//   clear();
//   let display = touches.length + ' touches';
//   text(display, 5, 10);
// }

// DESCRIPTION :-
//  The system variable touches[] contains an array of the positions of all 
//  current touch points, relative to (0, 0) of the canvas, and IDs identifying a 
//  unique touch as it moves. Each element in the array is an object with x, y, 
//  and id properties.

//  The touches[] array is not supported on Safari and IE on touch-based 
//  desktops (laptops).

// SYNTAX :-
// touches.

var gameState = "start"
var count = 0;
var distance = 0;
var b5,pot,treasureChest,man,monster;
var edges,bgMusic;
var leftArr, rightArr;
function preload(){
  b5=loadImage("scratchbg.png")
  cactus6=loadImage("cactus_06.png")
  cactus7=loadImage("cactus_07.png")
  cactus8=loadImage("cactus_08.png")
  flower2=loadImage("flower2.png")
  flower4=loadImage("flower4.png")
  gem3=loadImage("gem3.png")
  gem5=loadImage("gem5.png")
  chest2=loadImage("b2.png")
  chest3=loadImage("b3.png")
  manImg=loadAnimation("man1.png","man2.png")
  monsterImg=loadAnimation("dragon1.png","dragon2.png")
  bgMusic=loadSound("frozen.mp3")
  gemSound=loadSound("treasureChest.mp3")
  chestSound=loadSound("treasureChest.mp3")
  scoreSound=loadSound("woohoo.mp3")
  dieSound=loadSound("splat.mp3")
  potImg=loadImage("pot1.png")
  mainBg=loadImage("bg2.png")
  restartB=loadImage("restart.png")
  leftImg=loadImage("lefty.png")
  rightImg=loadImage("righty.png")
}
function setup(){
 createCanvas(windowWidth , windowHeight)
 bgMusic.loop();
 var music=bgMusic.isPlaying();
 console.log(music)
// No Changes
 bg=createSprite(windowWidth/2,windowHeight/2)
 bg.addImage(b5)
 bg.velocityY=12;
 bg.scale=1.7

 man=createSprite(windowWidth/2,windowHeight/2+150)
 man.addAnimation("background",manImg)
 man.setCollider("rectangle",0,0,70,200)
// man.debug=true;
 man.scale=1.0
 monster=createSprite(windowWidth/2,windowHeight/2+400)
 monster.addAnimation("background",monsterImg)
 monster.scale=1.2
 //bg1

 bg1=createSprite(windowWidth/2,windowHeight/2)
 //bg1.width=1700
 //bg1.scale=2.2

 pot=createSprite(windowWidth/2,windowHeight/2)
 restartbutton=createSprite(windowWidth/2,windowHeight/2)
 leftArr=createSprite(windowWidth/2-280,windowHeight/2-10)
 leftArr.addImage(leftImg)
 leftArr.scale=0.5
 rightArr=createSprite(windowWidth/2+280,windowHeight/2-10)
 rightArr.addImage(rightImg)
 rightArr.scale=0.5
  cactusGroup= new Group()
  flowersGroup= new Group()
  gemsGroup=new Group()
  chestboxGroup=new Group()
}
//bgMusic.play();
function draw(){
  background("pink") 
    if(gameState==="start"){
      bgMusic.play();
      pot.addImage(potImg)
      pot.visible=true
      
      bg1.addImage(mainBg)
      bg1.scale=0.7
       
       if (mousePressedOver(pot)) {
         gameState="play"
         pot.visible=false
       }
       if (touches.length > 0) { 
         if (pot.overlapPoint(touches[0].x, touches[0].y)) { 
          gameState="play"
          pot.visible=false
            touches = []
           }
           }

       man.visible=false
       leftArr.visible=false;
       rightArr.visible=false;
       monster.visible=false
       count.visible=false
       bg.visible=false
       restartbutton.visible=false
    }
  if(gameState==="play"){
  // bgMusic.play();
    man.visible=true
    leftArr.visible=true
    rightArr.visible=true
    restartbutton.visible=false
    monster.visible=true
    count.visible=true
    bg.visible=true
    bg1.visible=false
      if(bg.y>1000){
      bg.y=  0;
      }
      distance = distance + Math.round(World.frameRate/50);
     if (keyDown(RIGHT_ARROW)) {
      man.x=man.x+20
     }
    if (keyDown(LEFT_ARROW)) {
      man.x=man.x-20
    }

    if (touches.length > 0) { 
      if (leftArr.overlapPoint(touches[0].x, touches[0].y)) { 
        man.x=man.x-30
         touches = []
        }
        }

        if (touches.length > 0) { 
          if (rightArr.overlapPoint(touches[0].x, touches[0].y)) { 
            man.x=man.x+30
             touches = []
            }
            }
    if (frameCount%1000 === 0){
     scoreSound.play();
    }
    if(distance%10===0){
     bg.velocityY=bg.velocityY+1
    }
     if (gemsGroup.isTouching(man)){
      gemsGroup.destroyEach();
      gemSound.play();
      count=count+30
    }
     if(chestboxGroup.isTouching(man)){
       chestboxGroup.destroyEach();
       chestSound.play()
       count=count+100
     }
        spawnPlants();
        spawnFlowers();
        spawnGems();
        spawnChests();
      if(cactusGroup.isTouching(man)||flowersGroup.isTouching(man)||man.x<windowWidth/2-165||man.x>windowWidth/2+165){
        
      cactusGroup.destroyEach();
      flowersGroup.destroyEach();
      dieSound.play();
      gameState="end"
      
     bgMusic.stop();
      }
    
  }
  else if(gameState==="end"){
   
     bgMusic.stop();
     bg.velocityY=0
     cactusGroup.setVelocityYEach(0)
     flowersGroup.setVelocityYEach(0)
     chestboxGroup.setVelocityYEach(0)
     gemsGroup.setVelocityYEach(0)
     man.visible=false;
     monster.visible=false;
     restartbutton.addImage(restartB)
     restartbutton.visible=true
     restartbutton.scale=0.6
     if (mousePressedOver(restartbutton)){
       gameState="play"
       count=0
       distance=0
       distance = distance + Math.round(World.frameRate/60)
       bgMusic.loop();
       man.visible=true;
       man.x=windowWidth/2
       monster.visible=true;
       bg.velocityY=12;
       bg.scale=1.7
       if(bg.y>600){
        bg.y=  0;
        }
     }
     if (touches.length > 0) { 
      if (restartbutton.overlapPoint(touches[0].x, touches[0].y)) { 
        gameState="play"
        count=0
        distance=0
        distance = distance + Math.round(World.frameRate/60)
        bgMusic.loop();
        man.visible=true;
        man.x=windowWidth/2
        monster.visible=true;
        bg.velocityY=12;
        bg.scale=1.7
        if(bg.y>600){
         bg.y=  0;
         }
         touches = []
        }
        }
   }
  drawSprites();

  textSize(40)
  textFont("Helvetica")
  textStyle(BOLD)
  fill("blue")
  text("Try your best!",windowWidth/2-70,windowHeight/2+780)
  textSize(40)
  textFont("Helvetica")
  textStyle(BOLD)
  fill("orangered")
  // not indowHeight/29-450 but -780)
  text("The Infinite Forest Run",windowWidth/2-190,windowHeight/2-780)
  textSize(40);
  textFont("Helvetica")
  textStyle(BOLD)
  fill("yellow")
  text("Score:"+count,windowWidth/2-250,windowHeight/2-250)
  text("Distance:"+distance,windowWidth/2-250, windowHeight/2-225)
}
function spawnPlants(){
  if (frameCount%170===0) {
    cactus = createSprite(windowWidth/2, windowHeight/2-300);
    cactus.velocityY=5
    var rand = Math.round(random(1,3))
    switch (rand) {
      case 1: cactus.addImage(cactus6)   
        break;
      case 2: cactus.addImage(cactus7)   
        break;
      case 3: cactus.addImage(cactus8)   
        break;
      default: break;
    }
   cactus.x=Math.round(random(windowWidth/2-200,windowWidth/2+200))
    cactus.lifetime=70
 //   cactus.debug = true;
    cactus.scale = 0.4
    cactusGroup.add(cactus)
  }
}
function spawnFlowers(){
  if (frameCount%890===0) {
    flora=createSprite(windowWidth/2, windowHeight/2-300)
    flora.velocityY=4
    
    var rand = Math.round(random(1,2))
    switch (rand) {
      case 1: flora.addImage(flower2)   
        break;
      case 2: flora.addImage(flower4)   
        break;
      default:  break;
    }
    flora.x=Math.round(random(windowWidth/2-200,windowWidth/2+200))
    flora.lifetime=70
  //  flora.debug=true;
    flora.scale=0.4
    flowersGroup.add(flora)
  }
}
function spawnGems(){
  if (frameCount%590===0) {
    gemy=createSprite(windowWidth/2, windowHeight/2-300)
    gemy.velocityY=4
 
    var rand = Math.round(random(1,2))
    switch (rand) {
      case 1: gemy.addImage(gem3)
        break;
      case 2: gemy.addImage(gem5)
        break;
      default: break;
    }
    gemy.x=Math.round(random(windowWidth/2-200,windowWidth/2+200))
    gemy.lifetime = 80
    gemy.scale=0.2
    gemsGroup.add(gemy)
  }
}
function spawnChests() {
  if (frameCount%1280===0) {
    chesty=createSprite(windowWidth/2, windowHeight/2-300)
    chesty.velocityY=5

    var rand = Math.round(random(1,2))
    switch (rand) {
      case 1: chesty.addImage(chest2)   
        break;
      case 2: chesty.addImage(chest3)   
        break;
      default:  break;
    }
    chesty.x=Math.round(random(windowWidth/2-200,windowWidth/2+200))
    chesty.lifetime=80
    chesty.scale=0.5
    chestboxGroup.add(chesty)
  }
}