exports.run = async (client, message, args) => {
  
  let queue = client.distube.getQueue(message);
    if (!queue) return message.channel.send(`${client.emotes.error} | There is nothing playing!`)
    let q = queue.songs.map((song, i) => {
      return `${i === 0 ? "Playing:" : `${i}.`} ${song.name} - \`${song.formattedDuration}\``
    }).join("\n");
    message.channel.send(`${client.emotes.queue} | **Server Queue**\n${q}`);

}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["q"],
  permLevel: "User"
};

exports.help = {
  name: "queue",
  category: "Music",
  description: "This guild music queue",
  usage: "queue"
};