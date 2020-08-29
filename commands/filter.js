exports.run = async (client, message, args) => {
  
  if (!message.member.voice.channel) return message.channel.send(`${client.emotes.error} | You must be in a voice channel!`)
  if (!client.distube.isPlaying(message)) return message.channel.send(`${client.emotes.error} | There is nothing playing!`)
    if ([`3d`, `bassboost`, `echo`, `flanger`, `gate`, 
         `haas`, `karaoke`, `nightcore`, `reverse`, `vaporwave`].includes(args[0])) {
    let filter = client.distube.setFilter(message, args[0]);
    message.channel.send("Current queue filter: " + (filter || "Off"));
    }
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["setfilter"],
  permLevel: "User"
};

exports.help = {
  name: "filter",
  category: "Music",
  description: "Set the audio filter",
  usage: "filter `<3d/bassboost/echo/flanger/gate/haas/karaoke/nightcore/reverse/vaporwave>`"
};