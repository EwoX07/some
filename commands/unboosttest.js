exports.run = (client, message, member) => {

  client.emit('guildMemberUnboost', message.member);
  
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["ubt"],
  permLevel: "Administrator"
};

exports.help = {
  name: "unboosttest",
  category: "Admins",
  description: "Unboost Server message test",
  usage: "unboosttest"
};