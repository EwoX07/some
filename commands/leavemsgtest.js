exports.run = (client, message, args) => {

  client.emit('guildMemberRemove', message.member);
  
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["lmsg"],
  permLevel: "Administrator"
};

exports.help = {
  name: "leavemsgtest",
  category: "Admins",
  description: "guildMemberRemove event test",
  usage: "leavemsgtest"
};