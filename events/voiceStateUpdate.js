module.exports = async (oldState, newState) => {

    const guild = "736362962566250508";
    const channel = "754148912922624021";

    if (oldState !== newState) {

        if (newState.channelID === channel) console.log("join");
    }

}
