// Import the node modules
const Discord = require('discord.js');
const search = require('youtube-search');
const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');

// declare rank variables
let smash64leaguerankingsOne;
let smash64leaguerankingsTwo;
let smash64leaguerankings2017one;
let smash64leaguerankings2017two;

let ssbmrank2013one;
let ssbmrank2013two;
let ssbmrank2013three;
let ssbmrank2014one;
let ssbmrank2014two;
let ssbmrank2014three;
let ssbmrank2015one;
let ssbmrank2015two;
let ssbmrank2015three;
let ssbmrank2016one;
let ssbmrank2016two;
let ssbmrank2016three;
let ssbmrank2017one;
let ssbmrank2017two;
let ssbmrank2017three;

let ssbbrankOne;
let ssbbrankTwo;
let ssbbrankThree;
let ssbbrank1617;

let pmrankOne;
let pmrankTwo;
let pmrank17one;
let pmrank17two;

let pgr1one;
let pgr1two;
let pgr2one;
let pgr2two;
let pgr3one;
let pgr3two;
let pgr4one;
let pgr4two;

// Create an instance of a Discord client
const client = new Discord.Client();

// create options for youtube search
let opts = {
	key: 'youtube api key here',
	maxResults: 1
};

// The token of your bot - https://discordapp.com/developers/applications/me
const token = 'bot token here';

// create bot prefix
const prefix = 'ssb ';

// create cannot find string
const cannotFind = "I'm sorry, I can't find anything... <:turnipstitch:397873462330523648>";

// set a few messages to check for before checking for the ssb prefix
// on the version of the bot I have running, there are a lot more of these
const memeMessages = [
	"ocean man",
	"alex19 isn't so great"
];

// responses to those few messages
const memeResponses = [
	"Take me by the hand~\nLead me to the land~",
	"Alex19 isn't so great? Are you kidding me? When was the last time you saw a player with such an ability and movement with fox? Alex puts the game in another level, and we will be blessed if we ever see a player with his skill and passion for the game again. mang0 breaks records. Armada breaks records. Alex19 breaks the rules. You can keep your statistics. I prefer the magic."
];

// The ready event is vital, it means that your bot will only start reacting to information
// from Discord _after_ ready is emitted
client.on('ready', () => {
    loadRanks(); // load rank txt files
    client.user.setGame("Melee! | ssb help"); // set her game upon login
    console.log('Did I win?');
});

