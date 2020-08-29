exports.run = async (client, message, args) => {
    
    const m = await message.channel.send("Ping?");
    m.edit(`🏓 Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`);

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["pong"],
  permLevel: "User"
};

exports.help = {
  name: "ping",
  category: "Utils",
  description: "Its like... Pings. Then Pongs. And it's not Ping Pong.",
  usage: "ping"
};