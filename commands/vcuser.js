exports.run = async (client, message, args) => {
  
    const Discord = require('discord.js');
  
    let color = message.guild.me.displayHexColor;
    if (color === '#000000') color = '#8300ff'
    
    const voiceChannels = message.guild.channels.cache.filter(c => c.type === 'voice');
    let count = 0;
  
    for (const [id, voiceChannel] of voiceChannels) count += voiceChannel.members.size;

    const vcmbd = new Discord.MessageEmbed()
    .setColor(color)
    .addField(`Total member in voice channels:`, `<a:giphy_3:744676992141623399> ${count}`)
    .setTimestamp()
    message.channel.send(vcmbd);
      
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "vcuser",
  category: "Miscelaneous",
  description: "Displays all members(incl bots) in every voice channels",
  usage: "vcuser"
};