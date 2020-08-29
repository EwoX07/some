const { MessageEmbed } = require("discord.js");
exports.run = async (client, message, args) => {
  
  if (!message.guild.me.hasPermission("MANAGE_ROLES")) {
      return message.reply(`I don't have the \`MANAGE_ROLES\` permission to do that!`).then(
        msg => {msg.delete({timeout: 10000})
               });
  }
  
  if (!message.member.hasPermission("MANAGE_ROLES")) {
      return message.reply(`You don't have the \`MANAGE_ROLES\` permission to do that!`).then(
        msg => {msg.delete({timeout: 10000})
               });
  }
  
  if (!args[0]) return message.reply("Please specify the user and the role!").then(
    msg => {msg.delete({timeout: 10000})
           });
  if (!args.slice(1).join(" ")) return message.channel.send("Please specify the role!").then(
    msg => {msg.delete({timeout: 10000})
           });
  try {
  let member = message.mentions.members.first() || await message.guild.members.fetch({user: args[0], force: true});
  let role = message.guild.roles.cache.find((r) => r.name.toLowerCase() === args.slice(1).join(" ").toLowerCase()) || 
             message.guild.roles.cache.find((r) => r.id === args[1]) || message.mentions.roles.last();
  if (!role) return message.channel.send("I couldn't find that role!").then(
    msg => {msg.delete({timeout: 10000})
           });
  
  let embed = new MessageEmbed()
  
  if (!member.roles.cache.has(role.id)) {
      embed.setColor("#ff0000")
      embed.setDescription(`<a:ano:744384493376503869> ${member.user} doesn't have the ${role} role`);
    message.channel.send(embed)
  } else {
      embed.setColor("#00ff00")
      embed.setDescription(`<a:ayes:744384533931098184> ${role} role is removed from ${member.user}`);
    await member.roles.remove(role.id)
    .then(() => message.channel.send(embed))
    .catch(err => message.reply(`Something went wrong... ${err} or Probably the ${role.name} role is higher than my role.`));
  }
  } catch(e) {
    return message.reply(`Something went wrong... ${e}.`);
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["rrole"],
  permLevel: "Moderator"
};

exports.help = {
  name: "removerole",
  category: "Mods",
  description: "Remove role from specified member `(My role should be higher than the specified role)`",
  usage: "removerole `<user mention/user id> <role name/role mention/role id>`"
};