exports.run = async (client, message, args) => {
  
  if (message.deletable) message.delete();
    
        if (!message.member.hasPermission("MANAGE_MESSAGES")) {
            return message.reply(`You don't have the \`MANAGE_MESSAGES\` to delete messages!`).then(
              m => {m.delete({timeout: 10000})
                   });
        }

        if (isNaN(args[0]) || parseInt(args[0]) <= 0) {
            return message.reply("Yeah.... That's not a number? I also can't delete 0 messages by the way.").then(
              m => {m.delete({timeout: 10000})
                   });
        }

        if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) {
            return message.reply(`I don't have the \`MANAGE_MESSAGES\` to delete messages!`).then(
              m => {m.delete({timeout: 10000})
                   });
        }

        let deleteAmount;

        if (parseInt(args[0]) > 100) {
            deleteAmount = 100;
        } else {
            deleteAmount = parseInt(args[0]);
        }

        message.channel.bulkDelete(deleteAmount, true)
            .catch(err => message.reply(`Something went wrong... ${err}`));
  
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["prune", "clear", "clean"],
  permLevel: "Moderator"
};

exports.help = {
  name: "purge",
  category: "Mods",
  description: "Purge a channel messages from 2 to 100",
  usage: "purge `<amount>`"
};