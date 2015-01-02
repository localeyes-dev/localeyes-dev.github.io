'use strict';

function random (low, high, round) {
  round = round || false;
  
  var randomValue = Math.random() * (high - low) + low;

  if (round) {
    return Math.floor(randomValue);
  }
  
  return randomValue;
}

module.exports = random;