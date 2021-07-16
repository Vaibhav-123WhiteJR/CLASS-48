var mainplayer_img, path_img, path, mainplayer, edges;
var opponent1_img, opponent1;
var opponent1_lose, opponent2_lose;
var opponent2_img, opponent2;
var END = 0;
var PLAY = 1;
var gameState = PLAY;
var distance = 0;
var gameover_img,gameover;

function preload() {
	path_img = loadImage("images/Road.png");
	mainplayer_img = loadAnimation("images/tile001.png");
	opponent1_img = loadAnimation("images/opponent1.png", "images/opponent2.png");
	opponent2_img = loadAnimation("images/opponent4.png", "images/opponent5.png");
	opponent1_lose = loadAnimation("images/opponent3.png");
	opponent2_lose = loadAnimation("images/opponent6.png");
    gameover_img + loadImage("images/gameOver.png");
}

function setup() {
	createCanvas(1200, 300);
	path = createSprite(100, 150);
	path.addImage(path_img);


	mainplayer = createSprite(70, 150);
	mainplayer.addAnimation("mainplayer", mainplayer_img);
	mainplayer.scale = 1.5;
	mainplayer.debug = true;
	mainplayer.setCollider("rectangle", 0, 0, 20, 40);

	gameover = createSprite(800,250);
	//gameover.addImage(gameover_img);
	gameover.scale = 0.8;
	gameover.visible = false;

	opponent1Group = new Group();
	opponent2Group = new Group();
}

function draw() {
	background(0);

	drawSprites();
	fill(255);
	text("DISTANCE:-" + distance, 1100, 40);
	if (gameState === PLAY) {
		distance = distance + Math.round(frameCount / 60);
		path.velocityX = -(8 + 3*distance/100);
		edges = createEdgeSprites();
		mainplayer.collide(edges);
		mainplayer.y = mouseY;
		if (path.x < 0) {
			path.x = width / 2;
		}
		var select_opponent = Math.round(random(1, 3));
		console.log(select_opponent);
		if (World.frameCount % 200 === 0) {
			if (select_opponent == 1) {
				createOpponent1();
			}
			else if (select_opponent == 2) {
				createOpponent2();


			}
		}
		if (opponent1Group.isTouching(mainplayer)) {
			gameState = END;
			opponent1.velocityX = 0;
			opponent1.changeAnimation("lose", opponent1_lose);

		}
		if (opponent2Group.isTouching(mainplayer)) {
			gameState = END;
			opponent2.velocityX = 0;
			opponent2.changeAnimation("lose2", opponent2_lose);

		}
	}
	else if (gameState === END) {
		path.velocityX = 0;
		gameover.visible = true;
		mainplayer.velocityX = 0;
		opponent1Group.setVelocityXEach(0);
		opponent1Group.setLifetimeEach(-1);
		opponent2Group.setVelocityXEach(0);
		opponent2Group.setLifetimeEach(-1);
	}

}

function createOpponent1() {
	console.log("FUNCTION-OPPONENT-1");
	opponent1 = createSprite(1100, Math.round(random(50, 250)));
	opponent1.scale = 0.06;
	opponent1.velocityX = -(6 + 3*distance/100);
	opponent1.addAnimation("opponent1", opponent1_img);
	opponent1.addAnimation("lose", opponent1_lose);
	opponent1.lifetime = 200;
	opponent1Group.add(opponent1);

}

function createOpponent2() {
	console.log("FUNCTION-OPPONENT-2");
	opponent2 = createSprite(1100, Math.round(random(50, 250)));
	opponent2.scale = 0.06;
	opponent2.velocityX = -(6 + 3*distance/100);
	opponent2.addAnimation("opponent2", opponent2_img);
	opponent2.addAnimation("lose2", opponent2_lose);
	opponent2.lifetime = 200;
	opponent2Group.add(opponent2);

}