"use strict";

const request = require('request');
const FetchError = require('./exceptions').FetchError;

const getBets = (url, scrapper, next) => {
  return next => {
    const options = {
      url: url,
      headers: {
        'User-Agent': "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36"
      }
    };
    request(options, (err, response, body) => {
      if (err){
        throw new FetchError("Failed to fetch the lines.");
      }
      return next(scrapper(body));
    });
  };
};

module.exports = getBets;
