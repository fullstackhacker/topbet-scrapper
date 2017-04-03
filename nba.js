"use strict";

const constants = require('./constants');
const getBets = require('./bets');
const scrappers = require('./scrappers');

const getFullGameBets = next => getBets(constants.URLS.NBA_FULL_GAME, scrappers.fullGameScrapper)(next);
const getFirstHalfBets = next => getBets(constants.URLS.NBA_FIRST_HALF, scrappers.halfGameScrapper)(next);
const getSecondHalfBets = next => getBets(constants.URLS.NBA_SECOND_HALF, scrappers.halfGameScrapper)(next);

module.exports = {
  getFullGameBets,
  getFirstHalfBets,
  getSecondHalfBets
};
