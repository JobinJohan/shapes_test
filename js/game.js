
var started = false;
var ended=false;
const totalQuestions=50;
var currentNbQuestion=0;


var rightAnswer =0;
var wrongAnswer=0;
var currentQuestion ="";
var currentOptions = [];
let score = 0;
var timers = [];
var firstloopEnd=true;

function setup() {
  createCanvas(windowWidth-100, windowHeight-100);
  noLoop();
}

function draw() {
  if(started && currentNbQuestion<totalQuestions){
    background(220);
    fill(50);
    textSize(30);
    text(currentQuestion, windowWidth/2-250, windowHeight/3.5);
    textSize(20);
    text("N° of the question: " + currentNbQuestion, 100, 20);
    text("Right answer: " + rightAnswer, windowWidth-275, 20);
    text("Wrong answer: " + wrongAnswer, windowWidth-275, 40)
    textSize(23);
    textStyle(BOLD);
    currentOptions.forEach(function(element){
      element.shapeDraw();
    });
    textStyle(NORMAL);
  }
  else if(ended || currentNbQuestion>=totalQuestions){
    if(firstloopEnd){
      firstloopEnd=false;
      circles=[];
      background(220);
      fill(50);
      textSize(40);
      textAlign(CENTER, CENTER);
      text("End of the game: good answers: " + rightAnswer + " , wrong answers: "+ wrongAnswer, (windowWidth-140)/2, 300);
      var button = createButton('Play again');
      button.addClass('flat-button');
      button.position((windowWidth-350)/2, 350);
      button.mousePressed(function(){location.reload();});
    }

  }

}

function mousePressed(){

  for(var j=0; j<currentOptions.length; j++){
    if(currentOptions[j].getType() =="circle"){

      let d = dist(mouseX, mouseY, currentOptions[j].getX(), currentOptions[j].getY());

      if(d < currentOptions[j].getRadius()/2 && currentOptions[j].getAnswer()){
        ++rightAnswer;
        timers.forEach(function(element){
          window.clearInterval(element);
        });
        currentNbQuestion+=1;
        start();
        break;

      }
      else if(d < currentOptions[j].getRadius()/2 && !currentOptions[j].getAnswer()){
        ++wrongAnswer;
        timers.forEach(function(element){
          window.clearInterval(element);
        });
        currentNbQuestion+=1;
        start();
        break;
      }

    }
    else if(currentOptions[j].getType() =="triangle"){
      var triangle= currentOptions[j];
      if(isInsideTriangle(mouseX, mouseY, triangle.getFirstPoint().x, triangle.getFirstPoint().y, triangle.getSecondPoint().x, triangle.getSecondPoint().y, triangle.getThirdPoint().x, triangle.getThirdPoint().y) && triangle.getAnswer()){
        ++rightAnswer;
        timers.forEach(function(element){
          window.clearInterval(element);
        });
        currentNbQuestion+=1;
        start();
        break;
      }
      else if(isInsideTriangle(mouseX, mouseY, triangle.getFirstPoint().x, triangle.getFirstPoint().y, triangle.getSecondPoint().x, triangle.getSecondPoint().y, triangle.getThirdPoint().x, triangle.getThirdPoint().y) && !triangle.getAnswer()){
        ++wrongAnswer;
        timers.forEach(function(element){
          window.clearInterval(element);
        });
        currentNbQuestion+=1;
        start();
        break;
      }
    }
    else if(currentOptions[j].getType() == "square"){
      var rectangle = currentOptions[j];
      console.log(rectangle);
      console.log(isInsideRectangle(mouseX, mouseY, rectangle.getX(), rectangle.getY(), rectangle.getWidth(), rectangle.getHeight()));
      if(isInsideRectangle(mouseX, mouseY, rectangle.getX(), rectangle.getY(), rectangle.getWidth(), rectangle.getHeight()) && rectangle.getAnswer()){
        ++rightAnswer;
        timers.forEach(function(element){
          window.clearInterval(element);
        });
        currentNbQuestion+=1;
        start();
        break;
      }
      else if(isInsideRectangle(mouseX, mouseY, rectangle.getX(), rectangle.getY(), rectangle.getWidth(), rectangle.getHeight()) && !rectangle.getAnswer()){
        ++wrongAnswer;
        timers.forEach(function(element){
          window.clearInterval(element);
        });
        currentNbQuestion+=1;
        start();
        break;
      }
    }


  }
}



