class Triangle{
  constructor(x1, y1, x2, y2, x3, y3, rightAnswer, fillColor, label){
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.x3 = x3,
    this.y3 = y3;
    this.rightAnswer = rightAnswer;
    this.fillColor = fillColor;
    this.label = label;
    this.type="triangle";
  }

  getFirstPoint(){
    return {x: this.x1, y: this.y1};
  }
  getSecondPoint(){
    return {x: this.x2, y: this.y2};
  }

  getThirdPoint(){
    return {x: this.x3, y: this.y3};
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
    triangle(this.x1, this.y1, this.x2, this.y2, this.x3, this.y3);
    fill("#000000");
    text(this.label, ((this.x1+this.x2)/2)-18, (this.y1+this.y3)/2);
    return this; // allows method chaining
  }
}
