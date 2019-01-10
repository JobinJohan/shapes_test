class Square{
  constructor(x, y, width, height, rightAnswer, fillColor, label){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.rightAnswer = rightAnswer;
    this.fillColor = fillColor;
    this.label = label;
    this.type="square";
  }

  getX(){
    return this.x;
  }
  getY(){
    return this.y;
  }
  getWidth(){
    return this.width;
  }
  getHeight(){
    return this.height;
  }
  getLabel(){
    return this.label;
  }
  getFillColor(){
    return this.fillColor;
  }
  getAnswer(){
    return this.rightAnswer;
  }
  getType(){
    return this.type;
  }

  shapeDraw(){
    fill(this.fillColor);
    noStroke();
    rect(this.x,this.y,this.width, this.height);
    fill("#000000");
    text(this.label, this.x + this.width/2-25, this.y+ this.height/2);
    return this; // allows method chaining
  }
}
