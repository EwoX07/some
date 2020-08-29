module.exports = async (client, member) => {
  const Discord = require("discord.js");
  const Canvas = require("canvas");

  const settings = client.getSettings(member.guild);

  if (settings.welcomeEnabled !== "true") return;

  const channel = member.guild.channels.cache.find(
    c => c.name === settings.welcomeChannel
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

    var wimg1 = settings.welcomeImage1;
    var wimg2 = settings.welcomeImage2;
    var images = [`${wimg1}`, `${wimg2}`];
    var imx = Math.floor(Math.random() * images.length);

    const background = await Canvas.loadImage(images[imx]);
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = "#74037b";
    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    ctx.font = "bold 15px Impact";
    ctx.fillStyle = "#ffffff";
    ctx.shadowColor = "black";
    ctx.shadowBlur = 7;
    ctx.fillText(
      `Kamu member\nke #${member.guild.memberCount}`,
      canvas.width / 1.25,
      canvas.height / 1.4
    );

    ctx.font = "bold 40px Calibri";
    ctx.fillStyle = "#ffffff";
    ctx.shadowColor = "black";
    ctx.shadowBlur = 7;
    ctx.fillText(`Selamat Datang di`, canvas.width / 5.1, canvas.height / 6.5);

    ctx.font = applyText(canvas, `${member.displayName}`);
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.shadowColor = "black";
    ctx.shadowBlur = 7;
    ctx.fillText(
      `${member.displayName}`,
      canvas.width / 2.0,
      canvas.height / 1.05
    );

    ctx.beginPath();
    ctx.arc(345, 145, 80, 0, Math.PI * 2, true);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 5;
    ctx.stroke();
    ctx.closePath();
    ctx.clip();

    const avatar = await Canvas.loadImage(
      member.user.displayAvatarURL({ format: "jpg" })
    );
    ctx.drawImage(avatar, 265, 65, 160, 160);

    var placeholder = {
      "{{user}}": member.user,
      "{{guild}}": member.guild.name
    };

    var RE = new RegExp(Object.keys(placeholder).join("|"), "gi");

    var wmsg = settings.welcomeMessage.replace(RE, function(matched) {
      return placeholder[matched];
    });

    const attachment = new Discord.MessageAttachment(
      canvas.toBuffer(),
      "welcome-image.png"
    );

    client.channels.cache.get(channel).send(`${wmsg}`, attachment).catch(console.error);
  }
  // Welcome Embed gangsebelahspecial
  /*if (settings.welcomeEmbed !== "true") return;

  const wembc = member.guild.channels.cache.find(
    wc => wc.name === settings.welcomeEmbedCh
  );
  
  if (!wembc) {
    return;
  } else {
    let color = member.guild.me.displayHexColor;
    if (color === "#000000") color = "#8300ff";

    const wembed = new Discord.MessageEmbed()
      .setAuthor(
        `Selamat Datang di ${member.guild.name}, ${member.displayName}!`,
        `${member.user.displayAvatarURL()}`
      )
      .setThumbnail(member.user.avatarURL())
      .setDescription([
        `**Baca tata krama di :** <#719482949011243048>`,
        `**Ambil role di :** <#719483981355024404>`,
        `**Dan jangan lupa isi data diri lu di :** <#719484046174060555>\n`,
        `**Enjoy your stay and Have fun guys! Cheers...**<a:tenor:746856902708822118>`
      ])
      .setImage(`${settings.welcomeEmbedImg}`)
      .setColor(color)
      .setFooter(`Member Saat ini : ${member.guild.memberCount}`)
      .setTimestamp();
    wembc.send(`Welcome ${member}`, wembed).catch(console.error);
  }*/
};