"use strict";

const request = require('request');
const exceptions = require('./exceptions');
const ParseError = exceptions.ParseError;
const FetchError = exceptions.FetchError;

const getBets = (url, scrapper) => {
  return next => {
    const options = {
      url: url,
      headers: {
        'User-Agent': "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36"
      }
    };
    request(options, (err, response, body) => {
      if (err){
        next(new FetchError("Network failure fetching lines."), false);
      }
      try {
        return next(null, scrapper(body));
      }
      catch(exception) {
        if (exception instanceof ParseError) {
          return next(exception, false);
        }
        else {
          throw exception;
        }
      }
    });
  };
};

module.exports = getBets;
