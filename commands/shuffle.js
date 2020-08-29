exports.run = async (client, message, args) => {

  if (!message.member.voice.channel) return message.channel.send(`${client.emotes.error} | You must be in a voice channel!`)
    if (!client.distube.isPlaying(message)) return message.channel.send(`${client.emotes.error} | There is nothing playing!`)
    client.distube.shuffle(message)
    message.channel.send(`${client.emotes.success} | Queue shuffled`);
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "shuffle",
  category: "Music",
  description: "Shuffle the player queue",
  usage: "shuffle"
};