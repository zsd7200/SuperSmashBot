# Super Smash Bot
![License](https://img.shields.io/badge/License-GPLv3-blue.svg)

##### This is my first attempt at writing a bot for anything, as well as my first time using Discord.js. Creative criticism is welcomed, as I would like to get better with this kind of stuff.

A Discord bot for competitive Super Smash Bros. content and for fun.

Programmed in JavaScript using [Discord.js 11.2.1](https://discord.js.org).

Super Smash Bot, also known as Peach, can pull top player information from [SSBWiki](https://www.ssbwiki.com/), can get official yearly top player rankings for each Smash Bros. game (locally stored and manually formatted), can perform a [Vegetable pull](https://www.ssbwiki.com/Vegetable) simulation, and can get highlights from different Smash-related YouTube channels. She can also have an array of messages that she will listen for and respond to accordingly.

#### Commands:
* ssb help
  * Provides Peach's help text, which is basically what is listed below.
* ssb gr [term] , ssb gr4 [term], ssb pickle [term], ssb yeet [term], ssb drag [term], ssb vgbc [term], ssb vod [term]
  * These all are commands to search YouTube using [Youtube-Search 1.0.10](https://www.npmjs.com/package/youtube-search) in conjunction with the YouTube v3 API.
  * 'gr' searches [GRSmash](https://www.youtube.com/channel/UCTVVDt-QGxBTOqPOQuK6Y-g), 'gr4' searches [GRTr4sh](https://www.youtube.com/channel/UChPE_pVN58afOg4Dh4vznsA), 'pickle' searches [Mr. Pickle](https://www.youtube.com/user/MrPickleGaming1), 'yeet' searches [YEET Smash](https://www.youtube.com/channel/UCVFWJkN7L45x8gZTMXu2UWw), 'drag' searches [Dragon Smash](https://www.youtube.com/user/RedAxel17), 'vgbc' searches [VGBC Highlights](https://www.youtube.com/channel/UCGOP2bXVg04Jvbu8tuiPoNg) and 'vod' searches all of YouTube and returns the first result. The 'vod' parameter for this command should find the correct match you are searching for, as long as you are specific enough with your search term.
* ssb turnip
  * Uses a random number generator with custom emotes to pull a [Vegetable](https://www.ssbwiki.com/Vegetable). Probabilities are taken from [this](https://www.ssbwiki.com/images/0/04/PeachVegetableCompleteOddsTableSSBB.jpg) odds table from Super Smash Bros. Brawl. Mr. Saturn, Bob-Ombs, and Beam Swords are not yet available to pull.
* ssb meme
  * Displays a list of messages that the bot will react to if listening for memes is turned on.
* ssb smasher [smashtag]
  * Uses a combination of [Request](https://github.com/request/request) and [Cheerio](https://cheerio.js.org/) to grab the first paragraph of a Smasher's biography from [SSBWiki](https://www.ssbwiki.com/).
* ssb rank [game] [year]
  * Uses Node.js's built-in File System class to read .txt files with official yearly player rankings.
  * These rankings are taken from [SSBWiki](https://www.ssbwiki.com/), then manually formatted to look nice with a bit less information.
  * For any game where the year requested is unavailable, the latest available rankings will be shown.
  * Running this command without parameters will show acceptable parameters for each game.
  
  #### References
  * [Discord.js Documentation](https://discord.js.org/#/docs/main/stable/general/welcome)
  * [The Perfect Lil' Bot](https://gist.github.com/eslachance/3349734a98d30011bb202f47342601d3) by eslachance
  * [How To Use node.js, request and cheerio to Set Up Simple Web-Scraping](https://www.digitalocean.com/community/tutorials/how-to-use-node-js-request-and-cheerio-to-set-up-simple-web-scraping) by DigitalOcean
  * [Getting the bot to run 24/7 using Amazon EC2](http://shiffman.net/a2z/bot-ec2/) by Daniel Shiffman
