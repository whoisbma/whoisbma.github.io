### syntax errors

```
// Fix all the syntax errors so the code runs.

void setup() {
  // we'll create a counter variable to count the frames
  int counter = 0:

  String welcomeMsg = "welcome to the first midterm question!"
  
  bool isCodeGreat = true;
  
  println(welcomeMsg);
  
  println('now we'll do a loop and print the iterating value!');
  for (int i = 0; i++; i < 3) 
    println("this is loop number " i);
  }
  flaot floatArray = new float[100];
  println("there are " + floatArray.size() + " positions in floatArray")
}
void draw() {
  // we'll increment counter every frame until 60, then reset
  if (0 < counter < 60) {
    counter+;
  } else {
    counter = 0;
  } 
```

### semantic errors

note this sketch includes a folder called "daata" with a mismatched png.

```
// QUESTION 2 - 
// Fix all the semantic errors so the code runs as expected

void setup() {
  size(-100, -100);
  
  int aNumber = 1.1;
  float[] bunchONumbers = {10, true, "hello!"};

  for (int i = 0; i <= bunchONumbers.length; i++) {
    println(bunchONumbers[i]);
  }
  
  boolean[] bunchOBools = new boolean[10];
  
  for (int i = 10; i > 0; i++) {
    bunchOBools[i] = true;
  }

  PImage img;
  img = loadImage("doge.png");

  image(img, 0, 0, width, height);
}
```

### design errors

```
// Make the lines follow the mouse as a trail behind the mouse position correctly
// The position is off and so is the assignment

float[] xPositions = new float[100];
float[] yPositions = new float[100];

void setup() {
  size(600, 600);
}

void draw() {
  background(255);
  for (int i = 0; i < xPositions.length - 1; i++) {
    line(xPositions[i], yPositions[i], xPositions[i+1], yPositions[i+1]);
  }

  for (int i = xPositions.length - 1; i > 0; i--) {
    xPositions[i] = xPositions[i-1];
    yPositions[i] = yPositions[i-1];
  }

  xPositions[0] = mouseY;
  yPositions[0] = mouseX;
}
```

![1](whoisbma.github.io/Code1/gifs/1.gif "1")
