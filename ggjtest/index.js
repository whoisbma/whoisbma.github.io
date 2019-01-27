const canvas = document.getElementById('game_canvas');
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

var GEM_W = 64;
var GEM_H = 64;
let OFFSET = 125;
let GEM_S = 1.5; 
let PADDING = 10;
let COLS = 6;
let ROWS = 6;

const game = new Phaser.Game({
  width: 800, 
  height: 800, 
  type: Phaser.AUTO, 
  parent: 'game_canvas',
  title: 'ggj19',
  scene: {
    preload: preload,
    create: create,
  },
});

let gems;
let cursor;
let selectedGem = null;
// let local = 'http://localhost:8000/';
// let github = 'https://git.bryan.ma/ggj19/';

function preload() {
  // this.load.setBaseURL(local);

  // this.load.crossOrigin = 'anonymous'
  // this.load.setCORS('https://git.bryan.ma/ggj19/');

  this.load.image('background', './assets/background.jpg');
  this.load.image('book', './assets/book.png');
  this.load.image('oilbottle', './assets/oilbottle.png');
  this.load.image('plant', './assets/plant.png');
  this.load.image('scissors', './assets/scissors.png');
  this.load.spritesheet('gems', './assets/gems32x24x5.png', {
    frameWidth: GEM_W,
    frameHeight: GEM_H,
  });
}

function create() {
  bg = this.add.image(400, 400, 'background');
  bg.setDepth(-10);
  bg.setDisplaySize(800, 800);
  gems = this.add.group();

  for (let i = 0; i < COLS; i++) {
    for (let j = 0; j < ROWS; j++) {
      let r = Phaser.Math.Between(0, 3);
      let gem;
      switch (Math.floor(r)) {
        case 0:
          gem = gems.create(OFFSET + i * GEM_W * GEM_S + PADDING * i, OFFSET + j * GEM_H * GEM_S + PADDING * j, 'oilbottle');
          gem.category = 0;
          break;
        case 1:
          gem = gems.create(OFFSET + i * GEM_W * GEM_S + PADDING * i, OFFSET + j * GEM_H * GEM_S + PADDING * j, 'book');
          gem.category = 1;
          break;
        case 2:
          gem = gems.create(OFFSET + i * GEM_W * GEM_S + PADDING * i, OFFSET + j * GEM_H * GEM_S + PADDING * j, 'plant');
          gem.category = 2;
          break;
        case 3:
          gem = gems.create(OFFSET + i * GEM_W * GEM_S + PADDING * i, OFFSET + j * GEM_H * GEM_S + PADDING * j, 'scissors');
          gem.category = 3;
          break;
        default:
          break;
      }
      
      gem.setScale(GEM_S,GEM_S);
      gem.setInteractive();
      gem.posX = i;
      gem.posY = j;
      gem.id = getGemId(i, j);
      gem.name = 'gem' + i.toString() + 'x' + j.toString();

      // gem.on('pointerdown', selectGem);
      // gem.on('pointerup', releaseGem);
      // gem.on('pointerout', releaseGem);

      // gem.
      // console.log(gem);
      // gem.frame = Phaser.Math.Between(0, 4);
      // gem.destroy();

    }
  }

  cursor = this.make.graphics({
    x: 0,
    y: 0,
    add: false, 
    fillStyle: {
      color: 0xffffff,
      alpha: 0.5
    },
  });
  cursor.fillRect(0, 0, 96, 96);
  cursor.generateTexture('block', 96, 96);
  let highlighted = this.add.image(96, 96, 'block');
  highlighted.setDepth(-1);

  this.input.on('pointerover', (pointer, gameObjects) => {
    highlighted.setPosition(gameObjects[0].x, gameObjects[0].y);
  });

  this.input.on('pointerdown', (pointer, gameObjects) => {
    // if its part of gems group,
    if (gems.children.entries.indexOf(gameObjects[0]) > -1) {
      selectedGem = gameObjects[0];
      selectedGem.setTint(0x333333);
    }
  });

  this.input.on('pointerup', (pointer, gameObjects) => {
    if (selectedGem !== null) {
      if (gameObjects.length > 0) {
        const swappedGem = gameObjects[0];
        if (isAdjacent(swappedGem, selectedGem)) {
          swapPosition(selectedGem, swappedGem);
        }
      }
    selectedGem.clearTint();
    selectedGem = null;
    } 
  });
}

