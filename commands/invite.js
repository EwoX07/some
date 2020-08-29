exports.run = (client, message, args) => {
  
  const Discord = require('discord.js');  
  const embed = new Discord.MessageEmbed()
    
  .setColor("#8300ff")
  .setTitle('🔗 Invite Me!')
  .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot`)
  .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
  .setFooter(`${client.user.username} by DooM™ - © 2020`)
    
  message.channel.send(embed);
    
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["inv", "inviteme"],
  permLevel: "User"
};

exports.help = {
  name: "invite",
  category: "Utils",
  description: "My invite link",
  usage: "invite"
};