var points = [];
var speed = 1.02;
var analyzer;


function preload() {
  audio = loadSound("./assets/audio.mp3");
  face  = loadImage("./assets/face.png");
}

function setup() {
  background(0);
  colorMode(HSB, 255)
  analyzer = new p5.Amplitude();
  analyzer.setInput(audio);
  createCanvas(windowWidth, windowHeight);
  audio.play();

  for (var i = 0; i < 50; i++) {
    points[i] = new Point();
  };

}

function draw() {
  noStroke(),
  translate(windowWidth / 2, windowHeight / 2);
  background(0, 20);

  if (audio.isPlaying() == false) {
    audio.play();
  };

  for (var i = 0; i < 50; i++) {
    points[i].update();
    points[i].show();
  };

}


function Point() {
  this.x = random(-10, 10);
  this.y = random(-10, 10);

  this.update = function update() {
    this.x *= speed;
    this.y *= speed;

    if (this.x < -windowWidth / 2) {
      this.x = random( -windowWidth / 2, windowWidth / 2)
    };
    if (this.x > windowWidth / 2) {
      this.x = random( -windowWidth / 2, windowWidth / 2)
    };
    if (this.y < -windowHeight / 2) {
      this.y = random(-windowHeight / 2, windowHeight / 2)
    };
    if (this.y > windowHeight / 2) {
      this.y = random(-windowHeight / 2, windowHeight / 2)
    };
  }

  this.show = function show() {
    tint(map(analyzer.getLevel(), 0, 0.3, 0, 255), 255, 255, 255); //
    image(face,
          this.x - (analyzer.getLevel() * 100),
          this.y - (analyzer.getLevel() * 100),
          analyzer.getLevel() * 200,
          analyzer.getLevel() * 200 * 1.27,
          );
  };

}
