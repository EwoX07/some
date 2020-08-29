exports.run = async (client, message, args) => {
  
  if (!client.distube.isPlaying(message)) return message.channel.send(`${client.emotes.error} | There is nothing playing!`)
  if (!args[0]) return message.channel.send(`${client.emotes.error} | You must specify the song number in queue!`)
    client.distube.jump(message, parseInt(args[0]))
            .catch(err => message.channel.send("Invalid song number."));
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["jump"],
  permLevel: "User"
};

exports.help = {
  name: "skipto",
  category: "Music",
  description: "Skip to the selected song in queue",
  usage: "skipto `<number>`"
};