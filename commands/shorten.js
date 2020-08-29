exports.run = async (client, message, args) => {
  
  const tiny = require('tinyurl');
 
  tiny.shorten(args[0], function(res) {
    if (!args[0]) return message.reply('Please provide a valid url!')
    .then(msg => {msg.delete({timeout: 5000})
                 });
    if (res === 'Error') return message.reply('Invalid url!')
    .then(msg => {msg.delete({timeout: 5000})
                 });
    message.channel.send(`**Shortened URL:** ${res}`);
  });
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["shrt", "short"],
  permLevel: "User"
};

exports.help = {
  name: "shorten",
  category: "Utils",
  description: "Shorten the given link url",
  usage: "shorten `<url>`"
};