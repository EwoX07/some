exports.run = async (client, message, args) => {

  if (!message.member.voice.channel) return message.channel.send(`${client.emotes.error} | You must be in a voice channel!`)
  if (!client.distube.isPlaying(message)) return message.channel.send(`${client.emotes.error} | There is nothing playing!`)
    let mode = client.distube.toggleAutoplay(message);
    message.channel.send("Set autoplay mode to `" + (mode ? "On" : "Off") + "`");
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["ap", "auto"],
  permLevel: "User"
};

exports.help = {
  name: "autoplay",
  category: "Music",
  description: "Toggle the autoplay mode",
  usage: "autoplay"
};