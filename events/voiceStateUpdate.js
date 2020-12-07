module.exports = async (client, oldState, newState) => {

    const guild = "736362962566250508";
    const channel = "754148912922624021";

    const master = await client.guilds.cache.get(guild).channels.cache.get(channel);
    if (!master) return;

    if (oldState.channel !== newState.channel) {

        if (newState.channelID === master.id) {
            const clone = await master.clone({ name: newState.member.user.username }).catch(() => {});
            return newState.setChannel(clone).catch(() => {});
        }

    }

};
