"use strict";

const ParseError = message => {
  this.message = message;
  this.stack = (new Error()).stack;
};

ParseError.prototype = Object.create(Error.prototype);
ParseError.prototype.name = "ParseError";


const FetchError = message => {
  this.message = message;
  this.stack = (new Error()).stack;
};

FetchError.prototype = Object.create(Error.prototype);
FetchError.prototype.name = "FetchError";

module.exports = {
  ParseError,
  FetchError
};
