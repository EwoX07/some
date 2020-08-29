exports.run = async (client, message, args) => {

  if (!message.member.voice.channel) return message.channel.send(`${client.emotes.error} | You must be in a voice channel!`)
        let string = args.join(" ")
        if (!string) return message.channel.send(`${client.emotes.error} | Please enter a song url or query to search.`)
        try {
            client.distube.playSkip(message, string)
        } catch (e) {
            message.channel.send(`${client.emotes.error} | Error: \`${e}\``)
        }
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["ps", "pskip"],
  permLevel: "User"
};

exports.help = {
  name: "playskip",
  category: "Music",
  description: "Add a new song, play and skip to it",
  usage: "playskip `<url/song>`"
};