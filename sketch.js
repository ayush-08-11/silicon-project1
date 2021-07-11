var space, space_img;
var earth, earth_img;
var player, player_img;
var play, play_img;
var heart1, heart2, heart3, heart_img;
var rock1, rock2, rock3, rock_img;
var fire, fire_img;
var question, question_img;
var save, save_img;
var gameState = 0;
var play;
var end;
var serve;
var gameset;
var player1;
var fireGroup;
var rockGroup;
var rockGroup2;
var fireSound;
var backSound;
var life = 3;

var firebubGroup;

var score = 50;
var hit = 0;
var level = 0;
var firebub; bub_img;

var black, black_img;

var back, back_img;

function preload(){
  space_img = loadImage("images/space.jpg");
  earth_img = loadImage("images/earth.png");
  player_img = loadImage("images/astronaut.png");
  play_img = loadImage("images/play.jpg");
  heart_img = loadImage("images/heart.png")
  rock_img = loadImage("images/rock.png")
  fire_img = loadImage("images/fire.png")
  question_img = loadImage("images/q1.png")
  save_img = loadImage("images/SAVE.jpg")
  astranout_img = loadImage("images/astronaut1.png")
  fireSound = loadSound("images/fire sound.wav")
  rockSound = loadSound("images/fire sound1.wav");
  bub_img = loadImage("images/bub.png");

//  backSound = loadSound("images/bcmp3.mp3")
}
function setup() {
  createCanvas(530, 300);

//  space = createSprite(265,150,20,20);
 // space.addImage(space_img);
 // space.scale = 1.2;

  save = createSprite(250,40,20,20);
  save.addImage(save_img);
  save.scale = 0.65; 

  play = createSprite(210,150,20,20);
  play.addImage(play_img);
  play.scale = 0.7;

  earth = createSprite(-25,150,20,20);
  earth.addImage(earth_img);
  earth.scale = 0.8;

  heart1 = createSprite(516,13,20,20);
  heart1.addImage(heart_img);
  heart1.scale = 0.05;
  heart1.visible = false

  heart2 = createSprite(489,13,20,20);
  heart2.addImage(heart_img);
  heart2.scale = 0.05;
  heart2.visible = false

  heart3 = createSprite(462,13,20,20);
  heart3.addImage(heart_img);
  heart3.scale = 0.05;
  heart3.visible = false

  line1 = createSprite(265,-2,1000,2);
 // line1.visible = false

  line2 = createSprite(-2,-2,-5,1000);
 // line2.visible = false

  line3 = createSprite(533,303,-5,1000);
 // line3.visible = false

  line4 = createSprite(268,303,1000,-5);
  //line4.visible = false
  
  player = createSprite(450,180,20,20);
  player.addImage(astranout_img);
  player.scale = 0.45;

  player1 = createSprite(180,150,20,20);
  player1.addImage(player_img);
  player1.scale = 0.4;
  player1.visible = false

  fireGroup = createGroup();
  rockGroup = createGroup();
  rockGroup2 = createGroup();
  firebubGroup = createGroup();

}

