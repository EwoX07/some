exports.run = async (client, message, args) => {
  
  if (message.deletable) message.delete();
  
  const limit = args[0];
  
  if (!message.member.voice.channel) return message.reply("You're not in voice channel.")
  .then(m => {m.delete({timeout: 5000})
             });
  if (isNaN(args[0]) || !args[0]) return message.reply("Please provide a valid number to limit your voice channel")
  .then(m => {m.delete({timeout: 5000})
             });
  message.member.voice.channel.setUserLimit(limit);
  message.reply("Done!")
    .then(m => {m.delete({timeout: 5000})
               });
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "vclimit",
  category: "Utils",
  description: "Create a main temp voice channel",
  usage: "vclimit <number>"
};