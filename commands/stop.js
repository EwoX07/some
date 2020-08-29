exports.run = async (client, message, args) => {

  if (!message.member.voice.channel) return message.channel.send(`${client.emotes.error} | You must be in a voice channel!`)
    if (!client.distube.isPlaying(message)) return message.channel.send(`${client.emotes.error} | There is nothing playing!`)
    client.distube.stop(message);
    message.channel.send(`${client.emotes.success} | Stopped!`)
  }

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["dc", "leave", "disconnect"],
  permLevel: "User"
};

exports.help = {
  name: "stop",
  category: "Music",
  description: "Stop the music player and disconnect",
  usage: "stop"
};