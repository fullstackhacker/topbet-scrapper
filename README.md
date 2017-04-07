# Topbet

> Topbet is licensed by the government of Curacao

Topbet is a sports-gambling site that generally follows Vegas lines. Occasionally, there will be a divergence, but is generally the same.

This node module helps pull gambling lines, live from their site via scraping. 
## Installation
```
$ npm install --save topbet
```

### How To

Using the npm module is relatively straight forward. Still operates on callbacks, future implementations should return promises since that's all the hype now (#v2).

```
const topbet = require('topbet');

topbet.nba.getFullGameLines((err, bets) => {
  /**
    something w/ bet
  */
});

```


## Currently Supported Line Fetching:
 * NBA
   - Full Game `topbet.nba.getFullGameLines(cb);`
   - 1st Half (when available)   `topbet.nba.getFirstHalfLines(cb);`
   - 2nd Half (when available)   `topbet.nba.getSecondHalfLines(cb);`

### Future Plans

 * NFL - soon as the season starts up again
 * NBA quarterly lines






