exports.run = async (client, message, args) => {
  
  const Discord = require("discord.js");
  const moment = require("moment");
  
  const flags = {
	DISCORD_EMPLOYEE: '<:discordstaff:744429704630501437>',
	DISCORD_PARTNER: '<:badgepartner:744430029647118397>',
	BUGHUNTER_LEVEL_1: '<:BugHunter_1:744448839897055314>',
	BUGHUNTER_LEVEL_2: '<:BugHunter_2:744448798075387914>',
	HYPESQUAD_EVENTS: '<:hypesquadevent:744442782378098739>',
	HOUSE_BRAVERY: '<:bravery:744389663015436298>',
	HOUSE_BRILLIANCE: '<:brilliance:744389759262130187>',
	HOUSE_BALANCE: '<:balance:744389799368196237>',
	EARLY_SUPPORTER: '<:earlysupporter:744384359544520744>',
	TEAM_USER: '<:Uhh:415271021373816832>',
	SYSTEM: '<:system:744456285000433775>',
	VERIFIED_BOT: '<:verifiedbot:744456394295476234>',
	VERIFIED_DEVELOPER: '<:botdev:744390897143250975>'
  };
    
  const status = {'online': '<:online:741196747748933682> Online', 'idle': '<:idle:741197218861678644> Idle', 
                  'dnd': '<:dnd:741196524238667846> DND', 'offline': '<:offline:741197268123648020> Offline'};
  try {
  let member = message.mentions.members.first() || await message.guild.members.fetch({user: args.slice().join(' '), force: true});
  if (!args.length) member = message.member;
  
  const badges = member.user.flags.toArray();
  
  const roles = member.roles.cache
			.sort((a, b) => b.position - a.position)
			.map(role => role.toString())
      .slice(0, -1);
  
  let color = member.displayHexColor;
  if (color === "#000000") color = "#8300ff";
    
    const embed = new Discord.MessageEmbed()
    
        .setAuthor("USER INFO", "https://tinyurl.com/y4xs3cje")
        .setColor(color)
        .addField("**❯ User:**", [
          `**● Username:** ${member.user.username}`,
          `**● Discriminator:** \`#${member.user.discriminator}\``,
          `**● ID:** \`${member.id}\``,
          `**● Status:** ${status[member.user.presence.status]}`,
          `**● Badges:** ${badges.length ? badges.map(flag => flags[flag]).join('  ') : '`None`'}`,
          `**● Avatar:** 🔗 [${member.user.username}\`s Avatar](${member.user.displayAvatarURL({ format: 'png', dynamic: true, size: 2048 })})`,
          `**● Created Date:** ${moment(member.user.createdAt).format('llll')} \`(${moment(member.user.createdAt).fromNow()})\``,
          `\u200b`
          ])
    
        .addField("**❯ Member:**", [
          `**● Nickname:** ${member.displayName}`,
          `**● Highest Role:** ${member.roles.highest}`,
          `**● Hex Color:** \`${color}\``,
          `**● Roles [${roles.length}]:** ${roles.length < 16 && roles.length !== 0 ? roles.join(' | ') : roles.length > 15 ? ('Too Many Roles!') : '`None`'}`,
          `**● Joined Date:** ${moment(member.joinedAt).format('llll')} \`(${moment(member.joinedAt).fromNow()})\``,
          `**● Acknowledgements:** ${member.guild.owner.id === member.user.id ? ('Server Owner') : member.hasPermission('ADMINISTRATOR') ? ('Server Admin') : '`None`'}`,
          `\u200b`
          ])
    
        .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
        .setFooter(`Requested by: ${message.author.tag}`, `${message.member.user.displayAvatarURL({ dynamic: true })}`)
        .setTimestamp()
    
    message.channel.send(embed);
  } catch(e) {
    return message.reply(`Something went wrong... ${e}`);
  };
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["whoami", "userinfo"],
  permLevel: "User"
};

exports.help = {
  name: "whois",
  category: "Miscelaneous",
  description: "Display your or other members info",
  usage: "whois `[user mention/user id]`"
};