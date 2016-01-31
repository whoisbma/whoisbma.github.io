function Player() {
	this.x = floor(random(((WIDTH)/MULT) - 6)) + 3.5;
	this.y = floor(random(((HEIGHT)/MULT) - 6)) + 3.5;
	this.dir = 0; //1 up 2 right 3 down 4 left
	this.nextDir = 0;
	this.speed = 0.1;


	this.sizeMod = 0;

	this.display = function() {
		if (this.sizeMod > 1 && frameCount % 10 === 0) {
			this.sizeMod -= 8;
		}

		fill(255,50);
		// ellipse((this.x) * MULT,(this.y) * MULT, MULT+this.sizeMod, MULT+this.sizeMod);
		rect((floor(this.x) * MULT)-this.sizeMod, (floor(this.y) * MULT)-this.sizeMod, MULT+this.sizeMod*2, MULT+this.sizeMod*2);
		fill(220,220,100);
		rect(floor(this.x) * (MULT), floor(this.y) * (MULT), MULT, MULT);
		rect((this.x) * (MULT), (this.y) * (MULT), MULT, MULT);
	};

	this.spaceEmpty = function(d) {
		var skipSpace = 0.15;
		if (d === 1) {	//up
			return (level.map[floor(this.x)][floor(this.y-this.speed-0.5)] === 0 &&
					level.map[floor(this.x-skipSpace)][floor(this.y-this.speed-0.5)] === 0 &&
					level.map[floor(this.x+skipSpace)][floor(this.y-this.speed-0.5)] === 0);
		} else if (d === 3) { //down
			return (level.map[floor(this.x)][floor(this.y+this.speed+0.5)] === 0 &&
					level.map[floor(this.x-skipSpace)][floor(this.y+this.speed+0.5)] === 0 &&
					level.map[floor(this.x+skipSpace)][floor(this.y+this.speed+0.5)] === 0);
		} else if (d === 4) { //left
			return (level.map[floor(this.x-this.speed-0.5)][floor(this.y)] === 0 &&
					level.map[floor(this.x-this.speed-0.5)][floor(this.y-skipSpace)] === 0 &&
					level.map[floor(this.x-this.speed-0.5)][floor(this.y+skipSpace)] === 0);
		} else if (d === 2) { //right
			return (level.map[floor(this.x+this.speed+0.5)][floor(this.y)] === 0 &&
					level.map[floor(this.x+this.speed+0.5)][floor(this.y-skipSpace)] === 0 &&
					level.map[floor(this.x+this.speed+0.5)][floor(this.y+skipSpace)] === 0);
		} else {
			return false;
		}
	};

	this.spaceEmptyStrict = function(d) {
		var skipSpace = 0.4;
		if (d === 1) {	//up
			return (level.map[floor(this.x)][floor(this.y-this.speed-0.5)] === 0 &&
					level.map[floor(this.x-skipSpace)][floor(this.y-this.speed-0.5)] === 0 &&
					level.map[floor(this.x+skipSpace)][floor(this.y-this.speed-0.5)] === 0);
		} else if (d === 3) { //down
			return (level.map[floor(this.x)][floor(this.y+this.speed+0.5)] === 0 &&
					level.map[floor(this.x-skipSpace)][floor(this.y+this.speed+0.5)] === 0 &&
					level.map[floor(this.x+skipSpace)][floor(this.y+this.speed+0.5)] === 0);
		} else if (d === 4) { //left
			return (level.map[floor(this.x-this.speed-0.5)][floor(this.y)] === 0 &&
					level.map[floor(this.x-this.speed-0.5)][floor(this.y-skipSpace)] === 0 &&
					level.map[floor(this.x-this.speed-0.5)][floor(this.y+skipSpace)] === 0);
		} else if (d === 2) { //right
			return (level.map[floor(this.x+this.speed+0.5)][floor(this.y)] === 0 &&
					level.map[floor(this.x+this.speed+0.5)][floor(this.y-skipSpace)] === 0 &&
					level.map[floor(this.x+this.speed+0.5)][floor(this.y+skipSpace)] === 0);
		} else {
			return false;
		}
	};

	this.getInput = function() {
		if (keyCode === UP_ARROW || key == 'W') {
			if (this.spaceEmpty(1)) {
				this.dir = 1;
				this.nextDir = 0;
			} else {
				this.nextDir = 1;
			}
		}
		if (keyCode === RIGHT_ARROW || key == 'D') {
			if (this.spaceEmpty(2)) {
				this.dir = 2;
				this.nextDir = 0;
			} else {
				this.nextDir = 2;
			}
		}
		if (keyCode === DOWN_ARROW || key == 'S') {
			if (this.spaceEmpty(3)) {
				this.dir = 3;
				this.nextDir = 0;
			} else {
				this.nextDir = 3;
			}
		}
		if (keyCode === LEFT_ARROW || key == 'A') {
			if (this.spaceEmpty(4)) {
				this.dir = 4;
				this.nextDir = 0;
			} else {
				this.nextDir = 4;
			}
		}
	};

	this.move = function() {
		this.checkHasDot(floor(this.x), floor(this.y));

		if (this.nextDir === 1) {
			if (this.spaceEmptyStrict(1)) {
				this.dir = 1;
				this.nextDir = 0;
			}
		} else if (this.nextDir === 2) {
			if (this.spaceEmptyStrict(2)) {
				this.dir = 2;
				this.nextDir = 0;
			}
		} else if (this.nextDir === 3) {
			if (this.spaceEmptyStrict(3)) {
				this.dir = 3;
				this.nextDir = 0;
			}
		} else if (this.nextDir === 4) {
			if (this.spaceEmptyStrict(4)) {
				this.dir = 4;
				this.nextDir = 0;
			}
		}



		if (this.dir === 1) {
			if (this.spaceEmpty(1)) {
				this.y-=this.speed;
				this.x = floor(this.x) + 0.5;
			} else {
				this.x = floor(this.x) + 0.5;
				this.y = floor(this.y) + 0.5;
			}
		} else if (this.dir === 2) {
			if (this.spaceEmpty(2)) {
				this.x+=this.speed;
				this.y = floor(this.y) + 0.5;
			} else {
				this.x = floor(this.x) + 0.5;
				this.y = floor(this.y) + 0.5;
			}
		} else if (this.dir === 3) {
			if (this.spaceEmpty(3)) {
				this.y+=this.speed;
				this.x = floor(this.x) + 0.5;
			} else {
				this.x = floor(this.x) + 0.5;
				this.y = floor(this.y) + 0.5;
			}
		} else if (this.dir === 4) {
			if (this.spaceEmpty(4)) {
				this.x-=this.speed;
				this.y = floor(this.y) + 0.5;
			} else {
				this.x = floor(this.x) + 0.5;
				this.y = floor(this.y) + 0.5;
			}
		}
	};

	this.checkHasDot = function(xx,yy) {
		if (level.dot[xx][yy] === 1) {
			level.dot[xx][yy] = 0;
			this.sizeMod += 10;
		}
	};



}