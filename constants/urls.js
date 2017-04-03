"use strict";

const BASE = "http://topbet.eu/tbadmin43/sportsbook/show";
const FOOTBALL = `${BASE}/football`;
const BASKETBALL = `${BASE}/basketball`;
const SUFFIX = "2";

const NFL_FULL_GAME = `${FOOTBALL}/nfl/${SUFFIX}`;
const NBA_FULL_GAME = `${BASKETBALL}/nba/${SUFFIX}`;

module.exports = {
  NFL_FULL_GAME,
  NBA_FULL_GAME
};
