const config = {
  ownerID: "339612673811415041",

  admins: [],

  support: [],

  token: "NzMyODI4NTk4NDM1NzA4OTc0.Xw6R0Q.SSCaKRf0UEmqGVpGvDymfj2Dr5E",

  defaultSettings: {
    prefix: ">>",
    modLogChannel: "mod-log",
    modRole: "Moderator",
    adminRole: "Administrator",
    systemNotice: "true",
    boostChannel: "booster",
    boostEnabled: "false",
    leaveChannel: "goodbye",
    leaveEnabled: "false",
    leaveImage: "https://bit.ly/34nJIK4",
    welcomeChannel: "welcome",
    welcomeEnabled: "false",
    welcomeImage1: "https://bit.ly/34iBm6x",
    welcomeImage2: "https://bit.ly/2Q9JaPB",
    welcomeMessage: "Welcome to {{guild}}, {{user}}!",
    welcomeEmbed: "false",
    welcomeEmbedCh: "welcome",
    welcomeEmbedImg: "https://bit.ly/3gm4SKX"
  },

  permLevels: [
    { level: 0, name: "User", check: () => true },

    {
      level: 2,

      name: "Moderator",
      check: message => {
        try {
          const modRole = message.guild.roles.cache.find(
            r => r.name.toLowerCase() === message.settings.modRole.toLowerCase()
          );
          if (modRole && message.member.roles.cache.has(modRole.id))
            return true;
        } catch (e) {
          return false;
        }
      }
    },

    {
      level: 4,
      name: "Administrator",
      check: message => {
        try {
          const adminRole = message.guild.roles.cache.find(
            r =>
              r.name.toLowerCase() === message.settings.adminRole.toLowerCase()
          );
          return adminRole && message.member.roles.cache.has(adminRole.id);
        } catch (e) {
          return false;
        }
      }
    },

    {
      level: 6,
      name: "Server Owner",
      check: message =>
        message.channel.type === "text"
          ? message.guild.ownerID === message.author.id
            ? true
            : false
          : false
    },

    {
      level: 8,
      name: "Bot Support",
      check: message => config.support.includes(message.author.id)
    },

    {
      level: 9,
      name: "Bot Admin",
      check: message => config.admins.includes(message.author.id)
    },

    {
      level: 10,
      name: "Bot Owner",
      check: message => message.client.config.ownerID === message.author.id
    }
  ]
};

module.exports = config;