function swapPosition(gem1, gem2) {
  let newPos = [gem2.x, gem2.y];
  let newGridPos = [gem2.posX, gem2.posY];
  gem2.posX = gem1.posX;
  gem2.posY = gem1.posY;
  gem2.id = getGemId(gem2.posX, gem2.posY)
  gem1.posX = newGridPos[0];
  gem1.posY = newGridPos[1];
  gem1.id = getGemId(gem1.posX, gem1.posY);

  const matches1 = getMatchesAtPosition(gem1.posX, gem1.posY, getGemColor(gem1));
  const matches2 = getMatchesAtPosition(gem2.posX, gem2.posY, getGemColor(gem2));

  const onComplete = () => {
    if (matches1.length < 3 && matches2.length < 3) {
      let newPos = [gem2.x, gem2.y];
      let newGridPos = [gem2.posX, gem2.posY];
      gem2.posX = gem1.posX;
      gem2.posY = gem1.posY;
      gem2.id = getGemId(gem2.posX, gem2.posY)
      gem1.posX = newGridPos[0];
      gem1.posY = newGridPos[1];
      gem1.id = getGemId(gem1.posX, gem1.posY);
      tweenGemPos(gem1, newPos[0], newPos[1], () => {});
      tweenGemPos(gem2, gem1.x, gem1.y, () => {});
    } else {
      handleMatches(matches1);
      handleMatches(matches2);      
    }
  };

  tweenGemPos(gem1, newPos[0], newPos[1], () => {});
  tweenGemPos(gem2, gem1.x, gem1.y, onComplete);
}

function handleMatches(matches) {
  if (matches.length > 2) {
    for (let i = 0 ; i < matches.length; i++) {
      let matchToDestroy = gems.getChildren().find((gem) => gem.id === matches[i]);
      if (matchToDestroy) {
        matchToDestroy.destroy();
      }
    }
  } 
}

function getGemColor(gem) {
  if (!gem) return null;
  return gem.category;
}

function isAdjacent(gem1, gem2) {
  // console.log(Math.abs(gem1.posX - gem2.posX), Math.abs(gem1.posY - gem2.posY));
  return ((Math.abs(gem1.posX - gem2.posX) === 1 && Math.abs(gem1.posY - gem2.posY) === 0) || 
          (Math.abs(gem1.posX - gem2.posX) === 0 && Math.abs(gem1.posY - gem2.posY) === 1));     
}

function getGemId(x, y) {
  return x + y * COLS;
}

function getGemByCoord(x, y) {
  return gems.getChildren().find((gem) => gem.id === getGemId(x, y)); //.iterate('id', getGemId(x, y), Phaser.Group.RETURN_CHILD);
}

function getMatchesAtPosition(x, y, color, opt_results) {
  results = opt_results || [];
  for (let i = Math.max(x - 1, 0); i <= Math.min(x + 1, COLS - 1); i++) {
    if (i !== x) {
      let gem = getGemByCoord(i, y);
      if (color === getGemColor(gem)) {
        if (!results.includes(gem.id)) {
          results.push(gem.id);
          results.concat(getMatchesAtPosition(i, y, color, results));
        } 
      }
    }
  }
  for (let j = Math.max(y - 1, 0); j <= Math.min(y + 1, COLS - 1); j++) {
    if (j !== y) {
      let gem = getGemByCoord(x, j);
      if (color === getGemColor(gem)) { 
        if (!results.includes(gem.id)) {
          results.push(gem.id);
          results.concat(getMatchesAtPosition(x, j, color, results));
        }
      }
    }
  }
  return results;
}

function tweenGemPos(gem, newPosX, newPosY, callback) {
  // console.log('tween', gem.name, 'from', gem.x, gem.y, 'to', newPosX, newPosY);
  return game.scene.scenes[0].tweens.add({
    targets: gem,
    x: newPosX,
    y: newPosY,
    duration: 500,
    ease: 'Power2',
    onComplete: callback,
  });

  // var marker = game.add.image(100, 300, 'block').setAlpha(0.3);
  // var image = game.add.image(100, 300, 'block');

  // game.tweens.add({
  //     targets: image,
  //     x: 700,
  //     duration: 3000,
  //     ease: 'Power2',
  //     completeDelay: 3000
  // });
}
