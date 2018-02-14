var bryan1;
var bryan2;
var asako1;
var asako2;
var result;

var asakoImg, bryanImg;
var asakoSpr, bryanSpr;
var paperImg;
var bryanDirVector;
var bryanUp, bryanDown, bryanLeft, bryanRight;
var bryanWalkRate = 0;
var bryanMirror = -1;

var asakoDirVector;
var asakoUp, asakoDown, asakoLeft, asakoRight;
var asakoWalkRate = 0;
var asakoMirror = -1;

var particles = [];
var emojis = [];

var b1, b2, a1, a2;
var button;

function preload() {
	asakoImg = loadImage("assets/asakoSmall.png");
	bryanImg = loadImage("assets/bryanSmall.png");
	paperImg = loadImage("assets/paper.jpg");

	for (var i = 0; i < 8; i++) {
		emojis[i] = loadImage("assets/" + i + ".png");		
	}

}

function setup() {
	var canvasDiv = createDiv('')
	canvasDiv.id('canvasDiv');
	var canvas = createCanvas(800, 500);
	canvasDiv.child(canvas);
	canvas.elt.hidden = true;

	bryan1 = select('#b1');
	bryan2 = select('#b2');
	asako1 = select('#a1');
	asako2 = select('#a2');

	result = select('#result');

	b1 = bryan1.value();
	b2 = bryan2.value();
	a1 = asako1.value();
	a2 = asako2.value();

	bryan1.elt.max = b2;
	asako1.elt.max = a2;
	bryan2.elt.min = b1;
	asako2.elt.min = a1;

	bryan1.changed(function() {
		b1 = bryan1.value();
		bryan2.elt.min = b1;
	});

	bryan2.changed(function() {
		b2 = bryan2.value();
		bryan1.elt.max = b2;
	});

	asako1.changed(function() {
		a1 = asako1.value();
		asako2.elt.min = a1;
	});

	asako2.changed(function() {
		a2 = asako2.value();
		asako1.elt.max = a2;
	});

	button = select('button');
	button.mousePressed(function() {
		result.html('There is a ' + getPercentage(a1, a2, b1, b2).toFixed(2) + '% chance!!!');
		canvas.elt.hidden = false;
	});

	asakoSpr = createSprite(600, 250, asakoImg.width, asakoImg.height);
	asakoSpr.addImage(asakoImg);

	bryanSpr = createSprite(200, 250, bryanImg.width, bryanImg.height);
	bryanSpr.addImage(bryanImg);

	bryanSpr.depth = 0;
	asakoSpr.depth = 0;

	bryanDirVector = createVector(0,0);
	asakoDirVector = createVector(0,0);

	camera.position.x = width/2;
	camera.position.y = height/2;

	noStroke();
}