// create an event listener for messages
client.on('message', message => {
    
    // It's good practice to ignore other bots. This also makes your bot ignore itself
    // and not get into a spam loop (we call that "botception").
    if(message.author.bot) return;
    
    // See if any memes have been sent
	for (i = 0; i < memeMessages.length; i++)
	{
		// if any known memes have been sent, respond
		if(message.content.toLowerCase() == memeMessages[i]) return message.channel.send(memeResponses[i]);
	}
    
    // Otherwise ignore any message that does not start with the ssb prefix, 
    // which is set above
    if(message.content.indexOf(prefix) !== 0) return;
    
    // Here we separate our "command" name, and our "arguments" for the command. 
    // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
    // command = say
    // args = ["Is", "this", "the", "real", "life?"]
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    
    // display help text
    if(command === "help")
    {
        message.channel.send("Hello, I'm Peach!\nSuper Smash Bot is a work in progress!\nRight now, I can do a couple things!\n\nI can get highlights from lots of different sources! <:turnipyay:397873462049374219>\nFor GRSmash videos, type 'ssb gr [term]', for GRTr4sh videos, type 'ssb gr4 [term]', for Mr. Pickle videos, type 'ssb pickle [term]', for YEET Smash videos, type 'ssb yeet [term]', for Dragon Smash videos, type 'ssb drag [term]', and for VGBC Highlights videos, type 'ssb vgbc [term]'.\n\nType 'ssb turnip' to pull a Vegetable!\n\nType 'ssb meme' to see a list of what meme messages I will respond to!\n\nType 'ssb smasher [smashtag]' to get info on a top player!\n\nType 'ssb rank [game] [year]' for official player rankings!\nA couple notes about this feature:\nFor Smash 4, just type the number of PGR instead of the year.\nIf no year is typed, the latest rankings will be sent.\nAcceptable parameters will be shown if you just type 'ssb rank'.\n\nFeatures are still being added, so please be patient with me! Thank you!");
    }
    
    // if the command is 'vod' bot will return first result on youtube
    else if(command === "vod") 
    {
        if (args[0] == null) return message.channel.send("ssb vod [search term]");
        
        // join the search term back together
        let searchTerm = args.join(" ");
        
        // search
        search(searchTerm, opts, function(err, results) {
            if(err) return console.log(err);
            
            return message.channel.send(results[0].link + "\nIf this is not what you were looking for, please try to be a bit more specific! <:turniphappy:397873462103769088>");
        });
    }
    
    // exclusively search grsmash
    // gr, gr4, pickle, yeet, and drag are all very similar, barring channel IDs and help dialogues
    // gr is more heavily commented than the rest, but all the comments are applicable to other commands listed above
    else if(command === "gr")
    {
        // help dialouge
        if (args[0] == null) return message.channel.send("ssb gr [search term]");
        
        // add grsmash youtube channel id to youtube-search options
        opts.channelId = 'UCTVVDt-QGxBTOqPOQuK6Y-g';
        
        // join the search term back together
        let searchTerm = args.join(" ");
        
        // search
        search(searchTerm, opts, function(err, results) {
            if(err) return console.log(err); // print error in console
            
            if(results[0] != undefined) return message.channel.send(results[0].link); // return link if found
            else return message.channel.send(cannotFind); // if nothing is found, print cannotFind
        });
    }
    
    // exclusively search grtr4sh
    else if(command === "gr4")
    {
        if (args[0] == null) return message.channel.send("ssb gr4 [search term]");
        
        opts.channelId = 'UChPE_pVN58afOg4Dh4vznsA';
        
        // join the search term back together
        let searchTerm = args.join(" ");
        
        // search
        search(searchTerm, opts, function(err, results) {
            if(err) return console.log(err);
            
            if(results[0] != undefined) return message.channel.send(results[0].link);
            else return message.channel.send(cannotFind);
        });
    }
    
    // exclusively search mr. pickle
    else if(command === "pickle")
    {
        if (args[0] == null) return message.channel.send("ssb pickle [search term]");
        
        opts.channelId = 'UC3NLTbuhKqFb6eclIow4p3A';
        
        // join the search term back together
        let searchTerm = args.join(" ");
        
        // search
        search(searchTerm, opts, function(err, results) {
            if(err) return console.log(err);
            
            if(results[0] != undefined) return message.channel.send(results[0].link);
            else return message.channel.send(cannotFind);
        });
    }
    
    // exclusively search yeet smash
    else if(command === "yeet")
    {
        if (args[0] == null) return message.channel.send("ssb yeet [search term]");
        
        opts.channelId = 'UCVFWJkN7L45x8gZTMXu2UWw';
        
        // join the search term back together
        let searchTerm = args.join(" ");
        
        // search
        search(searchTerm, opts, function(err, results) {
            if(err) return console.log(err);
            
            if(results[0] != undefined) return message.channel.send(results[0].link);
            else return message.channel.send(cannotFind);
        });
    }
    
    // exclusively search dragon smash
    else if(command === "drag")
    {
        if (args[0] == null) return message.channel.send("ssb drag [search term]");
        
        opts.channelId = 'UCd5AJwFW4lU_zqIBvVYw0Jg';
        
        // join the search term back together
        let searchTerm = args.join(" ");
        
        // search
        search(searchTerm, opts, function(err, results) {
            if(err) return console.log(err);
            
            if(results[0] != undefined) return message.channel.send(results[0].link);
            else return message.channel.send(cannotFind);
        });
    }
	 
    // exclusively search vgbc highlights
    else if(command === "vgbc")
    {
        if (args[0] == null) return message.channel.send("ssb vgbc [search term]");
        
        opts.channelId = 'UCGOP2bXVg04Jvbu8tuiPoNg';
        
        // join the search term back together
        let searchTerm = args.join(" ");
        
        // search
        search(searchTerm, opts, function(err, results) {
            if(err) return console.log(err);
            
            if(results[0] != undefined) return message.channel.send(results[0].link);
            else return message.channel.send(cannotFind);
        });
    }
    
    // turnip pull simulator
    else if(command === "turnip")
    {
        // get a random number from 1 - 58 and set the default turnip
        let pull = Math.floor((Math.random() * 58) + 1);
        let turnip = "<:turniphappy:397873462103769088>! That's a 60.345% chance!";
        
        // set the correct turnip emoji for the right pulls
        if (1 <= pull && pull && pull <= 35) turnip = "<:turniphappy:397873462103769088>! That's a 60.345% chance!";
        else if (36 <= pull && pull <= 41) turnip = "<:turnipsrs:397873461839790081>! That's a 10.345% chance!";
        else if (42 <= pull && pull <= 46) turnip = "<:turnipdisappoint:397873461847916565>! That's a 8.621% chance!";
        else if (47 <= pull && pull <= 49) turnip = "<:turnipshock:397873461982396437>! That's a 5.172% chance!";
        else if (50 <= pull && pull <= 52) turnip = "<:turnipyay:397873462049374219>! That's a 5.172% chance!";
        else if (53 <= pull && pull <= 56) turnip = "<:turnipwink:397873461847916556>! That's a 6.897% chance!";
        else if (pull == 57) turnip = "<:turnipdot:397873462083059712>! That's a 1.724% chance!";
        else if (pull == 58) turnip = "<:turnipstitch:397873462330523648>! That's a 1.724% chance!";
        
        // return a message
        return message.channel.send("You pulled " + turnip);
    }
    
    // get info on a smasher from SSBWiki
    else if(command === "smasher")
    {
        // help dialogue
        if (args[0] == null) return message.channel.send("ssb smasher [smashtag]");
        
        // join the smasher's name
        let smasher = args.join("%20");
        
        // create the url
        let wikiURL = "https://www.ssbwiki.com/Smasher:" + smasher;
        
        // run request
        request(wikiURL, function (error, response, html)
        {
            // if a webpage is found
            if (!error && response.statusCode == 200)
            {
                // load html through cheerio
                const $ = cheerio.load(html);
                
                // find the first paragraph and store it
                let paragraph = $('p').first().text();
                
                // print the url and first paragraph of the page
                message.channel.send(paragraph);
                return message.channel.send("From: " + wikiURL);
            }
            
            // if there isn't a webpage to retrieve
             // this if's condition is to make sure the bot isn't reacting to itself offering help
            else return message.channel.send(cannotFind + "\nIf your Smasher has more than one capital letter in their tag, try properly capitalizing!");
        });
    }

    // get official player rankings from locally stored files
    else if(command === "rank")
    {
        // help dialogue
        if (args[0] == null) return message.channel.send("ssb rank [game] [year]\n\nGames:\n64, smash64, ssb\nmelee, ssbm\nbrawl, ssbb\nprojectm, pm\nsmash4, sm4sh\n\n64 League Rankings Years: 2016 - 2017\nSSBMRank Years: 2013 - 2017\nSSBBRank Years: 2014, 2016 - 2017\nPMRank Years: 2016 - 2017\nSmash 4 PGR Versions: 1 - 4");
        
        let game = args[0].toLowerCase();
        let year = args[1];
        
        if (args[0] != null)
        {
            if ((game == "64" || game == "smash64" || game == "ssb") && year == "2016")
            {
                message.channel.send("64 League Rankings (2016)");
                message.channel.send(smash64leaguerankingsOne);
                return message.channel.send(smash64leaguerankingsTwo);
            }
			
            else if ((game == "64" || game == "smash64" || game == "ssb")) // checking for year at the moment is unnecessary, as this is the latest yearly ranking
            {
                message.channel.send("64 League Rankings (2017)");
                message.channel.send(smash64leaguerankings2017one);
                return message.channel.send(smash64leaguerankings2017two);
            }
            
            else if ((game == "melee" || game == "ssbm") && year == "2013")
            {
                message.channel.send("2013 SSBMRank");
                message.channel.send(ssbmrank2013one);
                message.channel.send(ssbmrank2013two);
                return message.channel.send(ssbmrank2013three);
            }

            else if ((game == "melee" || game == "ssbm") && year == "2014")
            {
                message.channel.send("2014 SSBMRank");
                message.channel.send(ssbmrank2014one);
                message.channel.send(ssbmrank2014two);
                return message.channel.send(ssbmrank2014three);
            }
            
            else if ((game == "melee" || game == "ssbm") && year == "2015")
            {
                message.channel.send("2015 SSBMRank");
                message.channel.send(ssbmrank2015one);
                message.channel.send(ssbmrank2015two);
                return message.channel.send(ssbmrank2015three);
            }
			
			else if ((game == "melee" || game == "ssbm") && year == "2016")
            {
                message.channel.send("2016 SSBMRank");
                message.channel.send(ssbmrank2016one);
                message.channel.send(ssbmrank2016two);
                return message.channel.send(ssbmrank2016three);
            }
            
            else if ((game == "melee" || game == "ssbm")) // checking for year at the moment is unnecessary, as this is the latest yearly ranking
            {
                message.channel.send("2017 SSBMRank");
                message.channel.send(ssbmrank2017one);
                message.channel.send(ssbmrank2017two);
                return message.channel.send(ssbmrank2017three);
            }
            
            else if ((game == "brawl" || game == "ssbb") && year == "2014")
            {
                message.channel.send("2014 SSBBRank");
                message.channel.send(ssbbrankOne);
                message.channel.send(ssbbrankTwo);
                return message.channel.send(ssbbrankThree);
            }
			
            else if ((game == "brawl" || game == "ssbb")) // checking for year at the moment is unnecessary, as this is the latest ranking
            {
                message.channel.send("2016 - 2017 SSBBRank");
                return message.channel.send(ssbbrank1617);
            }
            
            else if ((game == "projectm" || game == "pm") && year == "2016")
            {
                message.channel.send("2016 PMRank");
                message.channel.send(pmrankOne);
                return message.channel.send(pmrankTwo);
            }
			
            else if ((game == "projectm" || game == "pm")) // checking for year at the moment is unnecessary, as this is the latest yearly ranking
            {
                return message.channel.send("2017 PMRank");
                //message.channel.send(pmrank17one);
                //return message.channel.send(pmrank17two);
            }
            
            else if ((game == "smash4" || game == "sm4sh") && year == "1")
            {
                message.channel.send("Panda Global Ranking v1 (January 2015 - May 2016)");
                message.channel.send(pgr1one);
                return message.channel.send(pgr1two);
            }
            
            else if ((game == "smash4" || game == "sm4sh") && year == "2")
            {
                message.channel.send("Panda Global Ranking v2 (May - December 2016)");
                message.channel.send(pgr2one);
                return message.channel.send(pgr2two);
            }
            
            else if ((game == "smash4" || game == "sm4sh") && year == "3")
            {
                message.channel.send("Panda Global Ranking v3 (January - June 2017)");
                message.channel.send(pgr3one);
                return message.channel.send(pgr3two);
            }
            
            else if ((game == "smash4" || game == "sm4sh")) // checking for PGR at the moment is unnecessary, as this is the latest ranking
            {
                message.channel.send("Panda Global Ranking v4 (July - December 2017)");
                message.channel.send(pgr4one);
                return message.channel.send(pgr4two);
            }
            
            else
            {
                return message.channel.send(cannotFind + "\nAre you sure you put in a valid game or year/version?\nTry typing 'ssb rank' for help with this command!");
            }
        }
    }
	
	// show all meme messages
	else if (command === "meme")
	{
		// create a variable to store all memes
		let allMemes = "";

		// tell the users what this command is used for
		message.channel.send("If you say any of these things, I'll respond to you! (Case insensitive, but punctuation is important!)");
		
		// loop through memeMessages
		for (i = 0; i < memeMessages.length; i++)
		{
			// add them to the allMemes variable
			allMemes += memeMessages[i] + "\n";
		}
		
		// print it out!
		return message.channel.send(allMemes);
	}
});

