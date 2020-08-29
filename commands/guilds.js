exports.run = async (client, message, args) => {
  
const Discord = require('discord.js');
  
let color = message.guild.me.displayHexColor;
if (color = '#000000') color = '#8300ff';
    
if (message.author.id !== client.config.ownerID) return;
        
const guilds = client.guilds.cache.array()

const generateEmbed = start => {
  const current = guilds.slice(start, start + 10)

  const embed = new Discord.MessageEmbed()
    .setColor(color)
    .setAuthor(`Showing guilds ${start + 1}-${start + current.length} out of ${guilds.length}`, "https://tinyurl.com/y4xs3cje")
    .setFooter(`Requested by: ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
    .setTimestamp()
  current.forEach(g => embed.addField(g.name, `**ID:** ${g.id}\n**Owner:** ${g.owner.user.tag}`, true))
  return embed
}

const author = message.author

message.channel.send(generateEmbed(0)).then(message => {
  
  if (guilds.length <= 10) return
  
  message.react('➡️')
  const collector = message.createReactionCollector(
    
    (reaction, user) => ['⬅️', '➡️'].includes(reaction.emoji.name) && user.id === author.id,
    
    {time: 60000}
  )

  let currentIndex = 0
  collector.on('collect', reaction => {
    
    message.reactions.removeAll().then(async () => {
      
      reaction.emoji.name === '⬅️' ? currentIndex -= 10 : currentIndex += 10
      
      message.edit(generateEmbed(currentIndex))
      
      if (currentIndex !== 0) await message.react('⬅️')
      
      if (currentIndex + 10 < guilds.length) message.react('➡️')
    })
  })
})
  
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "Bot Owner"
};

exports.help = {
  name: "guilds",
  category: "Bot Owner",
  description: "Displays all the guilds this bot in",
  usage: "guilds"
};