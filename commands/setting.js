const { MessageEmbed } = require('discord.js');
exports.run = async (client, message, [action, key, ...value], level) => {
  
  const settings = message.settings;
  const defaults = client.settings.get("default");
  const overrides = client.settings.get(message.guild.id);
  if (!client.settings.has(message.guild.id)) client.settings.set(message.guild.id, {});
  

  if (action === "edit") {
    
    if (!key) return message.reply("Please specify a key to edit");

    if (!defaults[key]) return message.reply("This key does not exist in the settings");
    const joinedValue = value.join(" ");
  
    if (joinedValue.length < 1) return message.reply("Please specify a new value");
    
    if (joinedValue === settings[key]) return message.reply("This setting already has that value!");
    
    if (!client.settings.has(message.guild.id)) client.settings.set(message.guild.id, {});

    client.settings.set(message.guild.id, joinedValue, key);

    message.reply(`${key} successfully edited to ${joinedValue}`);
  } else
  
  if (action === "del" || action === "reset") {
    if (!key) return message.reply("Please specify a key to reset.");
    if (!defaults[key]) return message.reply("This key does not exist in the settings");
    if (!overrides[key]) return message.reply("This key does not have an override and is already using defaults.");
    
    const response = await client.awaitReply(message, `Are you sure you want to reset ${key} to the default value?`);

    if (["y", "yes"].includes(response.toLowerCase())) {
      
      client.settings.delete(message.guild.id, key);
      message.reply(`${key} was successfully reset to default.`);
    } else
  
    if (["n","no","cancel"].includes(response)) {
      message.reply(`Your setting for \`${key}\` remains at \`${settings[key]}\``);
    }
  } else
  
  if (action === "get") {
    if (!key) return message.reply("Please specify a key to view");
    if (!defaults[key]) return message.reply("This key does not exist in the settings");
    const isDefault = !overrides[key] ? "\nThis is the default global default value." : "";
    message.reply(`The value of ${key} is currently ${settings[key]}${isDefault}`);
  } else {

    const array = [];
    Object.entries(settings).forEach(([key, value]) => {
      array.push(`${key}${" ".repeat(20 - key.length)}::  ${value}`); 
    });
    
    let color = message.guild.me.displayHexColor;
    if (color === "#000000") color = "#8300ff";
    
    const embed = new MessageEmbed()
    .setColor(color)
    .setAuthor("Current Guild Settings", "https://tinyurl.com/y4xs3cje")
    .setDescription([`\`\`\`${array.join("\n")}\n`,
                     `Use ${settings.prefix}setting <edit> <key> <value>\nto change the keys value.\n`,
                     `<> : Required | [] : Optional\nDont include the brackets!\`\`\``])
    .setFooter(`Requested by: ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
    .setTimestamp()
    await message.channel.send(embed)
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["set", "settings"],
  permLevel: "Administrator"
};

exports.help = {
  name: "setting",
  category: "Admins",
  description: "View or change settings for your server.",
  usage: "setting `<view/get/edit> <key> <value>`"
};