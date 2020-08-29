module.exports = async (client, message) => {
  if (message.author.bot) return;

  const gid = "718691607888789547";
  const trg = message.content.toLowerCase();

  const ar = [
    "welkam",
    "welcome",
    "<@300944075983421451>",
    "<@622047554359656473>",
    "<@720224674457452594>",
    "<@508092111858434110>"
  ];

  if (trg === ar[0]) {
    if (message.guild.id !== gid) return;
    message.channel.send(
      "<a:welcomeimage_1:727887823537176638><a:welcomeimage_2:727887823268610089>"
    );
  } else if (trg === ar[1]) {
    if (message.guild.id !== gid) return;
    message.channel.send(
      "<a:wlcm1:741733944130797608><a:wlcm2:741734096710926357>"
    );
  } else if (trg === ar[2]) {
    if (message.guild.id !== gid) return;
    message.reply(
      "Maaf kalau slowrespon, coba WA aja yaa.... <:sinisamaom:731030533169217566>"
    );
  } else if (trg === ar[3]) {
    if (message.guild.id !== gid) return;
    message.reply(
      "Apa sayang? Penting DM aja yuhuuu <a:RainbowWeeb:729649922240151563>"
    );
  } else if (trg === ar[4]) {
    if (message.guild.id !== gid) return;
    message.reply("Iya sayang kenapa?");
  } else if (trg === ar[5]) {
    if (message.guild.id !== gid) return;
    message.reply(
      "Ada apa tag - tag? Kalau kangen DM aja.... <a:ciatciat:725117108832436274>"
    );
  }

  const settings = (message.settings = client.getSettings(message.guild));

  const prefixMention = new RegExp(`^<@!?${client.user.id}>( |)$`);
  if (message.content.match(prefixMention)) {
    return message.reply(`My prefix on this guild is \`${settings.prefix}\``);
  }

  if (message.content.indexOf(settings.prefix) !== 0) return;

  const args = message.content
    .slice(settings.prefix.length)
    .trim()
    .split(/ +/g);
  const command = args.shift().toLowerCase();

  if (message.guild && !message.member)
    await message.guild.fetchMember(message.author);

  const level = client.permlevel(message);

  let cmd;
  
  if (client.commands.has(command)) cmd = client.commands.get(command);
	else if (client.aliases.has(command)) cmd = client.commands.get(client.aliases.get(command));
  
  if (!cmd) return;

  if (cmd && !message.guild && cmd.conf.guildOnly)
    return message.channel.send(
      "This command is unavailable via private message. Please run this command in a guild."
    );

  if (level < client.levelCache[cmd.conf.permLevel]) {
    if (settings.systemNotice === "true") {
      return message.channel
        .send(`You do not have permission to use this command.
  Your permission level is ${level} (${
        client.config.permLevels.find(l => l.level === level).name
      })
  This command requires level ${client.levelCache[cmd.conf.permLevel]} (${
        cmd.conf.permLevel
      })`);
    } else {
      return;
    }
  }

  message.author.permLevel = level;

  message.flags = [];
  while (args[0] && args[0][0] === "-") {
    message.flags.push(args.shift().slice(1));
  }

  client.logger.cmd(
    `[CMD] ${client.config.permLevels.find(l => l.level === level).name} ${
      message.author.username
    } (${message.author.id}) ran command ${cmd.help.name}`
  );
  cmd.run(client, message, args, level);
};