function draw() {


	bryanDirVector.set(bryanSpr.position.x, bryanSpr.position.y);
	asakoDirVector.set(asakoSpr.position.x, asakoSpr.position.y);

	background(255,240,250);
	for (var i = -2; i < 2; i++) {
		for (var j = -2; j < 2; j++) {
			image(paperImg, paperImg.width * i, paperImg.height * j);
		}
	}

	var bryanWalking = false;

	if (bryanUp) {
		bryanDirVector.y = bryanSpr.position.y - 40;
		bryanWalking = true;
	}
	if (bryanDown) {
		bryanDirVector.y = bryanSpr.position.y + 40;
		bryanWalking = true;
	}
	if (bryanLeft) {
		bryanDirVector.x = bryanSpr.position.x - 40;
		bryanWalking = true;
		bryanMirror = 1;
	}
	if (bryanRight) {
		bryanDirVector.x = bryanSpr.position.x + 40;
		bryanWalking = true;
		bryanMirror = -1;
	}

	var asakoWalking = false;

	if (asakoUp) {
		asakoDirVector.y = asakoSpr.position.y - 40;
		asakoWalking = true;
	}
	if (asakoDown) {
		asakoDirVector.y = asakoSpr.position.y + 40;
		asakoWalking = true;
	}
	if (asakoLeft) {
		asakoDirVector.x = asakoSpr.position.x - 40;
		asakoWalking = true;
		asakoMirror = -1;
	}
	if (asakoRight) {
		asakoDirVector.x = asakoSpr.position.x + 40;
		asakoWalking = true;
		asakoMirror = 1;
	}

	bryanSpr.mirrorX(bryanMirror);

	bryanSpr.position.x += (bryanDirVector.x - bryanSpr.position.x) * 0.1;
	bryanSpr.position.y += (bryanDirVector.y - bryanSpr.position.y) * 0.1;

	bryanWalkRate = bryanWalking ? bryanWalkRate + .3 : bryanWalkRate + .15;


	asakoSpr.mirrorX(asakoMirror);

	asakoSpr.position.x += (asakoDirVector.x - asakoSpr.position.x) * 0.1;
	asakoSpr.position.y += (asakoDirVector.y - asakoSpr.position.y) * 0.1;

	asakoWalkRate = asakoWalking ? asakoWalkRate + .3 : asakoWalkRate + .15;




	bryanSpr.rotation = sin(bryanWalkRate) * 10;
	asakoSpr.rotation = cos(asakoWalkRate) * 10;



	if (dist(bryanSpr.position.x, bryanSpr.position.y, asakoSpr.position.x, asakoSpr.position.y) < 130) {



		var avgPosition = createVector((bryanSpr.position.x + asakoSpr.position.x) / 2, (bryanSpr.position.y + asakoSpr.position.y) / 2);

		ellipse(avgPosition.x, avgPosition.y, 200, 200);

		camera.position.x += (avgPosition.x - camera.position.x) * 0.05;
		camera.position.y += (avgPosition.y - camera.position.y) * 0.05;
		var targetZoom = 1 + sin(frameCount * 0.01) * 0.5;
		camera.zoom += (targetZoom - camera.zoom) * 0.05;
		// camera.zoom = sin(frameCount * 0.01) * 0.01;
		// camera.zoom = 1 + sin(frameCount * 0.01);

		if ((frameCount + 0) % 6 === 0) {
			particles.push(new Particle(0, 
				camera.position.x + cos(frameCount * 0.1) * (200 + sin(frameCount * 0.005) * 100), 
				camera.position.y + sin(frameCount * 0.1) * (200 + sin(frameCount * 0.005) * 100)));		
		}
		if ((frameCount + 1) % 6 === 0) {
			particles.push(new Particle(1, 
				camera.position.x + cos(frameCount * 0.1 + 45) * (200 + sin(45 + frameCount * 0.005) * 100), 
				camera.position.y + sin(frameCount * 0.1 + 45) * (200 + sin(45 + frameCount * 0.005) * 100)));		
		}  
		if ((frameCount + 2) % 6 === 0) {
			particles.push(new Particle(2, 
				camera.position.x + cos(frameCount * 0.1 + 90) * (200 + sin(90 + frameCount * 0.005) * 100), 
				camera.position.y + sin(frameCount * 0.1 + 90) * (200 + sin(90 + frameCount * 0.005) * 100)));		
		}  

		if ((frameCount + 3) % 6 === 0) {
			particles.push(new Particle(3, 
				camera.position.x + cos(frameCount * 0.1) * (200 + sin(135 + frameCount * 0.005) * 100), 
				camera.position.y + sin(frameCount * 0.1) * (200 + sin(135 + frameCount * 0.005) * 100)));		
		}
		if ((frameCount + 4) % 6 === 0) {
			particles.push(new Particle(4, 
				camera.position.x + cos(frameCount * 0.1 + 45) * (200 + sin(180 + frameCount * 0.005) * 100), 
				camera.position.y + sin(frameCount * 0.1 + 45) * (200 + sin(180 + frameCount * 0.005) * 100)));		
		}  
		if ((frameCount + 5) % 6 === 0) {
			particles.push(new Particle(5, 
				camera.position.x + cos(frameCount * 0.1 + 90) * (200 + sin(225 + frameCount * 0.005) * 100), 
				camera.position.y + sin(frameCount * 0.1 + 90) * (200 + sin(225 + frameCount * 0.005) * 100)));		
		}  

		if ((frameCount + 6) % 6 === 0) {
			particles.push(new Particle(6, 
				camera.position.x + cos(frameCount * 0.1 + 25) * (200 + sin(270 + frameCount * 0.005) * 100), 
				camera.position.y + sin(frameCount * 0.1 + 25) * (200 + sin(270 + frameCount * 0.005) * 100)));		
		}  
		if ((frameCount + 7) % 6 === 0) {
			particles.push(new Particle(7, 
				camera.position.x + cos(frameCount * 0.1 + 50) * (200 + sin(315 + frameCount * 0.005) * 100), 
				camera.position.y + sin(frameCount * 0.1 + 50) * (200 + sin(315 + frameCount * 0.005) * 100)));		
		}  
	} else {
		camera.zoom += (1 - camera.zoom) * 0.05;
		camera.position.x += (width/2 - camera.position.x) * 0.05;
		camera.position.y += (height/2 - camera.position.y) * 0.05;
		for (var i = particles.length - 1; i >= 0; i--) {
			particles[i].spr.velocity.mult(1.1);
		}
	}


	for (var i = particles.length - 1; i >= 0; i--) {
		particles[i].update();
		if (particles[i].life < 0) {
			particles[i].spr.remove();
			particles.splice(i, 1);
		}
	}

	drawSprites();

}

function Particle(e, x, y) {

	this.life = 400;
	this.spr = createSprite(x, y);
	this.angle = (frameCount * 0.1) % 360;
	this.spr.velocity.x = cos(this.angle) * 3;
	this.spr.velocity.y = sin(this.angle) * 3;
	this.spr.scale = 0.0;
	this.spr.addImage(emojis[e])


	this.update = function() {
		this.life--;
		if (this.spr.scale < 1) {
			this.spr.scale += 0.005;
		}
		this.spr.rotation++;
	}
}


function mousePressed() {
	
}



function keyPressed() {
	if (key === 'W') {
		bryanUp = true;
	}
	if (key === 'A') {
		bryanLeft = true;
	}
	if (key === 'S') {
		bryanDown = true;
	}
	if (key === 'D') {
		bryanRight = true;
	}

	if (keyCode === UP_ARROW) {
		asakoUp = true;
	}
	if (keyCode === LEFT_ARROW) {
		asakoLeft = true;
	}
	if (keyCode === DOWN_ARROW) {
		asakoDown = true;
	}
	if (keyCode === RIGHT_ARROW) {
		asakoRight = true;
	}
}

function keyReleased() {
	if (key === 'W') {
		bryanUp = false;
	}
	if (key === 'A') {
		bryanLeft = false;
	}
	if (key === 'S') {
		bryanDown = false;		
	}
	if (key === 'D') {
		bryanRight = false;
	}

	if (keyCode === UP_ARROW) {
		asakoUp = false;
	}
	if (keyCode === LEFT_ARROW) {
		asakoLeft = false;
	}
	if (keyCode === DOWN_ARROW) {
		asakoDown = false;
	}
	if (keyCode === RIGHT_ARROW) {
		asakoRight = false;
	}
}

function getPercentage(a, b, c, d) {
	return ((a * c) / (b * d)) * 100;
}