const { MessageEmbed } = require('discord.js');
exports.run = (client, message, args, level) => {
  
    const myCommands = message.guild ? client.commands.filter(
      cmd => client.levelCache[cmd.conf.permLevel] <= level) : client.commands.filter(
      cmd => client.levelCache[cmd.conf.permLevel] <= level &&  cmd.conf.guildOnly !== true);
  
    const embed = new MessageEmbed()
    .setColor("#8300ff")
    .setFooter(`Requested by: ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
    .setTimestamp()
  
    if (!args[0]) {

    const categories = [...new Set(myCommands.map(command => command.help.category))];
    
        embed.setAuthor("MY COMMAND LIST", "https://tinyurl.com/yxnl54tu")
        embed.setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
        embed.setDescription([
            `**Prefix:** \`${message.settings.prefix}\``,
            `\`<> : Required | [] : Optional\nDont include the brackets!\``,
            `Use \`${message.settings.prefix}help [command]\` to view command help with more detail.`
        ]);

        let categorisedCommands;
    
        for (const category of categories) {
            categorisedCommands = myCommands.filter(cmd => cmd.help.category === category);
            embed.addField(`**❯ ${category}**`, categorisedCommands.map(cmd => `\`${cmd.help.name}\``).join(", "));
        }
      
      return message.channel.send(embed);
  
  } else {
    
    const command = client.commands.get(args[0]) || client.commands.get(client.aliases.get(args[0]));
  
      if (level < client.levelCache[command.conf.permLevel]) return;
      
      embed.setAuthor("Command", "https://tinyurl.com/yxnl54tu")
      embed.addField(`${message.settings.prefix}${command.help.name}`, [
        `**● Aliases:** ${command.conf.aliases.join(", ") ? command.conf.aliases.join(", ") : "`None`"}`,
        `**● Usage:** ${command.help.usage}`,
        `**● Description:** ${command.help.description}`
        ])
      
      message.channel.send(embed)
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["h", "halp"],
  permLevel: "User"
};

exports.help = {
  name: "help",
  category: "Utils",
  description: "Displays all the available commands for your permission level.",
  usage: "help `[command]`"
};