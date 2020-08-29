exports.run = (client, message, member) => {

  client.emit('guildMemberBoost', message.member);
  
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["bt"],
  permLevel: "Administrator"
};

exports.help = {
  name: "boosttest",
  category: "Admins",
  description: "Boost Server message test",
  usage: "boosttest"
};