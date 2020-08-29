const { MessageEmbed } = require("discord.js");
exports.run = async (client, message, args) => {
  
  if (message.deletable) message.delete();
  
  if (!message.guild.me.hasPermission("BAN_MEMBERS")) {
    return message.reply(`I don't have the \`BAN_MEMBERS\` permission to ban a member!`).then(
      msg => {msg.delete({timeout: 10000})
             });
  }
  
  if (!message.member.hasPermission("BAN_MEMBERS")) {
    return message.reply(`You don't have the \`BAN_MEMBERS\` permission to ban a member!`).then(
      msg => {msg.delete({timeout: 10000})
             });
  }
  
  try {
  let user = message.mentions.members.first() || await message.guild.members.fetch({user: args[0], force: true});
  if (!args[0]) return message.reply("Please specify the user to ban!").then(
    msg => {msg.delete({timeout: 10000})
         });
    
  let banReason = args.slice(1).join(" ");
    if (user === message.guild.me) return message.reply("I can't ban myself, you idiot!").then(
      msg => {msg.delete({timeout: 10000})
             });
    if (user === message.author) return message.reply("You can't ban yourself, lmao").then(
      msg => {msg.delete({timeout: 10000})
             });
    if (!banReason) banReason = "`No Reason`";
    if (!user.bannable) return message.reply("You can't ban this user!").then(
      msg => {msg.delete({timeout: 10000})
             });
    
  const embed = new MessageEmbed()
  .setColor("#ff0000")
  .setThumbnail(user.user.displayAvatarURL({ dynamic: true }))
  .setTimestamp()
  .setDescription([`<:ban:744395924108738630> **${user.user.tag}** has been successfully banned!`,
                   `**ID:** \`${user.id}\``,
                   `**Reason:** \`${banReason}\``]);
    await user.ban({reason: `${banReason}`})
      .then(() => message.channel.send(embed))
      .catch(err => message.reply(`Something went wrong... ${err}`));
  } catch(e) {
    return message.reply(`Something went wrong... ${e}`);
  };
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "Moderator"
};

exports.help = {
  name: "ban",
  category: "Mods",
  description: "Ban a user!",
  usage: "ban `<user mention/user id> [reason]`"
};