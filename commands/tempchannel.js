exports.run = async (client, message, args) => {
  const TempChannels = require("discord-temp-channels");
  const tempChannels = new TempChannels(client);
  const db = require("quick.db");
  
        const options = {
            childCategory: message.member.voice.channel.parentID,
            childAutoDelete: true,
            childAutoDeleteIfOwnerLeaves: false,
            childBitrate: 8000,
            childFormat: (member, count) => `#${count} | ${member.user.username}`
        };
        tempChannels.registerChannel(message.member.voice.channel.id, options);
        db.push("temp-channels", {
            channelID: message.member.voice.channel.id,
            options: options
        });
        message.channel.send("Your voice is now a main voice channel!");
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "Administrator"
};

exports.help = {
  name: "tempchannel",
  category: "Admins",
  description: "Create a main temp voice channel",
  usage: "tempchannel"
};