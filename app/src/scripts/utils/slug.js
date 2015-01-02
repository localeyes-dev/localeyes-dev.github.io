'use strict';

function slug (string) {
  string = string || '';
  return string.toLowerCase().replace(' ', '_');
};

module.exports = slug;