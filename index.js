const Discord = require("discord.js");
const exConfig = require("./config.json");
const { promisify } = require("util");
const readdir = promisify(require("fs").readdir);
const Enmap = require("enmap");
const DisTube = require("distube");
 
//const { ReactionRoleManager } = require("discord.js-collector");

const client = new Discord.Client({
  disableMentions: "everyone"
});

const TempChannels = require("discord-temp-channels");
const tempChannels = new TempChannels(client);

const logs = require("discord-logs");
logs(client);

client.config = require("./config.js");
client.distube = new DisTube(client, { searchSongs: true, emitNewSongOnly: true, leaveOnFinish: true });
client.logger = require("./modules/logger.js");
require("./modules/functions.js")(client);

client.emotes = exConfig.emoji;
client.commands = new Enmap();
client.aliases = new Enmap();
client.settings = new Enmap({
  name: "settings",
  fetchAll: false,
  autoFetch: true,
  cloneLevel: "deep",
  ensureProps: true
});

/*const reactionRoleManager = new ReactionRoleManager(client, {
    store: true,
    refreshOnBoot: true,
    path: __dirname + "/roles.json"
});

reactionRoleManager(client);

reactionRoleManager.on('reactionRoleAdd', (member, role) => {
    console.log(member.displayName + ' won the role' + role.name)
});

// When user remove reaction and lose role, will trigger this event
reactionRoleManager.on('reactionRoleRemove', (member, role) => {
    console.log(member.displayName + ' lose the role' + role.name)
});*/

const status = (queue) => `Volume: \`${queue.volume}%\` | Filter: \`${queue.filter || "Off"}\` | Loop: \`${queue.repeatMode ? queue.repeatMode == 2 ? "All Queue" : "This Song" : "Off"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``;
client.distube
    .on("playSong", (message, queue, song) => message.channel.send(
        `${client.emotes.play} | Playing \`${song.name}\` - \`${song.formattedDuration}\`\nRequested by: ${message.author.username}\n${status(queue)}`
    ))
    .on("addSong", (message, queue, song) => message.channel.send(
        `${client.emotes.success} | Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${message.author.username}`
    ))
    .on("playList", (message, queue, playlist, song) => message.channel.send(
        `${client.emotes.play} | Play \`${playlist.title}\` playlist (${playlist.total_items} songs).\nRequested by: ${message.author.username}\nNow playing \`${song.name}\` - \`${song.formattedDuration}\`\n${status(queue)}`
    ))
    .on("addList", (message, queue, playlist) => message.channel.send(
        `${client.emotes.success} | Added \`${playlist.title}\` playlist (${playlist.total_items} songs) to queue\n${status(queue)}`
    ))
    .on("initQueue", queue => {
    queue.autoplay = false;
    queue.volume = 100;
})
    .on("searchResult", (message, result) => {
        let i = 0;
        message.channel.send(`**Choose an option from below**\n${result.map(song => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``).join("\n")}\n*Enter anything else or wait 60 seconds to cancel*`).then(
          message => {message.delete({ timeout: 60000 })
                     })
    })
    .on("searchCancel", (message) => message.channel.send(`${client.emotes.error} | Searching canceled`))
    .on("noRelated", message => message.channel.send(">>> Can't find related video to play. Stop playing music."))
    .on("finish", message => message.channel.send(">>> No more song in queue"))
    .on("empty", message => message.channel.send(">>> Channel is empty. Leaving the channel"))
    .on("error", (message, err) => message.channel.send(`${client.emotes.error} | An error encountered: ${err}`));

const init = async () => {
  const cmdFiles = await readdir("./commands/");
  client.logger.log(`Loading a total of ${cmdFiles.length} commands.`);
  cmdFiles.forEach(f => {
    if (!f.endsWith(".js")) return;
    const response = client.loadCommand(f);
    if (response) console.log(response);
  });

  const evtFiles = await readdir("./events/");
  client.logger.log(`Loading a total of ${evtFiles.length} events.`);
  evtFiles.forEach(file => {
    const eventName = file.split(".")[0];
    client.logger.log(`Loading Event: ${eventName}`);
    const event = require(`./events/${file}`);
    client.on(eventName, event.bind(null, client));
  });

  client.levelCache = {};
  for (let i = 0; i < client.config.permLevels.length; i++) {
    const thisLevel = client.config.permLevels[i];
    client.levelCache[thisLevel.name] = thisLevel.level;
  }
  //client.login(client.exConfig.TOKEN);
};

init();

client.login(process.env.TOKEN);