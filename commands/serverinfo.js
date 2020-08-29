exports.run = async (client, message, args) => {
  
  const Discord = require("discord.js");
  const moment = require("moment");
  
  const features = {"ANIMATED_ICON": "Animated Icon",
                    "BANNER": "Banner",
                    "COMMERCE": "Commerce",
                    "COMMUNITY": "Community",
                    "DISCOVERABLE": "Discoverable",
                    "FEATUREABLE": "Featureable",
                    "INVITE_SPLASH": "Invite Splash",
                    "NEWS": "News",
                    "PARTNERED": "Partnered",
                    "VANITY_URL": "Vanity URL",
                    "VERIFIED": "Verified",
                    "VIP_REGIONS": "Vip Regions",
                    "WELCOME_SCREEN_ENABLED": "Welcome Screen Enabled"
                   };
  
  const feature = message.guild.features;
  
  message.guild.members.fetch().then(fetchedMembers => {
	  const totalOnline = fetchedMembers.filter(member => member.presence.status === 'online').size;
    const totalIdle = fetchedMembers.filter(member => member.presence.status === 'idle').size;
    const totalDND = fetchedMembers.filter(member => member.presence.status === 'dnd').size;
    const totalOffline = fetchedMembers.filter(member => member.presence.status === 'offline').size;
  
  const voiceChannels = message.guild.channels.cache.filter(c => c.type === 'voice');
    let count = 0;
  
    for (const [id, voiceChannel] of voiceChannels) count += voiceChannel.members.size;
    
    let banner = message.guild.bannerURL({ format: 'png', dynamic: true, size: 2048 });
    let mark = `🔗 [${message.guild.name} Banner]`;
    if (banner !== null) banner = `${mark}(${banner})`;
    
    let vanity = message.guild.vanityURLCode;
    let url = '🔗 https://discord.gg/';
    if (vanity !== null) vanity = `${url}${vanity}`;

    let partnered = {"true": "<:DiscordPartnerServer:744430120479096832> `YES`", "false": "<:notpartnered:744986300649832609> `NO`"};
    let emo = {"0": "100", "1": "200", "2": "300", "3": "400"};
    let verified = {"true": "<:DiscordVerified:744430089697099847> `YES`", "false": "<:notverified:744986334321705100> `NO`"};
    let verifLevels = {"NONE": "`NONE`", "LOW": "`LOW`", "MEDIUM": "`MEDIUM`", "HIGH": "`(╯°□°）╯︵  ┻━┻`", "VERY_HIGH": "`┻━┻ミヽ(ಠ益ಠ)ノ彡┻━┻`"};
    let region = {"brazil": ":flag_br: Brazil",
        "eu-central": ":flag_eu: Central Europe",
        "singapore": ":flag_sg: Singapore",
        "us-central": ":flag_us: U.S. Central",
        "sydney": ":flag_au: Sydney",
        "us-east": ":flag_us: U.S. East",
        "us-south": ":flag_us: U.S. South",
        "us-west": ":flag_us: U.S. West",
        "eu-west": ":flag_eu: Western Europe",
        "vip-us-east": ":flag_us: VIP U.S. East",
        "london": ":flag_gb: London",
        "amsterdam": ":flag_nl: Amsterdam",
        "hongkong": ":flag_hk: Hong Kong",
        "russia": ":flag_ru: Russia",
        "southafrica": ":flag_za:  South Africa"
    };
    
    let color = message.guild.me.displayHexColor;
    if (color === '#000000') color = '#8300ff';
    
    const roles = message.guild.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString());
		const members = message.guild.members.cache;
		const channels = message.guild.channels.cache;
		const emojis = message.guild.emojis.cache;
    
    const embed = new Discord.MessageEmbed()
    
        .setAuthor("SERVER INFO", "https://tinyurl.com/y4xs3cje")
        .setColor(color)
        .addField("**❯ General:**", [
          `**● Name:** ${message.guild.name}`,
          `**● ID:** \`${message.guild.id}\``,
          `**● Owner:** ${message.guild.owner.user.tag}`,
          `**● ID:** \`${message.guild.owner.user.id}\``,
          `**● Region:** ${region[message.guild.region]}`,
          `**● Verification Level:** ${verifLevels[message.guild.verificationLevel]}`,
          `**● Explicit Content Filter:** \`${message.guild.explicitContentFilter}\``,
          `**● Boosters:** <a:boostgems:739595657123201125> ${message.guild.premiumSubscriptionCount}`,
          `**● Tier:** <a:boostgems:739595657123201125> Level ${message.guild.premiumTier}`,
          `**● Banner:** ${banner ? banner : '`None`'}`,
          `**● Vanity URL:** ${vanity ? vanity : '`None`'}`,
          `**● Partnered | Verified:** ${partnered[message.guild.partnered]} | ${verified[message.guild.verified]}`,
          `**● Creation Date:** ${moment(message.guild.createdAt).format('llll')} \`(${moment(message.guild.createdAt).fromNow()})\``,
          `\u200b`
          ])
    
        .addField("**❯ Statistics:**", [
          `**● Role Count:** ${roles.length}`,
          `**● Emoji Count:** ${emojis.size}`,
          `**● Regular Emoji Count:** ${emojis.filter(emoji => !emoji.animated).size}`,
          `**● Animated Emoji Count:** ${emojis.filter(emoji => emoji.animated).size}`,
          `**● Member Count:** ${message.guild.memberCount}`,
          `**● Humans:** ${members.filter(member => !member.user.bot).size}`,
          `**● Bots:** ${members.filter(member => member.user.bot).size}`,
          `**● Text Channels:** ${channels.filter(channel => channel.type === 'text').size}`,
          `**● Voice Channels:** ${channels.filter(channel => channel.type === 'voice').size}`,
          `**● Member in Voice Channels:** <a:giphy_3:744676992141623399> ${count}`,
          `**● Member Presences:**\n> <:online:741196747748933682> ${totalOnline}\n> <:idle:741197218861678644> ${totalIdle}\n> <:dnd:741196524238667846> ${totalDND}\n> <:offline:741197268123648020> ${totalOffline}`,
          `**● You JoinedAt:** ${moment(message.member.joinedAt).format("llll")} \`(${moment(message.member.joinedAt).fromNow()})\``,
          `\u200b`
          ])
    
        .addField("**❯ Features:**",[
          `\`${feature.length ? feature.map(ft => features[ft]).join(', ') : 'None'}\``,
          `\u200b`
          ])
        .setThumbnail(message.guild.iconURL({ dynamic: true }))
        .setFooter(`Requested by: ${message.author.tag}`, `${message.member.user.displayAvatarURL({ dynamic: true })}`)
        .setTimestamp()
    
    message.channel.send({embed})
    
  });
  
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["guildinfo"],
  permLevel: "User"
};

exports.help = {
  name: "serverinfo",
  category: "Miscelaneous",
  description: "Display this server info",
  usage: "serverinfo"
};