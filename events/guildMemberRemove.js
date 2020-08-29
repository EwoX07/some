module.exports = async (client, member) => {
  const Discord = require("discord.js");
  const Canvas = require("canvas");

  const settings = client.getSettings(member.guild);

  if (settings.leaveEnabled !== "true") return;

  let channel = member.guild.channels.cache.find(
    c => c.name === settings.leaveChannel
  );
  
  if (!channel) {
    return;
  } else {
    const applyText = (canvas, text) => {
      const ctx = canvas.getContext("2d");
      let fontSize = 60;

      do {
        ctx.font = `bold ${(fontSize -= 10)}px Calibri`;
      } while (ctx.measureText(text).width > canvas.width - 300);

      return ctx.font;
    };

    const canvas = Canvas.createCanvas(700, 350);
    const ctx = canvas.getContext("2d");

    var limg = settings.leaveImage;

    const background = await Canvas.loadImage(`${limg}`);
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = "#74037b";
    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    ctx.font = "bold 40px Calibri";
    ctx.fillStyle = "#ffffff";
    ctx.shadowColor = "black";
    ctx.shadowBlur = 7;
    ctx.fillText(
      `Selamat Jalan Sahabat`,
      canvas.width / 7.0,
      canvas.height / 6.5
    );

    ctx.font = applyText(canvas, `${member.displayName}`);
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.shadowColor = "black";
    ctx.shadowBlur = 7;
    ctx.fillText(
      `${member.displayName}`,
      canvas.width / 2.0,
      canvas.height / 1.1
    );

    ctx.beginPath();
    ctx.arc(345, 175, 80, 0, Math.PI * 2, true);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 5;
    ctx.stroke();
    ctx.closePath();
    ctx.clip();

    const avatar = await Canvas.loadImage(
      member.user.displayAvatarURL({ format: "jpg" })
    );
    ctx.drawImage(avatar, 265, 95, 160, 160);

    var lmsg = `Goodbye ${member.displayName}`;

    const attachment = new Discord.MessageAttachment(
      canvas.toBuffer(),
      "leave-image.png"
    );

    channel.send(`${lmsg}`, attachment).catch(console.error);
  }
};