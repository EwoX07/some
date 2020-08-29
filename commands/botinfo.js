exports.run = async (client, message, args) => {
  
  const { MessageEmbed, version: djsversion } = require('discord.js');
  const moment = require("moment");
  const ms = require('ms');
  const os = require('os');
  const core = os.cpus()[0];
  
    const embed = new MessageEmbed()
    
        .setAuthor("BOT INFO", "https://tinyurl.com/y4xs3cje")
        .setColor("#8300ff")
        .addField("**❯ General:**", [
          `**● Username:** ${client.user.tag}`,
          `**● ID:** ${client.user.id}`,
          `**● Commands:** ${client.commands.size}`,
          `**● Servers:** ${client.guilds.cache.size.toLocaleString()} `,
          `**● Users:** ${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}`,
          `**● Channels:** ${client.channels.cache.size.toLocaleString()}`,
          `**● Node.js:** ${process.version}`,
          `**● Discord.js:** v${djsversion}`,
          `**● Creation Date:** ${moment(client.user.createdAt).format('llll')} \`(${moment(client.user.createdAt).fromNow()})\``,
          `\u200b`
          ])
    
        .addField("**❯ System**", [
		  		`**● Platform:** ${process.platform}`,
	  			`**● Uptime:** ${ms(os.uptime() * 1000, { long: true })}`,
	  			`**● CPU:**`,
	  			`> **Cores:** ${os.cpus().length}`,
  				`> **Model:** ${core.model}`,
  				`> **Speed:** ${core.speed}MHz`,
  				`**● Memory:**`,
  				`> **Heap Total:** ${(process.memoryUsage().heapTotal / 1024 / 1024).toFixed(2)} MB`,
  				`> **Heap Used:** ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`,
          `\u200b`
          ])
    
        .addField("**❯ Useful links**", [
          `● [Invite Me!](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot)`,
          `● [Support Server](https://discord.gg/gangsebelah)`,
          `\u200b`
          ])
    
        .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
        .setFooter(`${client.user.username} by DooM™ - © 2020`, `${client.user.displayAvatarURL({ dynamic: true })}`)
        .setTimestamp()
    
    message.channel.send(embed)
    
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["info"],
  permLevel: "User"
};

exports.help = {
  name: "botinfo",
  category: "Miscelaneous",
  description: "Display this bot info",
  usage: "botinfo"
};