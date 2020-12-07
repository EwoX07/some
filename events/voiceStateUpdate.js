module.exports = async (client, oldState, newState) => {

    const guild = "736362962566250508";
    const channel = "754148912922624021";

    const master = await client.guilds.cache.get(guild).channels.cache.get(channel);
    if (!master) return;

    const target = newState.member;

    if (oldState.channel !== newState.channel) {

        if (newState.channelID === master.id) {
            const clone = await master.clone({ name: target.user.username }).catch(() => {});
            return target.setChannel(clone).catch(() => {});
        }

    }

};
