"use strict";

const BASE = "http://topbet.eu/tbadmin43/sportsbook/show";
const FOOTBALL = `${BASE}/football`;
const BASKETBALL = `${BASE}/basketball`;
const SUFFIX = "2";

const NFL_FULL_GAME = `${FOOTBALL}/nfl/${SUFFIX}`;
const NFL_FIRST_HALF = `${FOOTBALL}/nfl-1st-half/${SUFFIX}`;
const NFL_SECOND_HALF = `${FOOTBALL}/nfl-2nd-half/${SUFFIX}`;

const NBA_FULL_GAME = `${BASKETBALL}/nba/${SUFFIX}`;
const NBA_FIRST_HALF = `${BASKETBALL}/nba-1st-half/${SUFFIX}`;
const NBA_SECOND_HALF = `${BASKETBALL}/nba-2nd-half/${SUFFIX}`;

module.exports = {
  NBA_FULL_GAME,
  NBA_FIRST_HALF,
  NBA_SECOND_HALF
};
