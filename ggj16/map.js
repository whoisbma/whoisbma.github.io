function Map() {
	this.MAPW = WIDTH/MULT;
	this.MAPH = HEIGHT/MULT;
	this.map = [];
	this.mapWhichTile = [];
	this.dot = [];
	this.totalDots = 0;
	this.currentDots = 0;
	this.filled = [];	//for floodfill testing
	this.numEnemies = whichLevel;
	this.enemies = [];
	this.power = [];
	this.currentPowers = 0;

	this.saving = false;
	this.savedPosX = [];
	this.savedPosY = [];

	this.oldSavedPosX = [];
	this.oldSavedPosY = [];

	this.buildMap = function() {
		console.log("building level " + whichLevel);
		this.totalDots = 9999;
		player.dir = 0;
		this.saving = false;

		this.oldSavedPosX = [];
		this.oldSavedPosY = [];
		arrayCopy(this.savedPosX,this.oldSavedPosX);
		arrayCopy(this.savedPosY,this.oldSavedPosY);
		// while(this.totalDots < whichLevel * 10 && this.totalDots > whichLevel * 20) {
		while(this.totalDots > whichLevel * 100) {
			var i, j;
			this.currentPowers = 0;
			for (i = 0; i < this.MAPW; i++) {
				this.map[i] = [];
				this.mapWhichTile[i] = [];
				this.dot[i] = [];
				this.filled[i] = [];
				this.power[i] = [];
			
				// fill every space with a wall
				for (j = 0; j < this.MAPH; j++) {
					this.map[i][j] = 1;
					this.mapWhichTile[i][j] = -1;
					this.filled[i][j] = 0;
				}
			}

			this.totalDots = 0;
			//reset dots
			for (i = 1; i < this.MAPW-1; i++) {
				for (j = 1; j < this.MAPH-1; j++) {
					this.dot[i][j] = 0;
					this.power[i][j] = 0;
				}
			}
			player.x = floor(random(((WIDTH)/MULT) - 6)) + 3.5;
			player.y = floor(random(((HEIGHT)/MULT) - 6)) + 3.5;

			//basic randomizer
			for (i = 0; i < this.MAPW; i++) {
				for (j = 0; j < this.MAPH; j++) {
					if (i === 0 || j === 0 || i === this.MAPW-1 || j === this.MAPH-1) {
						this.map[i][j] = 1;
						// } else if (i === 1 && j === 1) {
						// 	this.map[i][j] = 0;
					} else {
						///random tile set 
						var r = floor(random(4));
						//umm.. trying a quadrant thing on top of it.
						if (i % 4 === 0 || j % 4 === 0) {
							switch(r) {
								case 0:
									this.map[i][j] = 0; //top left(default)
									break;
								case 1:
									this.map[i][j] = 0; //top left(default)
									this.map[i][this.MAPH-1-j] = 0; //mirror down
									break;
								case 2:
									this.map[this.MAPW-1-i][j] = 0;	//mirror right
									this.map[i][this.MAPH-1-j] = 0; //mirror down
									break;
								case 3:
									this.map[i][j] = 0; //top left(default)
									this.map[this.MAPW-1-i][this.MAPH-1-j] = 0; //mirror right/down
									break;
							}
						}

						var r = floor(random(4));
						switch (r) {
							case 0:
								this.map[i][j] = 1;
								this.map[this.MAPW-1-i][j] = 1;	//mirror right
								this.map[i][this.MAPH-1-j] = 1; //mirror down
								this.map[this.MAPW-1-i][this.MAPH-1-j] = 1; //mirror right/down
								break;
							default:
								this.map[i][j] = 0;
								break;
						}					
					}
					this.mapWhichTile[i][j] = -1;
				}
			}

			//player starting position-based level
			this.map[floor(player.x)][floor(player.y)] = 0;
			//draw a line starting somewhere near the player, but don't go off the screen.
			var d = floor(random(2));
			var l, n;
			if (d === 0) {
				if (floor(player.x < this.MAPW/2)) {	//go right
					l = floor(random(0, this.MAPW - floor(player.x)));
					for (n = floor(player.x); n < floor(player.x) + l; n++) {
						this.map[n][floor(player.y)] = 0;
					}
				} else { //go left
					l = floor(random(0, floor(player.x)));
					for (n = floor(player.x); n > floor(player.x) - l; n--) {
						this.map[n][floor(player.y)] = 0;
					}
				}
			} else {
				if (floor(player.x < this.MAPH/2)) {	//go down
					l = floor(random(0, this.MAPH - floor(player.y)));
					for (n = floor(player.y); n < floor(player.y) + l; n++) {
						this.map[floor(player.x)][n] = 0;
					}
				} else {	//go up
					l = floor(random(0, floor(player.y)));
					for (n = floor(player.y); n > floor(player.y) - l; n--) {
						this.map[floor(player.x)][n] = 0;
					}
				}
			}
			//draw another line, perpendiculary. maybe do this N number of times.
		
			/*
			//quadrant-based randomizer - kinda crazy patterns but not what i'm looking for
			var r = floor(random(this.MAPW/2));
			var rr = min(this.MAPH/4,floor(random(this.MAPH/2-1)));

			var edgeBuffer = 2;

			for (i = edgeBuffer; i < this.MAPW/2; i++) {
				for (j = edgeBuffer; j < this.MAPH/2; j++) {
					if (j % floor(random(4)) === 0) {
						this.map[i][j] = 0;
						this.map[this.MAPW-1-i][j] = 0;	//mirror right
						this.map[i][this.MAPH-1-j] = 0; //mirror down
						this.map[this.MAPW-1-i][this.MAPH-1-j] = 0; //mirror right/down
					} else {
						if (i === r && j > rr) {
							this.map[i][j] = 0;
							this.map[this.MAPW-1-i][j] = 0;	//mirror right
							this.map[i][this.MAPH-1-j] = 0; //mirror down
							this.map[this.MAPW-1-i][this.MAPH-1-j] = 0; //mirror right/down
						} else if (i === rr) {
							this.map[i][j] = 0;
							this.map[this.MAPW-1-i][j] = 0;	//mirror right
							this.map[i][this.MAPH-1-j] = 0; //mirror down
							this.map[this.MAPW-1-i][this.MAPH-1-j] = 0; //mirror right/down
						}
					}

					//basic grid
					// if (i % 4 === 0 || j % 4 === 0) {
					// 	this.map[i][j] = 0; //top left(default)
					// 	this.map[this.MAPW-1-i][j] = 0;	//mirror right
					// 	this.map[i][this.MAPH-1-j] = 0; //mirror down
					// 	this.map[this.MAPW-1-i][this.MAPH-1-j] = 0; //mirror right/down
					// }

					// var r = floor(random(6));
					// if (r === 0) {
					// 	this.map[i][j] = 0;
					// 	this.map[this.MAPW-1-i][j] = 0;	//mirror right
					// 	this.map[i][this.MAPH-1-j] = 0; //mirror down
					// 	this.map[this.MAPW-1-i][this.MAPH-1-j] = 0; //mirror right/downs
					// }
				}
			}
			*/

			//flood fill? and fill out everything else?
		
			this.floodfill(floor(player.x),floor(player.y));
			for (i = 1; i < this.MAPW-1; i++) {
				for (j = 1; j < this.MAPH-1; j++) {
					if (this.filled[i][j] === 0) {
						this.map[i][j] = 1;
					}
				}
			}
		
			//generate dots
			for (i = 1; i < this.MAPW-1; i++) {
				for (j = 1; j < this.MAPH-1; j++) {
					this.calcTile(i,j);
					if (this.map[i][j] === 0) {
						this.dot[i][j] = 1;
						this.totalDots++;
					}
				}
			}

			// generate powers
			var powerX = 0;
			var powerY = 0;
			while (this.currentPowers < 2) {
				powerX = floor(random(this.dot.length));
				powerY = floor(random(this.dot.length));
				if (this.dot[powerX][powerY] === 1) {
					this.power[powerX][powerY] = 1;
					this.currentPowers++;
					console.log("got a power");
				}
			}
		}

		this.currentDots = this.totalDots;
		this.numEnemies = whichLevel;
		this.createEnemies();
	};

	this.createEnemies = function() {
		this.enemies = [];
		console.log("Making " + this.numEnemies + " enemies");
		var i;
		for (i = 0; i < this.numEnemies; i++) {
			this.enemies.push(new Enemy());
		}

		for (i = 0; i < this.enemies.length; i++) {
			this.enemies[i].findStart();
		}
	};

	this.displayEnemies = function() {
		for (var i = 0; i < this.enemies.length; i++) {
			this.enemies[i].display();
		}
	};

	this.updateEnemies = function() {
		if (tick) {
			for (var i = 0; i < this.enemies.length; i++) {
				this.enemies[i].move();
			}
		}
	};

	this.display = function() {
		var i, j;
		for (i = 0; i < this.MAPW; i++) {
			for (j = 0; j < this.MAPH; j++) {
				if (this.map[i][j] === 1) {
					var d = dist(player.x, player.y, i, j)*1.5 - player.sizeMod*0.1;
					var c = 100-d*5;//map(d, 0, min(player.sizeMod/2,3), 200, 20);//min(map(dist(player.x, player.y, i, j), 0, player.sizeMod/2, 0, 255),255);
					fill(c + random(20));
					noStroke();
					this.drawTile(i,j);
				}
				if (this.dot[i][j] === 1) {
					fill(200);
					rect(i*MULT + MULT/2 - 1, j*MULT + MULT/2 - 1, 3, 3);
				}
				if (this.dot[i][j] === 2) {
					fill(50);
					rect(i*MULT + MULT/2 - 1, j*MULT + MULT/2 - 1, 3, 3);
				}
				if (this.power[i][j] === 1) {
					push();
					rectMode(CENTER);
					translate((i + 0.5) * (MULT), (j + 0.5) * (MULT));
					rotate(radians(frameCount % 359));
					fill(220,0,220);
					rect(0, 0, frameCount%30, frameCount%30);
					pop();
				}
			}

		}

		this.displayEnemies();
		this.updateEnemies();

		fill(255);
		textSize(32);
		text(str(whichLevel),40,60);

		if (tick) {
			if (this.saving === false) {
				if (this.power[floor(player.x)][floor(player.y)] === 1) {
					this.power[floor(player.x)][floor(player.y)] = 0;
					this.saving = true;
					// console.log("saving is true!");
				}
			} else {
				if (this.power[floor(player.x)][floor(player.y)] === 1) {
					this.power[floor(player.x)][floor(player.y)] = 0;
					// this.saving = false;
					// console.log("saving is false!");
					whichLevel++;
					if (this.numEnemies > 2) {
						this.numEnemies-=2;
					} else if (this.numEnemies > 1) {
						this.numEnemies-=1;
					}
					this.getNewLevel();
				}
			}
			
		}

		if (this.oldSavedPosX[0] !== undefined) {
			for (i = 0; i < this.oldSavedPosX.length; i++) {
				fill(250,0,250,50);
				rect(this.oldSavedPosX[i]*MULT,this.oldSavedPosY[i]*MULT,MULT,MULT);
			}
			// console.log("i have saved positions!");
		}
	};

	this.calcTile = function(x,y) {
		var up, right, down, left = false;
		var totalSides = 0;
	
		if (x !== 0 && x !== this.MAPW-1 && y !== 0 && y !== this.MAPH-1) {
			if (this.map[x][y-1] === 1) {
				up = true;
				totalSides++;
			}
			if (this.map[x+1][y] === 1) {
				right = true;
				totalSides++;
			}
			if (this.map[x][y+1] === 1) {
				down = true;
				totalSides++;
			}
			if (this.map[x-1][y] === 1) {
				left = true;
				totalSides++;
			}
		} else {
			return;
		}

		if (totalSides === 0) {
			this.mapWhichTile[x][y] = 0;
			this.map[x][y] = 0;
		} else if (totalSides === 4) {
			this.mapWhichTile[x][y] = 15;
		} else if (up && !right && !down && !left) {
			this.mapWhichTile[x][y] = 1;	//adjacent up
		} else if (up && !right && down && !left) {
			this.mapWhichTile[x][y] = 2;	//adjacent up and down
		} else if (!up && !right && down && !left) {
			this.mapWhichTile[x][y] = 3;	//adjacent down
		} else if (up && right && down && !left) {
			this.mapWhichTile[x][y] = 4; //adjacent up, right, and down
		} else if (up && !right && down && left) {
			this.mapWhichTile[x][y] = 5; //adjacent up, left, and down
		} else if (!up && right && !down && !left) {
			this.mapWhichTile[x][y] = 6; //adjacent right
		} else if (!up && !right && !down && left) {
			this.mapWhichTile[x][y] = 7; //adjacent left
		} else if (!up && right && ! down && left) {
			this.mapWhichTile[x][y] = 8; //adjacent right and left
		} else if (up && right && !down && !left) {
			this.mapWhichTile[x][y] = 9; //adjacent up and right
		} else if (up && !right && !down && left) {
			this.mapWhichTile[x][y] = 10; //adjacent up and left
		} else if (!up && right && down && !left) {
			this.mapWhichTile[x][y] = 11; //adjacent right and down
		} else if (!up && !right && down && left) {
			this.mapWhichTile[x][y] = 12; //adjacent down and left
		} else if (!up && right && down && left) {
			this.mapWhichTile[x][y] = 13; //adjacent left, right, and down
		} else if (up && right && !down && left) {
			this.mapWhichTile[x][y] = 14; //adjacent left, right, and up
		} else {
			this.mapWhichTile[x][y] = -1;
		}
	
	};

	this.drawTile = function(x,y) {
		switch (this.mapWhichTile[x][y]) {
		case 0:
			rect(MULT/2 + x * MULT, MULT/2 + y * MULT, MULT/2, MULT/2);
			break;
		case 1: //adjacent up
			rect(MULT/3 + x * MULT, y * MULT, MULT/3, MULT/2);
			break;
		case 2: //adjacent up and down
			rect(MULT/3 + x*MULT, y*MULT, MULT/3, MULT);
			break;
		case 3: //adjacent down
			rect(MULT/3 + x*MULT, MULT/2 + y*MULT, MULT/3, MULT/2);
			break;
		case 4: //adjacent up, right, and down
			rect(MULT/3 + x*MULT, y*MULT, MULT/3, MULT);
			rect(MULT/3 + x*MULT, MULT/3 + y*MULT, 2*MULT/3, MULT/3);
			break;
		case 5: //adjacent up, left, and down
			rect(MULT/3 + x*MULT, y*MULT, MULT/3, MULT);
			rect(x*MULT, MULT/3 + y*MULT, MULT/3, MULT/3);
			break;
		case 6: //adjacent right
			rect(MULT/3 + x*MULT, MULT/3 + y*MULT, 2*MULT/3, MULT/3);
			break;
		case 7: //adjacent left
			rect(x*MULT, MULT/3 + y*MULT, 2*MULT/3, MULT/3);
			break;
		case 8: //adjacent right and left
			rect(x*MULT,MULT/3 + y*MULT, MULT, MULT/3);
			break;
		case 9: //adjacent up and right
			rect(MULT/3 + x*MULT, y*MULT, MULT/3, MULT/2);
			rect(MULT/3 + x*MULT, MULT/3 + y*MULT, 2*MULT/3, MULT/3);
			break;
		case 10: //adjacent up and left
			rect(MULT/3 + x*MULT, y*MULT, MULT/3, MULT/2);
			rect(x*MULT, MULT/3 + y*MULT, 2*MULT/3, MULT/3);
			break;
		case 11: //adjacent right and down
			rect(MULT/3 + x*MULT, MULT/2 + y*MULT, MULT/3, MULT/2);
			rect(MULT/3 + x*MULT, MULT/3 + y*MULT, 2*MULT/3, MULT/3);
			break;
		case 12: //adjacent down and left
			rect(MULT/3 + x*MULT, MULT/2 + y*MULT, MULT/3, MULT/2);
			rect(x*MULT, MULT/3 + y*MULT, 2*MULT/3, MULT/3);
			break;
		case 13: //adjacent left and right and down	
			rect(MULT/3 + x*MULT, MULT/2 + y*MULT, MULT/3, MULT/2);
			rect(x*MULT,MULT/3 + y*MULT, MULT, MULT/3);
			break;
		case 14: //adjacent left and right and up
			rect(MULT/3 + x*MULT, y*MULT, MULT/3, MULT/2);
			rect(x*MULT,MULT/3 + y*MULT, MULT, MULT/3);
			break;
		case 15: //adjacent all
			rect(x*MULT,MULT/3 + y*MULT, MULT, MULT/3);
			rect(MULT/3 + x*MULT, y*MULT, MULT/3, MULT);
			break;
		default:
			fill(255);
			rect(x*MULT, y*MULT, MULT, MULT);
			break;
		}
	};
	
	this.floodfill = function(x,y) {
		if (x < 1 || y < 1 || x > this.MAPW-1 || y > this.MAPH-1) {
			return;
		}
		if (this.map[x][y] === 1) {
			return;
		}
		if (this.filled[x][y] === 1) {
			return;
		}

		this.filled[x][y] = 1;
		this.floodfill(x+1, y);
		this.floodfill(x, y+1);
		this.floodfill(x-1, y);
		this.floodfill(x, y-1);
	};

	this.getNewLevel = function() {
		this.currentDots = 0;
		this.totalDots = 0;
		this.buildMap();
	};

}

