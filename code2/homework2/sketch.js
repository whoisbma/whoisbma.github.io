function setup() {
	createCanvas(600,600);

}

function draw() {
	background(255);
	for (var i = 0; i < 100; i++) {
		fill(map(i,0,10,0,255));
		ellipse(10+ i * 6, height/2 + sin(i+frameCount * 0.1) * 100, map(i,0,100,10,20), map(i,0,100,100,20));
	}

}