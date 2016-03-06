function Enemy() {
	this.x = 0;
	this.y = 0;
	this.alive = true;

	this.findStart = function () {
		while (level.map[floor(this.x)][floor(this.y)] !== 0) {
			this.x = floor(random(1,level.MAPW-1)) + 0.5;
			this.y = floor(random(1,level.MAPH-1)) + 0.5;

			while (this.x === player.x && this.y === player.y) {
				this.x = floor(random(1,level.MAPW-1)) + 0.5;
				this.y = floor(random(1,level.MAPH-1)) + 0.5;
			}
		}
	};

	this.display = function() {
		if (this.alive) {
			push();
			rectMode(CENTER);
			translate((this.x) * (MULT), (this.y) * (MULT));
			rotate(radians(45));
			fill(220,0,0);
			rect(0,0, MULT/2, MULT/2);
			pop();
			this.checkPlayerPos();
			// rect(floor(this.x) * (MULT), floor(this.y) * (MULT), MULT, MULT);
		}
	};

	this.move = function() {
		if (this.alive) {
			this.checkHasDot(floor(this.x), floor(this.y));
			this.checkHasSave(floor(this.x), floor(this.y));
			var directionClear = false;
			var dir;
			dir = floor(random(4));
			// console.log("got new dir: " + dir);
			if (dir === 0) {
				if (level.map[floor(this.x)][floor(this.y-1)] === 0 &&
					floor(this.y) > 2 && floor(this.y) < level.MAPH-2) {
					directionClear = true;
				}
			} else if (dir === 1) {
				if (level.map[floor(this.x+1)][floor(this.y)] === 0 &&
					floor(this.x) > 2 && floor(this.x) < level.MAPW-2) {
					directionClear = true;
				}
			} else if (dir === 2) {
				if (level.map[floor(this.x)][floor(this.y+1)] === 0 &&
					floor(this.y) > 2 && floor(this.y) < level.MAPH-2) {
					directionClear = true;
				}
			} else if (dir === 3) {
				if (level.map[floor(this.x-1)][floor(this.y)] === 0 &&
					floor(this.x) > 2 && floor(this.x) < level.MAPW-2) {
					directionClear = true;
				}
			}
			if (directionClear) {
				switch (dir) {
					case 0:
						this.y -= 1.0;
						break;
					case 1:
						this.x += 1.0;
						break;
					case 2:
						this.y += 1.0;
						break;
					case 3:
						this.x -= 1.0;
						break;
					default:
						break;
				}
			}
		}
	};

	this.checkHasDot = function(xx,yy) {
		if (level.dot[xx][yy] === 1) {
			level.dot[xx][yy] = 2;
			level.currentDots--;
			tick = true;
			this.sizeMod += 10;
			if (level.currentDots === 0) {
				whichLevel++;
				level.getNewLevel();
			}
		}
	};

	this.checkHasSave = function(xx,yy) {

		if (level.oldSavedPosX[0] !== undefined) {
		// console.log("checking to kill enemies!");
			for (var i = 0; i < level.oldSavedPosX.length; i++) {
				if (level.oldSavedPosX[i] === xx &&
					level.oldSavedPosY[i] === yy) {
					this.kill();
				}
			}
		}
	};

	this.kill = function() {
		this.alive = false;
	};

	this.checkPlayerPos = function() {
		if (floor(this.x) === floor(player.x) && floor(this.y) === floor(player.y)) {
			console.log("player dead");
			player.kill();
		}
	};
}