// function to load the ranks
function loadRanks()
{
    // 2016 64 league rankings
    smash64leaguerankingsOne = fs.readFileSync("ranks/smash64leaguerankingsOne.txt", {"encoding": "utf-8"});
    smash64leaguerankingsTwo = fs.readFileSync("ranks/smash64leaguerankingsTwo.txt", {"encoding": "utf-8"});
	
	// 2017 64 league rankings
    smash64leaguerankings2017one = fs.readFileSync("ranks/smash64leaguerankings2017one.txt", {"encoding": "utf-8"});
    smash64leaguerankings2017two = fs.readFileSync("ranks/smash64leaguerankings2017two.txt", {"encoding": "utf-8"});
    
    // 2013 ssbm rank
    ssbmrank2013one = fs.readFileSync("ranks/ssbmrank2013one.txt", {"encoding": "utf-8"});
    ssbmrank2013two = fs.readFileSync("ranks/ssbmrank2013two.txt", {"encoding": "utf-8"});
    ssbmrank2013three = fs.readFileSync("ranks/ssbmrank2013three.txt", {"encoding": "utf-8"});
    
    // 2014 ssbm rank
    ssbmrank2014one = fs.readFileSync("ranks/ssbmrank2014one.txt", {"encoding": "utf-8"});
    ssbmrank2014two = fs.readFileSync("ranks/ssbmrank2014two.txt", {"encoding": "utf-8"});
    ssbmrank2014three = fs.readFileSync("ranks/ssbmrank2014three.txt", {"encoding": "utf-8"});

    // 2015 ssbm rank
    ssbmrank2015one = fs.readFileSync("ranks/ssbmrank2015one.txt", {"encoding": "utf-8"});
    ssbmrank2015two = fs.readFileSync("ranks/ssbmrank2015two.txt", {"encoding": "utf-8"});
    ssbmrank2015three = fs.readFileSync("ranks/ssbmrank2015three.txt", {"encoding": "utf-8"});
    
    // 2016 ssbm rank
    ssbmrank2016one = fs.readFileSync("ranks/ssbmrank2016one.txt", {"encoding": "utf-8"});
    ssbmrank2016two = fs.readFileSync("ranks/ssbmrank2016two.txt", {"encoding": "utf-8"});
    ssbmrank2016three = fs.readFileSync("ranks/ssbmrank2016three.txt", {"encoding": "utf-8"});
	
    // 2017 ssbm rank
    ssbmrank2017one = fs.readFileSync("ranks/ssbmrank2017one.txt", {"encoding": "utf-8"});
    ssbmrank2017two = fs.readFileSync("ranks/ssbmrank2017two.txt", {"encoding": "utf-8"});
    ssbmrank2017three = fs.readFileSync("ranks/ssbmrank2017three.txt", {"encoding": "utf-8"});

    // 2014 ssbbrank
    ssbbrankOne = fs.readFileSync("ranks/ssbbrankOne.txt", {"encoding": "utf-8"});
    ssbbrankTwo = fs.readFileSync("ranks/ssbbrankTwo.txt", {"encoding": "utf-8"});
    ssbbrankThree = fs.readFileSync("ranks/ssbbrankThree.txt", {"encoding": "utf-8"});
	
	// 2016 - 2017 ssbbrank
    ssbbrank1617 = fs.readFileSync("ranks/ssbbrank1617.txt", {"encoding": "utf-8"});
    
    // 2016 pmrank
    pmrankOne = fs.readFileSync("ranks/pmrankOne.txt", {"encoding": "utf-8"});
    pmrankTwo = fs.readFileSync("ranks/pmrankTwo.txt", {"encoding": "utf-8"});
	
    // 2017 pmrank
    //pmrank17one = fs.readFileSync("ranks/pmrank17one.txt", {"encoding": "utf-8"});
    //pmrank17rwo = fs.readFileSync("ranks/pmrank17two.txt", {"encoding": "utf-8"});
    
    // pgr v1
    pgr1one = fs.readFileSync("ranks/pgr1one.txt", {"encoding": "utf-8"});
    pgr1two = fs.readFileSync("ranks/pgr1two.txt", {"encoding": "utf-8"});
    
    // pgr v2
    pgr2one = fs.readFileSync("ranks/pgr2one.txt", {"encoding": "utf-8"});
    pgr2two = fs.readFileSync("ranks/pgr2two.txt", {"encoding": "utf-8"});
    
    // pgr v3
    pgr3one = fs.readFileSync("ranks/pgr3one.txt", {"encoding": "utf-8"});
    pgr3two = fs.readFileSync("ranks/pgr3two.txt", {"encoding": "utf-8"});
	 
    // pgr v4
    pgr4one = fs.readFileSync("ranks/pgr4one.txt", {"encoding": "utf-8"});
    pgr4two = fs.readFileSync("ranks/pgr4two.txt", {"encoding": "utf-8"});
}

// log the bot in
client.login(token);
