exports.run = (client, message, args) => {
  
  client.emit('guildMemberAdd', message.member);

};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["jmsg"],
  permLevel: "Administrator"
};

exports.help = {
  name: "joinmsgtest",
  category: "Admins",
  description: "guildMemberAdd event test",
  usage: "joinmsgtest"
};