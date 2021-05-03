const collection = require('lodash/collection');
const array = require('lodash/array');
const { getChannelsBotIsPartOf, postMessage, getMemembersInChannel, getBotUserId } = require('./slack_api.js');

const MEMBERS_PER_GROUP = 2;

function generateRandomCoffeePairMessage(pairs) {
    let message = "This weeks random coffees are: \n\n";

    pairs.forEach((pair, index) => {
        message += generateMessageForPair(index + 1, pair);
    });

    return message;
}

function generateMessageForPair(index, group) {
    return `${index}. ${group.map((member) => `<@${member}>`).join(" and ")}\n`;
}

function convertMemberListToPairs(channelMembers, membersPerGroup) {
    const shuffledMembers = collection.shuffle(channelMembers);
    return array.chunk(shuffledMembers, membersPerGroup)
}

async function postRandomCoffeePairMessageToChannels() {
    const channels = await getChannelsBotIsPartOf();
    const botUserId = await getBotUserId();

    channels.forEach(async (channel) => {
      const membersInChannel = await getMemembersInChannel(channel.id)
      const membersThatAreNotBot = membersInChannel.filter(member => member !== botUserId)
      const pairs = convertMemberListToPairs(membersThatAreNotBot, MEMBERS_PER_GROUP);
      const messageToPost = generateRandomCoffeePairMessage(pairs);
      await postMessage(channel.id, messageToPost);
    });
}

module.exports = {
  postRandomCoffeePairMessageToChannels: postRandomCoffeePairMessageToChannels,
  generateMessageForGroup: generateMessageForPair,
  generateRandomCoffeePairMessage: generateRandomCoffeePairMessage
};
