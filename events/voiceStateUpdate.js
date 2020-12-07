module.exports = async (client, oldState, newState) => {

    const guild = "736362962566250508";
    const channel = "754148912922624021";

    const master = await client.guilds.cache.get(guild).channels.cache.get(channel);
    if (!master) return;

    let clone;

    if (oldState.channel !== newState.channel) {

        if (newState.channelID === master.id) {
            clone = await master.clone({ name: newState.member.user.username }).catch(() => {});
            await newState.setChannel(clone).catch(() => {});
        }
        if (clone.members.filter(m => !m.user.bot).size < 1) {
            await clone.delete();
        }
    }
};
