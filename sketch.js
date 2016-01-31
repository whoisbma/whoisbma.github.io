var level;
var player;
var WIDTH = 1200;
var HEIGHT = 600;
var MULT = 30;

function setup() {
	createCanvas(WIDTH, HEIGHT);
	noStroke();
	player = new Player();
	level = new Map();
	level.buildMap();
	level.display();
}

function draw() {
	background(5);
	level.display();
	player.move();
	player.display();

}

function keyPressed() {
	player.getInput();
}

