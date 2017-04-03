"use strict";

const ParseError = function(message){
  this.message = message;
  this.stack = (new Error()).stack;
}

ParseError.prototype = Object.create(Error.prototype);
ParseError.prototype.name = "ParseError";
ParseError.prototype.constructor = ParseError;


const FetchError = function(message) {
  this.message = message;
  this.stack = (new Error()).stack;
};

FetchError.prototype = Object.create(Error.prototype);
FetchError.prototype.name = "FetchError";
FetchError.prototype.constructor = FetchError;

module.exports = {
  ParseError,
  FetchError
};
