class Circle{
  constructor(x, y, r, rightAnswer, fillColor, label){
    this.x = x;
    this.y = y;
    this.r = r;
    this.rightAnswer = rightAnswer;
    this.fillColor = fillColor;
    this.label = label;
    this.type="circle";
    var textColor = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
    this.textRandomColor= textColor;
  }

  getX(){
    return this.x;
  }
  getY(){
    return this.y;
  }
  getRadius(){
    return this.r;
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
    ellipse(this.x,this.y,this.r, this.r);
    fill(this.textRandomColor);
    text(this.label, this.x-20, this.y);
    return this; // allows method chaining
  }
}
