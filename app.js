const { App, ExpressReceiver } = require('@slack/bolt');
const serverlessExpress = require('@vendia/serverless-express');


const expressReceiver = new ExpressReceiver({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  // The `processBeforeResponse` option is required for all FaaS environments.
  // It allows Bolt methods (e.g. `app.message`) to handle a Slack request
  // before the Bolt framework responds to the request (e.g. `ack()`). This is
  // important because FaaS immediately terminate handlers after the response.
  processBeforeResponse: true
});

// Initializes your app with your bot token and signing secret
const app = new App({
  receiver: expressReceiver,
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});

app.message('hello', async ({ message, say }) => {
  await say(`Hello, <@${message.user}>`);
});

app.message('goodbye', async ({ message, say }) => {
  // say() sends a message to the channel where the event was triggered
  await say(`See ya later, <@${message.user}> :wave:`);
});

// Handle the Lambda function event
module.exports.handler = serverlessExpress({
  app: expressReceiver.app
});
