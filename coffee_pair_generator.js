const collection = require('lodash/collection');
const array = require('lodash/array');
const { getChannelsBotIsPartOf, postMessage, getMemembersInChannel, getBotUserId } = require('./slack_api.js');

const MEMBERS_PER_GROUP = 2;

function generateRandomCoffeePairMessage(groups) {
    let message = "This weeks random coffees are: \n\n";

    groups.forEach((group, index) => {
        message += generateMessageForGroup(index, group);
    });

    return message;
}

function generateMessageForGroup(index, group) {
    return `${index + 1}. ${group.map((member) => `<@${member}>`).join(" and ")} \n`;
}

function convertMemberListToGroups(channelMembers, membersPerGroup) {
    const shuffledMembers = collection.shuffle(channelMembers);
    return array.chunk(shuffledMembers, membersPerGroup)
}

async function postRandomCoffeePairMessageToChannels() {
    const channels = await getChannelsBotIsPartOf();
    const botUserId = await getBotUserId();

    channels.forEach(async (channel) => {
      const membersInChannel = await getMemembersInChannel(channel.id)
      const membersThatAreNotBot = membersInChannel.filter(member => member !== botUserId)
      const memberGroups = convertMemberListToGroups(membersThatAreNotBot, MEMBERS_PER_GROUP);
      const messageToPost = generateRandomCoffeePairMessage(memberGroups);
      return postMessage(channel.id, messageToPost);
    });
}

module.exports = {
  postRandomCoffeePairMessageToChannels: postRandomCoffeePairMessageToChannels
};
