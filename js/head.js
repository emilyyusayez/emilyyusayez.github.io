// returns a random int [min; max]
function random(min, max) {
  if (min > max) {
    let oldMin = min;
    min = max;
    max = oldMin;
  }
  
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

Array.prototype.insert = function ( index, ...items ) {
  this.splice( index, 0, ...items );
};

/*
var arr = [ 'A', 'B', 'E' ];
arr.insert(2, 'C', 'D');

// => arr == [ 'A', 'B', 'C', 'D', 'E' ]
*/