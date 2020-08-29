const { MessageEmbed } = require("discord.js");
exports.run = async (client, message, args) => {
  
  if (message.deletable) message.delete();
  
  if (!message.guild.me.hasPermission("KICK_MEMBERS")) {
    return message.reply(`I don't have the \`KICK_MEMBERS\` permission to kick a member!`).then(
      msg => {msg.delete({timeout: 10000})
             });
  }
  
  if (!message.member.hasPermission("KICK_MEMBERS")) {
    return message.reply(`You don't have the \`KICK_MEMBERS\` permission to kick a member!`).then(
      msg => {msg.delete({timeout: 10000})
             });
  }
  
  try {
  let user = message.mentions.members.first() || await message.guild.members.fetch({user: args[0], force: true});
  if (!args[0]) return message.reply("Please specify the user to kick!").then(
    msg => {msg.delete({timeout: 10000})
         });
    
  let kickReason = args.slice(1).join(" ");
    if (user === message.guild.me) return message.reply("I can't kick myself, you idiot!").then(
      msg => {msg.delete({timeout: 10000})
             });
    if (user === message.author) return message.reply("You can't kick yourself, lmao").then(
      msg => {msg.delete({timeout: 10000})
             });
    if (!kickReason) kickReason = "`No Reason`";
    if (!user.kickable) return message.reply("You can't kick this user!").then(
      msg => {msg.delete({timeout: 10000})
             });
    
  const embed = new MessageEmbed()
  .setColor("#ff0000")
  .setThumbnail(user.user.displayAvatarURL({ dynamic: true }))
  .setTimestamp()
  .setDescription([`<:redcek:748660132648321085> **${user.user.tag}** has been successfully kicked!`,
                   `**ID:** \`${user.id}\``,
                   `**Reason:** \`${kickReason}\``]);
    await user.kick({reason: `${kickReason}`})
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
  name: "kick",
  category: "Mods",
  description: "kick a user!",
  usage: "kick `<user mention/user id> [reason]`"
};