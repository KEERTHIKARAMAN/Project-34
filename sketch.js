var rocket,star,fireball;
var rocketImg, backgroundImg;
var fireballGroup;
var pop_sound;
var life = 3 ;
var Score = 0;
var star_count = 0;
var gameState=1;
var bubbleGroup;

function preload(){
  rocketImg = loadImage("Rocket.png");
  starImg = loadImage("Star.png");
  fireballImg = loadImage("fireball.png");
  backgroundImg= loadImage("background.jpg");
  pop_sound = loadSound("explosion.mp3");
}
function setup() {
  createCanvas(1600,720);
  
  rocket= createSprite(759,625);
  rocket.addImage(rocketImg)
  rocket.scale=0.6

  starGroup = createGroup();   
  fireballGroup = createGroup();   
  
  heading= createElement("h1");
  scoreboard= createElement("h1");
}

function draw() {
  background(backgroundImg);

  edges= createEdgeSprites();
  rocket.collide(edges);
  Score=Score+1

  fill("yellow");
  textSize(30);
  text("Life:"+life,50, 130);
  
  fill("yellow");
  textSize(30);
  text("Star:"+star_count,50, 90);

  fill("yellow");
  textSize(30);
  text("Score:"+Score,50, 50);

  fill("cyan");
  textSize(50);
  text("Space Game",700, 50);

if (star_count==20){
  handleGameWon(bubbleGroup)
}

if (keyDown(LEFT_ARROW)){
  rocket.velocityX = -5
}
if (keyDown(RIGHT_ARROW)){
  rocket.velocityX = 5
}
if (keyDown(UP_ARROW)){
  rocket.velocityY = -5
}
else{
  rocket.velocityY = 5
}

  if(gameState===1){

    if (frameCount % 80 === 0) {
      drawstar();
    }

    if (frameCount % 100 === 0) {
      drawfireball();
    }

    if (starGroup.collide(rocket)){
      star_count = star_count+1;
      starGroup.destroyEach();
      pop_sound.play()
    }
    
    if (fireballGroup.collide(rocket)) {
      handleGameover(fireballGroup);
    }

    drawSprites();
  }
    
  
}

function drawstar(){
  star = createSprite(random(100, 1500), 0, 50, 50);
  star.addImage(starImg);
  star.scale = 0.050;
  star.velocityY = 6;
  star.lifetime = 400;
  starGroup.add(star);
}
function drawfireball(){
  fireball = createSprite(random(100, 1500), 0, 200, 200);
  fireball.addImage(fireballImg);
  fireball.scale = 0.15;
  fireball.velocityY = 10;
  fireball.lifetime = 400;
  fireballGroup.add(fireball);
}

function handleBubbleCollision(bubbleGroup){
    if (life > 0) {
      star_count=star_count+1;
    }

    bubbleGroup.destroyEach()
}

function handleGameWon(){
  if (star_count === 20) {
    gameState=2
    
    swal({
      title: `You Won`,
      text: 'You Have Still ' + life +" Life",
      imageUrl:
        "https://studio.code.org/api/v1/animation-library/gamelab/qYuvwscvicUp26fkvQOaDTrPjKxv1BlU/category_video_games/award_trophy1.png",
      imageSize: "100x100",
      confirmButtonText: "Play Again"
    },
    function(isConfirm) {
      if (isConfirm) {
        location.reload();
      }
    }
    );
  }

}

function handleGameover(bubbleGroup){
  
    life=life-1;
    bubbleGroup.destroyEach();
    if (life === 0) {
      gameState=2
      
      swal({
        title: `Better Luck Next Time`,
        text: "You Collected " + star_count +" Stars",
        imageUrl:
          "https://studio.code.org/api/v1/animation-library/gamelab/wZWNaEUr6KGawJDGuiwH.tDqkf4X3qSe/category_video_games/textGameOver.png",
          imageSize: "200x100",
          confirmButtonText: "Play Again"
      },
      function(isConfirm) {
        if (isConfirm) {
          location.reload();
        }
      }
      );
    }
  
}

