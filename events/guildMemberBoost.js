module.exports = (client, member) => {
  const Discord = require("discord.js");

  const settings = client.getSettings(member.guild);

  if (settings.boostEnabled !== "true") return;

  let channel = member.guild.channels.cache.find(
    c => c.name === settings.boostChannel
  );
  
  if (!channel) {
    return;
  } else {
    const bembed = new Discord.MessageEmbed()
      .setColor("#f47fff")
      .setAuthor(
        `${member.displayName} just boosted the server!`,
        "https://cdn.discordapp.com/emojis/739595657123201125.gif"
      )
      .setThumbnail(`${member.user.displayAvatarURL({ dynamic: true })}`)
      .setDescription(
        `Thank you ${member.user} for boosting the server.\nBecause of you, we are now have __**${member.guild.premiumSubscriptionCount}**__ boost in total.\nPlease DM our Admin or Moderator for a __**Custom Role!**__`
      )
      .setFooter(
        `Current Server Level: ${member.guild.premiumTier}`,
        "https://cdn.discordapp.com/emojis/739595657123201125.gif"
      )
      .setTimestamp();
    channel.send(bembed).catch(console.error);
  }
};