function generateQuestion(){
  currentOptions = [];


  // console.log("salut1");
    var shapes = ["square", "triangle", "circle"];
    var colors = ["red", "yellow", "green", "blue", "gray", "purple" ];
    var colorsHex = ["#FF0000", "#FFFF00", "#008000", "#0000FF", "#808080", "#800080"];
    var positions = [{x:((windowWidth-400)/4), y:windowHeight/1.5}, {x: 2*((windowWidth-400)/4), y:windowHeight/1.5}, {x: 3*((windowWidth-400)/4), y:windowHeight/1.5}, {x: 4*((windowWidth-400)/4), y: windowHeight/1.5}];
    var typeOfQuestion = getRandomArbitrary(-1, 1);
    // console.log("salut2");

    for(var i=0; i<4; i++){
      // console.log("salut i:" + i);
      var randomShapeIndex= getRandomArbitrary(0, shapes.length);
      var randomColorIndex = getRandomArbitrary(0, colors.length);
      var randomColorHexIndex = getRandomArbitrary(0, colorsHex.length);
      var randomPositionsIndex = getRandomArbitrary(0, positions.length);

      if(i==0){
        // console.log(randomShapeIndex);
        // console.log(shapes[randomShapeIndex]);
        switch(shapes[randomShapeIndex]){
          case "square":
              //console.log("square");
              var square = new Square(positions[randomPositionsIndex].x, positions[randomPositionsIndex].y, 200, -200, true, colorsHex[randomColorHexIndex], colors[randomColorIndex]);
              currentOptions.push(square);
            break;
          case "triangle":
              var triangle = new Triangle(positions[randomPositionsIndex].x, positions[randomPositionsIndex].y, positions[randomPositionsIndex].x +200, positions[randomPositionsIndex].y, positions[randomPositionsIndex].x +100, positions[randomPositionsIndex].y-200, true, colorsHex[randomColorHexIndex], colors[randomColorIndex]);
              //console.log("triangle");
              currentOptions.push(triangle);
            break;
          case "circle":
              var circle = new Circle(positions[randomPositionsIndex].x+100, positions[randomPositionsIndex].y-100, 100, true, colorsHex[randomColorHexIndex], colors[randomColorIndex]);
              //console.log("circle");
              currentOptions.push(circle);
            break;
        }

        // Question about the background color
        if(typeOfQuestion == 0){
          currentQuestion = "Select the " + colors[randomColorHexIndex] + " " + shapes[randomShapeIndex];
          //colorsHex.splice(randomColorIndex,1);
          var colorHexRef = randomColorHexIndex;
          var shapeRef = randomShapeIndex;
        }
        // Question about the word
        else{
          currentQuestion = "Select the " + shapes[randomShapeIndex] + " containing the word " + colors[randomColorIndex];
          //shapes.splice(randomShapeIndex,1);
          var shapeRef = randomShapeIndex;
          var wordRef = randomColorIndex;
        }
      }
      else{
        if(typeOfQuestion==0){
          do{
            var randomShapeIndex= getRandomArbitrary(0, shapes.length);
            var randomColorIndex = getRandomArbitrary(0, colors.length);
            var randomColorHexIndex = getRandomArbitrary(0, colorsHex.length);
            var randomPositionsIndex = getRandomArbitrary(0, positions.length);
          } while(randomShapeIndex==shapeRef&&randomColorHexIndex==colorHexRef);
        }
        else{
          do{
            var randomShapeIndex= getRandomArbitrary(0, shapes.length);
            var randomColorIndex = getRandomArbitrary(0, colors.length);
            var randomColorHexIndex = getRandomArbitrary(0, colorsHex.length);
            var randomPositionsIndex = getRandomArbitrary(0, positions.length);
          } while(randomShapeIndex==shapeRef&&randomColorIndex==wordRef);
        }



        switch(shapes[randomShapeIndex]){
          case "square":
              var square = new Square(positions[randomPositionsIndex].x, positions[randomPositionsIndex].y, 200, -200, false, colorsHex[ randomColorHexIndex], colors[randomColorIndex]);
            //  console.log("square");
              currentOptions.push(square);
            break;
          case "triangle":
              var triangle = new Triangle(positions[randomPositionsIndex].x, positions[randomPositionsIndex].y, positions[randomPositionsIndex].x +200, positions[randomPositionsIndex].y, positions[randomPositionsIndex].x +100, positions[randomPositionsIndex].y-200, false, colorsHex[randomColorHexIndex], colors[randomColorIndex]);
              //console.log("triangle");
              currentOptions.push(triangle);
            break;
          case "circle":
              var circle = new Circle(positions[randomPositionsIndex].x+100, positions[randomPositionsIndex].y-100, 100, false, colorsHex[randomColorHexIndex], colors[randomColorIndex]);
            //  console.log("circle");
              currentOptions.push(circle);
            break;
        }

      }
      positions.splice(randomPositionsIndex,1);
    }
}

function start(){
  if(document.getElementById("mainMenu")!= null){
    document.getElementById("mainMenu").remove();
  }
  if(document.getElementById("header")!=null){
    document.getElementById("header").remove();
  }
  startTimer();
  generateQuestion();
  console.log(currentOptions);

  started=true;
  loop();
}

function startTimer(){
  var timeleft = 3;
  document.getElementById("timer").hidden=false;
  var downloadTimer = setInterval(function(){
    document.getElementById("progressBar").value = 3 - --timeleft;
    document.getElementById("remainingTime").innerHTML= timeleft;
    if(currentNbQuestion==totalQuestions){
      clearInterval(downloadTimer);
      document.getElementById("timer").hidden=true;
      ended = true;
    }
    if(timeleft <= 0){
      clearInterval(downloadTimer);
      started = false;
      if (currentNbQuestion<totalQuestions){
        currentNbQuestion+=1;
        wrongAnswer+=1;
        start();

      }
    }
    },1000);
  timers.push(downloadTimer);
}
