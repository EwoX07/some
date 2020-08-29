exports.run = async (client, message, args) => {
  
  const Discord = require('discord.js');
  
  const status = {'online': '<:online:741196747748933682>', 'idle': '<:idle:741197218861678644>', 
                  'dnd': '<:dnd:741196524238667846>', 'offline': '<:offline:741197268123648020>'};
  try {
  let member = message.mentions.members.first() || await message.guild.members.fetch({user: args.slice().join(' '), force: true});
  if (!args.length) member = message.member;
  
  let color = member.displayHexColor;
  if (color === '#000000') color = '#8300ff';
  
    const embed = new Discord.MessageEmbed()
    .setColor(color)
    .addField(`${status[member.presence.status]} ${member.user.tag}`, `\`ID: ${member.user.id}\``, true)
    .setImage(member.user.displayAvatarURL({ format: 'png', dynamic: true, size: 2048 }))
    .setFooter(`Requested by: ${message.author.tag}`, `${message.author.displayAvatarURL({ dynamic: true })}`)
    .setTimestamp();
    message.channel.send(embed);
  } catch(e) {
    return message.reply(`Something went wrong... ${e}`);
  };
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["av"],
  permLevel: "User"
};

exports.help = {
  name: "avatar",
  category: "Miscelaneous",
  description: "Show your or other members avatar",
  usage: "avatar `[user mention/user id]`"
};