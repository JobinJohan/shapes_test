Element.prototype.remove = function() {
    this.parentElement.removeChild(this);
}
NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
    for(var i = this.length - 1; i >= 0; i--) {
        if(this[i] && this[i].parentElement) {
            this[i].parentElement.removeChild(this[i]);
        }
    }
}

function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function isInsideTriangle(px, py, x1, y1, x2, y2, x3, y3){
  // get the area of the triangle
  var areaOrig = floor(abs((x2 - x1) * (y3 - y1) - (x3 - x1) * (y2 - y1)));
  //console.log("totalArea: " + areaOrig);

  // get the area of 3 triangles made between the point and the corners of the triangle
  var area1 = floor(abs((x1 - px) * (y2 - py) - (x2 - px) * (y1 - py)));
  var area2 = floor(abs((x2 - px) * (y3 - py) - (x3 - px) * (y2 - py)));
  var area3 = floor(abs((x3 - px) * (y1 - py) - (x1 - px) * (y3 - py)));
  //console.log("areaSum: " + (area1 + area2 + area3));

  // if the sum of the three areas equals the original, we're inside the triangle
  if (area1 + area2 + area3 <= areaOrig) {
    return true;
  }
  return false;
}

function isInsideRectangle(px, py, x, y, width, height){
  console.log("MouseX: " + px);
  console.log("MouseY: " + py);
  console.log("rectX: " + x);
  console.log("rectY: " + y);
  console.log("width: " + width);
  console.log("height: " +abs(height));
  return px > x && px < x +width && py < y && py > y - abs(height);
}
