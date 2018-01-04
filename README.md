# Super Smash Bot
![License](https://img.shields.io/badge/License-GPLv3-blue.svg)

##### The actual .js file for the bot will be posted as soon as the rankings are fully implemented.

A Discord bot for competitive Super Smash Bros. content and for fun.

Programmed in JavaScript using [Discord.js 11.2.1](https://discord.js.org).

Super Smash Bot, also known as Peach, can pull top player information from [SSBWiki](https://www.ssbwiki.com/), can get official yearly top player rankings for each Smash Bros. game (locally stored and manually formatted), can perform a [Vegetable pull](https://www.ssbwiki.com/Vegetable) simulation, and can get highlights from different Smash-related YouTube channels. She can also have an array of messages that she will listen for and respond to accordingly.

#### Commands:
* ssb help
  * Provides Peach's help text, which is basically what is listed below.
* ssb gr [term] , ssb gr4 [term], ssb pickle [term], ssb yeet [term], ssb drag [term], ssb vod [term]
  * These all are commands to search YouTube using [Youtube-Search 1.0.10](https://www.npmjs.com/package/youtube-search) in conjunction with the YouTube v3 API.
  * 'gr' searches [GRSmash](https://www.youtube.com/channel/UCTVVDt-QGxBTOqPOQuK6Y-g), 'gr4' searches [GRTr4sh](https://www.youtube.com/channel/UChPE_pVN58afOg4Dh4vznsA), 'pickle' searches [Mr. Pickle](https://www.youtube.com/user/MrPickleGaming1), 'yeet' searches [YEET Smash](https://www.youtube.com/channel/UCVFWJkN7L45x8gZTMXu2UWw), 'drag' searches [Dragon Smash](https://www.youtube.com/user/RedAxel17), and 'vod' searches all of YouTube and returns the first result. The 'vod' parameter for this command should find the correct match you are searching for, as long as you are specific enough with your search term.https://www.youtube.com/user/MrPickleGaming1
* ssb turnip
  * Uses a random number generator with custom emotes to pull a [Vegetable](https://www.ssbwiki.com/Vegetable). Probabilities are taken from [this](https://www.ssbwiki.com/images/0/04/PeachVegetableCompleteOddsTableSSBB.jpg) odds table from Super Smash Bros. Brawl. Mr. Saturn, Bob-Ombs, and Beam Swords are not yet available to pull.
* ssb smasher [smashtag]
  * Uses a combination of [Request](https://github.com/request/request) and [Cheerio](https://cheerio.js.org/) to grab the first paragraph of a Smasher's biography from [SSBWiki](https://www.ssbwiki.com/).
* ssb rank [game] [year]
  * Uses Node.js's built-in File System class to read .txt files with official yearly player rankings.
  * These rankings are taken from [SSBWiki](https://www.ssbwiki.com/), then manually formatted to look nice with a bit less information.
  * For any game where the year requested is unavailable, the latest available rankings will be shown.
  * Running this command without parameters will show acceptable parameters for each game.
