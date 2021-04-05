const { postRandomCoffeePairMessageToChannels } = require('./coffee_pair_generator.js');

const postMessageToChannel = async () => {
  try {
    await postRandomCoffeePairMessageToChannels();
  } catch (error) {
    console.error(error);
  }
};

// Handle the Lambda function event
module.exports.handler = postMessageToChannel;