function draw() {
 background(space_img);
 
 if(mousePressedOver(play)){
   save.visible = false
   player.visible = false
   gameState = "start";
   play.visible = false

 // play.lifetime = 20
 }

/* if(play.lifetime === 0){
   set.visible = false
   save.visible = false
   exit.visible = false
   player.visible = false
   gameState = "start";
 } */

 if(gameState === "start"){
  player1.visible = true

  heart1.visible = true;
  heart2.visible = true;
  heart3.visible = true
  earth.visible = true;
//  backSound.play();
  
  textSize(16);
  stroke(255,255,255);
  fill(255,255,255)
  strokeWeight(0);
  text("Player",player1.x-25,player1.y-30);

  textSize(16);
  text("Fireballs :" + score,420,292);

  textSize(16);
  text("Destroyed Rocks :" + hit,228,292);

  textSize(16);
  text("Level :" + level,119,292);

  console.log("background.depth");
  
  if(keyDown("UP_ARROW")){
    player1.y = player1.y -5;
  }

  if(keyDown("DOWN_ARROW")){
    player1.y = player1.y +5;
  }

  if(keyDown("LEFT_ARROW")){
    player1.x = player1.x -5;
  }

  if(keyDown("RIGHT_ARROW")){
    player1.x = player1.x +5;
  }
  
  if(keyDown("SPACE")){

    if(score !=0){
      
      spawnFire();
      score -=1;
      fireSound.play();
      fireSound.setVolume(0.3);
    }
  }

  spawnRocks();
  spawnRocks2();
  spawnFirebub();

  player1.bounceOff(line1)
  player1.bounceOff(line2)
  player1.bounceOff(line3)
  player1.bounceOff(line4)

  if(fireGroup.isTouching(rockGroup)){
    rockSound.play();
    rockSound.setVolume(0.3);
    rockGroup.destroyEach(-1);
    hit +=1; 

    if(hit % 10 === 0 && hit > 0){
      level +=1;
    }
  }

  if(fireGroup.isTouching(rockGroup2)){
    rockSound.play();
    rockSound.setVolume(0.3);
    rockGroup2.destroyEach(-1);
    hit +=1; 

    if(hit % 10 === 0 && hit > 0){
      level +=1;
    }
  }

  if(player1.isTouching(firebubGroup)){
    firebubGroup.destroyEach(-1);
    score +=50;
  }

  if(player1.isTouching(rockGroup)||player1.isTouching(rockGroup2)){
    life = life-1;
    switch(life){
      case 2:heart3.destroy();
             break;
      case 1:heart2.destroy();
             break; 
     case 0:heart1.destroy();
            gameState="end";
             break;  
      deafult:break;
    }
    rockGroup.destroyEach(-1);
    rockGroup2.destroyEach(-1);
    
  }

  if(rockGroup.isTouching(earth)||rockGroup2.isTouching(earth)){
    gameState = "end";
  }

 }

 if(gameState === "end"){

  textSize(24);
  stroke(255,255,255);
  fill(255,255,255)
  strokeWeight(0);
  text("GAME OVER",200,100);

  textSize(24);
  text("press r to restart",180,130);
  
  player1.velocityX = 0;
  player1.velocityY = 0;
  rockGroup.destroyEach(-1);
  rockGroup2.destroyEach(-1);
  fireGroup.destroyEach(-1);
  firebubGroup.destroyEach(-1);
  earth.visible = false 
  player1.visible = false
  heart1.visible = false
  heart2.visible = false
  heart3.visible = false
  
  
}

  if(keyDown("r") && gameState === "end"){
    gameState = "start";
  }
  
  

 
  drawSprites();
}

function spawnFire(){
  fire = createSprite(180,150,20,20);
  fire.addImage(fire_img);
  fire.x = player1.x +40;
  fire.y = player1.y;
  fire.velocityX = 7;
  fire.scale = 0.05;
  fire.lifetime = 100;
 
  fireGroup.add(fire);
  
}

function spawnRocks(){ 

  if(frameCount % 150 === 0){

  rock = createSprite(600,100,20,20);
  rock.addImage(rock_img);
  rock.scale = 0.35;
  rock.velocityX = -4-(level);
  rock.lifetime = 230;

  rock.y = random(50,250);
  rock.scale = random(0.35,0.2)

  rockGroup.add(rock)

  }
}

function spawnRocks2(){ 

  if(frameCount % 100 === 0){
    
  rock2 = createSprite(600,100,20,20);
  rock2.addImage(rock_img);
  rock2.scale = 0.35;
  rock2.velocityX = -4-(level);
  rock2.lifetime = 230;
  
  rock2.y = random(50,250);
  rock2.scale = random(0.4,0.2)

  rockGroup2.add(rock2)
  }
}

function spawnFirebub(){ 

  if(frameCount % 700 === 0){
    
  firebub = createSprite(600,100,20,20);
  firebub.addImage(bub_img);
  firebub.scale = 0.35;
  firebub.velocityX = -4;
  firebub.lifetime = 230;
  
  firebub.y = random(50,250);
  firebub.scale = 0.17;

  firebubGroup.add(firebub)
  }
}