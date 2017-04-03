"use strict";

const constants = require('./constants');
const getBets = require('./bets');
const scrappers = require('./scrappers');

const getFullGameBets = next => getBets(constants.URLS.NBA_FULL_GAME, scrappers.fullGameScrapper)(next);

module.exports = {
  getFullGameBets
};
