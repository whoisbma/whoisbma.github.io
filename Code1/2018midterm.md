**conditionals 1**

add a conditional that makes the ellipse grow only until the diameter reaches the width of the canvas, then makes it shrink until reaching 0, then growing again, back and forth. 

![](https://raw.githubusercontent.com/whoisbma/whoisbma.github.io/master/Code1/img/conditionals1.gif "")

```
float d = 100;
float incr = 5;

void setup() {
  size(600, 600);
}

void draw() {
  background(150);
  ellipse(width/2, height/2, d, d);

  d += incr;  

}

```

**conditionals 2**

in this sketch there is currently a 50% chance that the drawn ellipse will move 10 pixels to the right every frame, and a 50% chance that it will move to 10 pixels to the left. change the sketch so there is a 25% chance that it will move left, 25% chance that it will move right, 25% chance up, and 25% chance down.

![](https://raw.githubusercontent.com/whoisbma/whoisbma.github.io/master/Code1/img/conditionals2.gif "")

```
float xPos;
float yPos;

void setup() {
  size(600, 600);
  xPos = width/2;
  yPos = height/2;
  frameRate(10);
}

void draw() {
  background(50);
  ellipse(xPos, yPos, 30, 30);

  float r = random(2);

  if (int(r) == 0) {
    xPos += 10;
  } else {
    xPos -= 10;
  }
} 
```

**conditionals 3**

this sketch has the ellipse change colors whenever the mouse button is pressed. change the sketch so that the ellipse only changes colors when the mouse is pressed inside the ellipse.

![](https://raw.githubusercontent.com/whoisbma/whoisbma.github.io/master/Code1/img/conditionals3.gif "")

```
void setup() {
  size(600, 600);
}

void draw() {
  background(150);
  if (mousePressed) {
    fill(255);
  } else {
    fill(150);
  }
  
  ellipse(width/2, height/2, 200, 200);
}
```

**conditionals 4**

this sketch draws two rectangles on the side of the screen that change colors when the mouse is over them. change the sketch to have two more rectangles in the right side of the screen that behave in the same way when the mouse is over them.

![](https://raw.githubusercontent.com/whoisbma/whoisbma.github.io/master/Code1/img/conditionals4.gif "")

```
void setup() {
  size(600, 600);
  noStroke();
}

void draw() {
  if (mouseX < width/2 && mouseY < height/2) {
    fill(255);
  } else {
    fill(229, 107, 107);
  }
  rect(0, 0, width/2, height/2);

  if (mouseX < width/2 && mouseY > height/2) {
    fill(255);
  } else {
    fill(107, 229, 107);
  }
  rect(0, height/2, width/2, height/2);
} 
```

**functions1**

this sketch has a function supplied with two arguments that draws a set of shapes to the screen. currently the function is being supplied with the mouseX and mouseY variables, which indicates the drawing should move with the mouse, but it doesn't. fix the function so that it properly uses the supplied arguments.

![](https://raw.githubusercontent.com/whoisbma/whoisbma.github.io/master/Code1/img/functionArgs1.gif "")

```
void setup() {
  size(600, 600);
  rectMode(CENTER);
}

void draw() {
  background(220);
  myDrawing(mouseX, mouseY);
}

void myDrawing(float x, float y) {
  noStroke();
  fill(112);
  ellipse(mouseX, mouseY, 200, 200);
  fill(138);
  rect(mouseX, mouseY, 140, 140);
  fill(160);
  ellipse(mouseX, mouseY, 140, 140);
  fill(178);
  rect(mouseX, mouseY, 95, 95);
  fill(200);
  ellipse(mouseX, mouseY, 95, 95);
}
```

**loops1**

this sketch uses a while loop to draw 100 lines to the screen. replace the while loop with a for loop creating the same result.

![](https://raw.githubusercontent.com/whoisbma/whoisbma.github.io/master/Code1/img/loops1.png "")

```
void setup() {
  size(600,600);
}

void draw() {
  int i = 0;
  while (i < 100) {
    line(i * 6, 0, i * 6, height);
    i++;
  }
}
```

**loops2**

fix the nested for loop so it draws a 9x9 grid of ellipses, rather than the single diagonal line it currently draws.

![](https://raw.githubusercontent.com/whoisbma/whoisbma.github.io/master/Code1/img/loops2.png "")

```
void setup() {
  size(600, 600);
}

void draw() {
  for (int i = 1; i < 10; i++) {
    for (int j = 1; j < 10; j++) {
      ellipse(i * 60, i * 60, 50, 50);
    }
  }
}
```

**map1**

this sketch uses only the setup function to draw points at every pixel to the screen in a gradient in the x and y dimensions. the color should be smoothly blended in all directions to look like the target image, but the current mapping result seems to be off (its mostly yellow). fix it to be an even gradient across the width and height of the canvas.

![](https://raw.githubusercontent.com/whoisbma/whoisbma.github.io/master/Code1/img/map1.png "")

```
void setup() {
  size(600, 600);
  for (int i = 0; i < width; i++) {
    for (int j = 0; j < height; j++) {
      float r = map(i, 0, 255, 0, width);
      float g = map(j, 0, 255, 0, height);
      stroke(r, g, 175);
      point(i, j);
    }
  }
}
```

**map2**

this sketch serves as a basic kind of clock visualization, with rectangles moving across the screen to represent the second, minute, and hour hands. this clock has the seconds hands working, but not the minutes and hours. finish the variable assignment in the draw loop to get them working.

![](https://raw.githubusercontent.com/whoisbma/whoisbma.github.io/master/Code1/img/map2.gif "")

```
void setup() {
  size(600, 600);
}

void draw() {
  background(20);
  
  fill(255);
  
  //float hourPos = 
  //rect(hourPos, 
  
  //float minutePos = 
  //rect(minutePos, 
  
  float secondPos = map(second(), 0, 60, 0, width);
  rect(secondPos, 400, width/60, 600);
}
```

**map3**

change the sketch so that the X movement of the mouse will cause the triangle to complete one full 360 degree rotation. this is best accomplished with map().

![](https://raw.githubusercontent.com/whoisbma/whoisbma.github.io/master/Code1/img/map3.gif "")

```
void setup() {
  size(600, 600);
  rectMode(CENTER);
  noStroke();
}

void draw() {
  background(50);
  translate(width/2, height/2);
  rotate(radians(0));
  triangle(0, -100, 50, 100, -50, 100);
}
```

**random1**

currently the sketch draws random white points all over the canvas. change the values being given to x and y so that the white points are only drawn inside the black rectangle.

![](https://raw.githubusercontent.com/whoisbma/whoisbma.github.io/master/Code1/img/random1.gif "")

```
void setup() {
  size(600, 600);
  background(50);
  rectMode(CENTER);
  fill(0);
  rect(width/2, height/2, 400, 200);
}

void draw() {
  float x = random(0, width);
  float y = random(0, height);
  stroke(255);
  point(x, y);
}
```

**scope1**

this sketch currently draws an ellipse at the middle of the screen. the draw loop increments the variable used to store the y position of the ellipse, but the position doesn't change. fix the variable scope of yPosition so that it increases every frame until reaching the height of the screen. 

![](https://raw.githubusercontent.com/whoisbma/whoisbma.github.io/master/Code1/img/scope1.gif "")

```
void setup() {
  size(600, 600);
}

void draw() {
  int yPosition = width/2;
  ellipse(width/2, yPosition, 100, 100);

  if (yPosition > height) {
    yPosition = 0;
  } else {
    yPosition+=10;
  }
}
```

**scope2**

the for loop looks like it should be drawing 10 rectangles to the screen, but it's only drawing one. fix the scope of the x integer so that all 10 rectangles are drawn to the screen.

![](https://raw.githubusercontent.com/whoisbma/whoisbma.github.io/master/Code1/img/scope2.png "") 

```
void setup() {
  size(600, 600);
  noStroke();
}

void draw() {
  background(150);
  for (int i = 0; i < 10; i++) {
    int x = 15;
    rect(x, 150, 30, 300);
    x += 60;
  }
}
```

**scope3** 

fix the sketch so that it correctly uses the myFunc function to print the String declared in setup(). 

```
String str = "I am a string!";

void setup() {
  String anotherStr = "I want to use the doSomething function to print this String!";
  myFunc(anotherStr);
}

void myFunc(String myStr) {
  println(str);
}
```

**state1**

this sketch checks the value of 'on' to change the background color. add code in the mouseReleased() event function to change the value of 'on' so that a mouse release changes the color of the background.

![](https://raw.githubusercontent.com/whoisbma/whoisbma.github.io/master/Code1/img/state1.gif "") 

```
float bgColor = 0;
boolean on = false;

void setup() {
  size(600, 600);
}

void draw() {
  background(bgColor);
  
  if (on) {
    bgColor = 255;
  } else {
    bgColor = 0;
  }
}

void mouseReleased() {

}
```

**translate1**

this sketch draws a pattern by moving a rotating line from the top to bottom of the screen, and then over to the right, then repeating. change the sketch so that it draws from left to right, then down, instead. change either the translate function or the conditional to do this.

![](https://raw.githubusercontent.com/whoisbma/whoisbma.github.io/master/Code1/img/translate1.gif "") 

```
float x = 0; 
float y = -100;

void setup() {
  size(600, 600);
  background(230);
  rectMode(CENTER);
}

void draw() {
  pushMatrix();
  translate(x, y);
  rotate(radians(frameCount + x));
  stroke(0, 130);
  line(-50, 0, 50, 0);
  
  popMatrix();
  
  y+=5;
  
  if (y > height + 100) {
    y = -100;
    x += 70;
  }
}
```

**translate2**

fix the sketch so that the rectangle is drawn at the position of the mouse. 

![](https://raw.githubusercontent.com/whoisbma/whoisbma.github.io/master/Code1/img/translate2.gif "") 

```
void setup() {
  size(600, 600);
  rectMode(CENTER);
}

void draw() {
  background(80);
  translate(mouseX, mouseY);
  noStroke();
  rect(mouseX, mouseY, 100, 100);
}
```

**translate3**

adjust the matrix transformations so that the small rectangle revolves around the large rectangle. 

![](https://raw.githubusercontent.com/whoisbma/whoisbma.github.io/master/Code1/img/translate3.gif "") 

```
float angle1 = 0;
float angle2 = 0;

void setup() {
  size(600, 600);
  rectMode(CENTER);
}

void draw() {
  background(150);
  fill(40);
  stroke(220);
  
  angle1 += 1;
  angle2 -= 2;
  
  pushMatrix();
  translate(300, 300);
  rotate(radians(angle1));
  rect(0, 0, 100, 100);
  popMatrix();  
  
  pushMatrix();
  translate(150, 150);
  rotate(radians(angle2));
  rect(0, 0, 50, 50);
  popMatrix();

}
```

**arrays1**

this sketch uses a single array of floats to store values used in a drawing function. change the sketch so that it instantiates an array of 100 ellipses instead. you will need to change the way the values are given to the array. map the values in the array so that when drawn, the ellipses will be evenly spaced moving down the screen from the top to the bottom.

![](https://raw.githubusercontent.com/whoisbma/whoisbma.github.io/master/Code1/img/arrays1.png "") 

```
float[] pos = { 100, 200, 300, 400, 500 };

void setup() {
  size(600, 600);
}

void draw() {
  background(240);
  for (int i = 0; i < pos.length; i++) {
    ellipse(width/2, pos[i], 50, 50);
  }
}
```

**arrays2**

this array creates two arrays of floats but with no size, and with no effect in the draw loop. fix the sketch so that the arrays have some size and values, and are then used to draw something to the screen in the draw loop. finally, add behavior that changes the value of each float in the loop every frame. try to add more arrays (for colors, angles, etc) if there is behavior that you want to change that doesn't involve positions.

![](https://raw.githubusercontent.com/whoisbma/whoisbma.github.io/master/Code1/img/arrays2.gif "") 

```
float[] xPositions;
float[] yPositions;

void setup() {
  size(600, 600);
  background(100);
  for (int i = 0; i < xPositions.length; i++) {
    xPositions[i] = 0;
    yPositions[i] = 0;
  }
}

void draw() {
  
}

```

**arrays3**

this sketch uses a 2d array to store colors that will be used to draw rectangles in a grid. change the draw loop so that it draws evenly spaced rectangles across the screen, and add a conditional to make sure that once a color turns white, it returns back to black as seen in the example gif. 

![](https://raw.githubusercontent.com/whoisbma/whoisbma.github.io/master/Code1/img/arrays3.gif "") 

```
int gridW = 10;
int gridH = 10;
float[][] greyColors = new float[gridW][gridH];

void setup() {
  size(600, 600);
  for (int i = 0; i < gridW; i++) {
    for (int j = 0; j < gridH; j++) {
      greyColors[i][j] = map(j * gridW + i, 0, gridW * gridH, 0, 255);
    }
  }
}

void draw() {
  for (int i = 0; i < gridW; i++) {
    for (int j = 0; j < gridH; j++) {
      greyColors[i][j]+=1;
      fill(greyColors[i][j]);
      rect(0, 0, width/gridW, height/gridH);
    }
  }
}
```
