module.exports = async (client, oldState, newState) => {

    const guild = "736362962566250508";
    const channel = "754148912922624021";

    const master = await client.guilds.cache.get(guild).channels.cache.get(channel);
    if (!master) return;

    let clone;

    if (oldState.channel !== newState.channel) {

        if (newState.channelID === master.id) {
            await master.clone({ name: newState.member.user.username })
              .then(async channel => {
                  clone.push({ cID: channel.id, gID: channel.guild.id, mID: newState.member.user.id });
                  await newState.setChannel(channel.id);
              })
        } console.log(clone);

        if (clone.length > 0) {
            for(let i = 0; i < clone.length; i++) {
                let ch = await client.guilds.cache.find(x => x.id === clone[i].gID).channels.cache.find(x => x.id === clone[i].cID);
                if(ch.members.filter(m => !m.user.bot).size === 0) {
                   await ch.delete().catch((e) => message.channel.send(`{e}`));
                   return clone.splice(i, 1);
                }
            }
        }
    }
};
