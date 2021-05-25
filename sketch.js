var PLAY = 1;
var END = 0;
var SERVE;
var gameState=SERVE;
var rabbit,carrot,backgrd,enemy;
var rabbitImg,carrotImg,enemyImg,backgrdImg, jumpImg;
var carrotGrp,enemyGrp;
var score,r;
var invisibleground;
var reset, resetImg;
var start, startImg;
var go, goImg;

function preload(){

rabbitImg = loadImage("white.png");
carrotImg = loadImage("carrot2.png");
backgrdImg = loadImage("background2.png");
enemyImg = loadImage("bomb2.png");
resetImg = loadImage("reset image.jpg");
startImg  = loadImage("start image.jpg"); 
goImg = loadImage("game over.png");  
  
}

function setup() {

createCanvas(600,600);
  
backgrd = createSprite(0,0,200,200)
backgrd.addImage(backgrdImg);
backgrd.scale=2.0; 

rabbit = createSprite(100,390,20,20);
rabbit.addImage(rabbitImg);
rabbit.scale=0.2;  

invisibleground = createSprite(300,440,1800,10);
invisibleground.velocityX=-4;
invisibleground.visible=false;
  
  reset = createSprite(300,200,20,20);
  reset.addImage(resetImg);
  reset.scale=0.07;
  reset.visible=false;
  
  start = createSprite(267,320,20,20);
  start.addImage(startImg);
  start.scale=0.09;
  start.visible = false;
  
  go = createSprite(300,300,30,30);
  go.addImage(goImg);
  go.scale=0.5;
  go.visible=false;
  
carrotGrp = new Group();
enemyGrp = new Group();  

score = 0;  
  
}

function draw() {

  background("white");
  
  if(gameState===SERVE){
    
  start.visible = true;
    
    if(mousePressedOver(start)){
      gameState=PLAY;
    }
    
  }
  
  if(gameState===PLAY){
    
    start.visible=false;
    backgrd.velocityX=-4;    

    if(backgrd.x < 0){
  backgrd.x = backgrd.width/2;
      
} 
    
    if(invisibleground.x < 0){
  invisibleground.x = invisibleground.width/2;
}  
    
    if(keyDown("right")){
  rabbit.velocityX = 4;
  rabbit.velocityY = 0;
}

  if(keyDown("left")){
    rabbit.velocityX = -6;
    rabbit.velocityY = 0;
  }
    
 if(keyDown("up")){
   rabbit.velocityY = -4;
   rabbit.velocityX = 0;
 } 
  
 if(keyDown("down")){
   rabbit.velocityY = 4;
   rabbit.velocityX = 0;
 } 
    
Carrots();
Enemys();
    
  if(rabbit.isTouching(carrotGrp)){
    carrotGrp.destroyEach();
    score = score + 1; 
  }
    
  edges = createEdgeSprites();
    rabbit.collide(edges);
    rabbit.collide(invisibleground);
    
  if(rabbit.isTouching(enemyGrp)){
    gameState=END;
  }
    
}
  
  if(gameState===END){
    reset.visible=true;
    go.visible=true;
    //rabbit.velocityX=0;
    //rabbit.velocityY=0;
    rabbit.destroy();
    backgrd.velocityX=0;
    carrotGrp.destroyEach();
    enemyGrp.destroyEach();
    
   if(mousePressedOver(reset)){
     Reset();
   } 
  
  }
 
drawSprites();
 
fill("black");
stroke(50);  
textSize(20)
text("Score : "+score,250,50);
 
if(gameState===SERVE){
  fill("black");
  textSize(25)
  text("Press              to start PLAYING!!!",155,325);
  
  textSize(20);
  text("Collect as many Carrots as you Can!", 160,130);
  
  textSize(25);
  text("But Be AWARE",230,180);
  
  textSize(23);
  text("of the",280,210);
  
  textSize(30);
  text("BOMBS!!!",255,250);
}
  if(gameState===PLAY){
    
    fill("black");
    textSize(20);
    text("Use Arrow Keys to move the Rabbit !", 160,80);
   
  }
  
} 



function Carrots(){
  
  if(frameCount%120===0){
    
carrot = createSprite(600,100,50,50);
carrot.addImage(carrotImg);
carrot.scale=0.2;
carrot.velocityX=-4;
carrot.y=Math.round(random(100,450));    
carrot.lifetime=160;
carrotGrp.add(carrot);    
    
  }
  
}

function Enemys(){

if(frameCount%350===0){
  
enemy = createSprite(600,120,50,50);
enemy.addImage(enemyImg);
enemy.scale=0.08;
enemy.velocityX=-4;
enemy.y=Math.round(random(100,450));  
enemy.lifetime=160;
enemyGrp.add(enemy);
  
}
   
}

function Reset(){
rabbit = createSprite(100,390,20,20);
rabbit.addImage(rabbitImg);
rabbit.scale=0.2;
  reset.visible=false;
  go.visible=false;
  rabbit.x = 100;
  rabbit.y = 390;
  score = 0;
  gameState=SERVE;
  
}