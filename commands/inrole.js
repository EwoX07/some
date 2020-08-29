exports.run = async (client, message, args) => {
  
const Discord = require('discord.js');
  
let color = message.guild.me.displayHexColor;
if (color === '#000000') color = '#8300ff';

if (!args.slice().length >= 1) return message.channel.send("Please provide the <role name | role id | role mention>");
    try {
      const role = message.guild.roles.cache.find((r) => r.name.toLowerCase() === args.slice().join(' ').toLowerCase()) || 
            message.guild.roles.cache.find((r) => r.id === args.slice().join(' ')) || message.mentions.roles.first();
      if (!role) return message.channel.send("I couldn't find that role!").then(
        msg => {msg.delete({timeout: 10000})
               });
      const inRole = role.members.array();
      const array = [];
      inRole.forEach((member) => {
        array.push(member.user.tag);
      });
      
const generateEmbed = start => {
  const current = array.slice(start, start + 10)

  const embed = new Discord.MessageEmbed()
    .setColor(color)
    .setAuthor(`Showing members in ${role.name} role ${start + 1}-${start + current.length} out of ${array.length}`,
               "https://tinyurl.com/y4xs3cje")
    .setFooter(`Requested by: ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
    .setTimestamp()
  current.forEach(member => embed.setDescription(current.join('\n')))
  return embed
}

const author = message.author

message.channel.send(generateEmbed(0)).then(message => {
  
  if (array.length <= 10) return
  
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
      
      if (currentIndex + 10 < inRole.length) message.react('➡️')
    })
  })
})
    
    } catch(e) {
      return message.reply(`Something went wrong... ${e}`);
    };
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["members"],
  permLevel: "User"
};

exports.help = {
  name: "inrole",
  category: "Miscelaneous",
  description: "Displays all members within a role",
  usage: "inrole `<role mention/role id/role name>`"
};