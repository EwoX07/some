const Discord = require("discord.js");
const { promisify } = require("util");
const readdir = promisify(require("fs").readdir);
const Enmap = require("enmap");
 
//const { ReactionRoleManager } = require("discord.js-collector");

const client = new Discord.Client({
  disableMentions: "everyone"
});

const TempChannels = require("./index.ts");
const tempChannels = new TempChannels(client);

/*const logs = require("discord-logs");
logs(client);*/

client.config = require("./config.js");
client.logger = require("./modules/logger.js");
require("./modules/functions.js")(client);

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
};

init();

client.login(client.config.token);
