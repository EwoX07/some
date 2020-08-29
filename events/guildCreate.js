const exConfig = require("../config.json");
module.exports = (client, guild, message) => {
  const Discord = require("discord.js");

  const gcembed = new Discord.MessageEmbed()
    .setColor("#00ff00")
    .setAuthor("I've been added to:", "https://cdn.discordapp.com/emojis/744384533931098184.gif")
    .setDescription(
      `**Guild Name:** ${guild.name}\n**Guild ID:** (\`${guild.id}\`)\nThis guild has \`${guild.memberCount}\` members!`
    )
    .setFooter(`Now connected to ${client.guilds.cache.size} guilds`)
    .setTimestamp();

  client.channels.cache.get(exConfig.botLogs).send(gcembed);
};