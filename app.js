const { postRandomCoffeePairMessageToChannels } = require('./lib/coffee_pair_generator.js');

const postMessageToChannel = async () => {
  try {
    await postRandomCoffeePairMessageToChannels();
    console.log("Posting pairing message to channels complete");
  } catch (error) {
    console.error(error);
  }
};

// Handle the Lambda function event
module.exports.handler = postMessageToChannel;
