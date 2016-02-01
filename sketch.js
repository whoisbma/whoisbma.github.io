var level;
var player;
var WIDTH = 1000;
var HEIGHT = 700;
var MULT = 25;
var whichLevel = 1;
var tick = false;

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
	player.move();
	level.display();
	player.display();
	tick = false;

}

function keyPressed() {
	player.getInput();
}

