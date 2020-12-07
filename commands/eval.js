exports.run = async (client, message, args, level) => {
	  
	  const clean = text => {
		    if (typeof(text) === "string")
			      return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
		    else
			        return text;
	  }


	try {
		      const code = clean(args.join(" "));
		      let evaled = eval(code);

		      if (typeof evaled !== "string")
			        evaled = require("util").inspect(evaled);

		      message.channel.send(clean(evaled), {code:"xl"});
		    } catch (err) {
			          message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
			        }
};
exports.conf = {
	  enabled: true,
	  guildOnly: false,
	  aliases: [],
	  permLevel: "Bot Owner"
};

exports.help = {
	  name: "eval",
	  category: "Bot Owner",
	  description: "Reloads a command that's been modified.",
	  usage: "eval `[code]`"
};
