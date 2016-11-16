const Discord = require('discord.js');
const bot = new Discord.Client();

const config = require("./config.json");

bot.on('ready', () => {
  console.log('Started!');
});

bot.on("guildMemberAdd", member => {
  let guild = member.guild;
  guild.channels.get('216297659089027073').sendMessage(`Attention ${member.user} joined this server.`);
});

bot.on("guildCreate", guild => {
  console.log(`New guild added : ${guild.name}, owned by ${guild.owner.user.username}`);
});

bot.on("presenceUpdate", (oldMember, newMember) => {
  let guild = newMember.guild;
  let playRole = guild.roles.find("name", "Playing ROBLOX");
  if(!playRole) return;

  if(newMember.user.presence.game && newMember.user.presence.game.name === "ROBLOX") {
    newMember.addRole(playRole);
  } else if(!newMember.user.presence.game && newMember.roles.has(playRole.id)) {
    newMember.removeRole(playRole);
  }
});

bot.on('ready', () => {
    bot.user.setGame("Say $help for commands");
});

const prefix = "$"

bot.on("message", message => {
    if (message.content.startsWith(prefix + "prune")) {
        let messagecount = parseInt(params[0]);
        message.channel.fetchMessages({limit: messagecount})
            .then(messages => message.channel.bulkDelete(messages));
    }
});

bot.on('message', message => {
  if(message.author.bot) return;
  if(!message.content.startsWith(prefix)) return;

  let command = message.content.split(" ")[0];
  command = command.slice(config.prefix.length);

  let args = message.content.split(" ").slice(1);

  if (command === "add") {
	  let numArray = args.map(n=> parseInt(n));
	  let total = numArray.reduce( (p, c) => p+c);

	  message.channel.sendMessage(total);
  }

  if (command === "say") {
	  message.channel.sendMessage(args.join(" "));
  }

  if (command === "status") {
	   message.channel.sendMessage("Working");
  }

});

bot.login("MjQ3MTEyNjY5ODc2ODQ2NTky.CwkdIQ.GPod5-oSBWXFeizPn1jx7PR3nBc");
