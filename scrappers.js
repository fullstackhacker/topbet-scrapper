"use strict";

const request = require('request');
const cheerio = require('cheerio');
const _ = require('lodash');
const ParseError = require('./exceptions').ParseError;

/**
 * takes the response from topbet's api and creates an array
 * of strings containing each individual bet, cleaning out un-
 * necessary junk
 */
const responseBodyCleaner = responseBody => {
  const $ = cheerio.load(JSON.parse(responseBody)[0].content);
  const eventsTable = $(".event")

  if (!eventsTable.text()){
    throw new ParseError("Unable to load bets.");
  }

  const betTextList = [];
  eventsTable.each(function(){
    betTextList.push($(this).text());
  });

  let bets = betTextList.map(function(betTexts){
    betTexts = betTexts.split("\n");

    betTexts = _.map(betTexts, function(betText){
      return _.trim(betText); 
    });

    return _.pull(betTexts, false, "");
  });

  return bets;
};

const fullGameBetStringToObject = betTexts => {
  const bet = {};

  bet.parlayable = true;

  bet.title = betTexts[0];
  if (bet.title == "O"){  // "O" signifies that no parley is allowed on the bet
    bet.title = betTexts[1];
    bet.parlayable = false;
    betTexts.shift();  // remove the first element (the "O")
  }

  const teamNames = bet.title.split(' at ', 2);
  const awayTeamName = teamNames[0];

  // remove the date
  let homeTeamName = teamNames[1].split(" ");
  homeTeamName.pop();
  homeTeamName = homeTeamName.join(" ");

  bet.awayTeam = {};
  bet.awayTeam.name = awayTeamName;
  bet.awayTeam.spread = {};
  bet.awayTeam.spread.line = betTexts[10];
  bet.awayTeam.spread.vig = betTexts[11];
  bet.awayTeam.moneyLine = betTexts[13];


  bet.homeTeam = {};
  bet.homeTeam.name = homeTeamName;
  bet.homeTeam.spread = {};
  bet.homeTeam.spread.line = betTexts[21];
  bet.homeTeam.spread.vig = betTexts[22];
  bet.homeTeam.moneyLine = betTexts[24];

  bet.over = {};
  bet.over.line = betTexts[16];
  bet.over.vig = betTexts[17];

  bet.under = {};
  bet.under.line = betTexts[27];
  bet.under.vig = betTexts[28];

  return bet;
};

const halfGameBetStringToObject = betTexts => {
  const bet = {};

  bet.title = betTexts[0];
  if (bet.title == "O"){  // "O" signifies that no parley is allowed on the bet
    bet.title = betTexts[1];
    bet.parlayable = false;
    betTexts.shift();  // remove the first element (the "O")
  }

  const teamNames = bet.title.split(' at ', 2);
  const awayTeamName = teamNames[0];

  // remove the date and half tag
  let homeTeamName = teamNames[1].split(" ");
  homeTeamName.pop();
  homeTeamName.pop();
  homeTeamName.pop();
  homeTeamName = homeTeamName.join(" ");

  bet.awayTeam = {};
  bet.awayTeam.name = awayTeamName
  bet.awayTeam.spread = {};
  bet.awayTeam.spread.line = betTexts[10];
  bet.awayTeam.spread.vig = betTexts[11];

  bet.homeTeam = {};
  bet.homeTeam.name = homeTeamName;
  bet.homeTeam.spread = {};
  bet.homeTeam.spread.line = betTexts[19];
  bet.homeTeam.spread.vig = betTexts[20];

  bet.over = {};
  bet.over.line = betTexts[14];
  bet.over.vig = betTexts[15];

  bet.under = {};
  bet.under.line = betTexts[23];
  bet.under.vig = betTexts[24];

  return bet;
};

const scrapper = betParser => {
  return responseBody => {
    const stringBets = responseBodyCleaner(responseBody); 
    return _.map(stringBets, betParser);
  };
};

const fullGameScrapper = scrapper(fullGameBetStringToObject);
const halfGameScrapper = scrapper(halfGameBetStringToObject);

module.exports = {
  fullGameScrapper,
  halfGameScrapper
};
