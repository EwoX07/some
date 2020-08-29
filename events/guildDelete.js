const exConfig = require("../config.json");
module.exports = (client, guild, message) => {
  const Discord = require("discord.js");

  const gdembed = new Discord.MessageEmbed()
    .setColor("#ff0000")
    .setAuthor("I've been removed from:", "https://cdn.discordapp.com/emojis/744384493376503869.gif")
    .setDescription(
      `**Guild Name:** ${guild.name}\n**Guild ID:** (\`${guild.id}\`)`
    )
    .setFooter(`Now connected to ${client.guilds.cache.size} guilds`)
    .setTimestamp();

  client.channels.cache.get(exConfig.botLogs).send(gdembed);
};