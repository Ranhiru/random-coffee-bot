const { App } = require('@slack/bolt');

// Initializes your app with your bot token and signing secret
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

const postMessageToChannel = async () => {
  try {
    const result = await app.client.chat.postMessage({
      channel: "random",
      text: "Hello from Random Coffee Bot!",
      token: process.env.SLACK_BOT_TOKEN
    });

    console.log(result);
  } catch (error) {
    console.error(error);
  }
};

// Handle the Lambda function event
module.exports.handler = postMessageToChannel;
