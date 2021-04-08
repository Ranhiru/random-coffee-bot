const { App } = require('@slack/bolt');

const SLACK_BOT_TOKEN = process.env.SLACK_BOT_TOKEN;
const SLACK_SIGNING_SECRET = process.env.SLACK_SIGNING_SECRET;

var app = new App({
    token: SLACK_BOT_TOKEN,
    signingSecret: SLACK_SIGNING_SECRET
});

async function getChannelsBotIsPartOf() {
   const response = await app.client.users.conversations({ token: process.env.SLACK_BOT_TOKEN });

   return response.channels.map((channel) => {
       return {
         "id": channel.id,
         "name": channel.name
       }
   });
}

async function getMemembersInChannel(channel) {
   const response = await app.client.conversations.members({
     channel: channel,
     token: SLACK_BOT_TOKEN,
   });
   return response.members;
}

async function getBotUserId() {
    const response = await app.client.auth.test({ token: SLACK_BOT_TOKEN });
    return response.user_id;
}

function postMessage(channel, text) {
    return app.client.chat.postMessage({
      channel: channel,
      text: text,
      token: SLACK_BOT_TOKEN
    });
}

module.exports = {
  getChannelsBotIsPartOf: getChannelsBotIsPartOf,
  getBotUserId: getBotUserId,
  postMessage: postMessage,
  getMemembersInChannel: getMemembersInChannel
};
