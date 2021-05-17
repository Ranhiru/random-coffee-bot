# Slack Random Coffee Bot

This is a simple Slack Bot that when added to a channel, generates a message pairing all channel members every Monday at 9 AM Australia Time (configurable)

# How does it work ?

Using serverless framework + Slack Bolt JS library, an AWS lambda function is creted that's triggered according to the cron expression in `serverless.yml` file.

The lambda function when invoked, checks all the channels it's invited to and for each one gathers the channel members, pairs them and generates a message with those pairs.

# How to Build

1. `yarn install`

# How run unit tests

1. `yarn test`

# Prerequisites

1. Create a Slack App (https://api.slack.com/apps?new_app=1)
1. Create a Bot user with the following scopes

`channels:join`  - Join public channels in a workspace - This is required so that the bot can be added to a channel

`channels:read` - View basic information about public channels in a workspace - This is required so the bot can find all the users in the channel

`chat:write` - Send messages as @random_coffee_bot - this allows the bot to send messages to the channel

# How to deploy

1. Get the Signing Secret and Bot User OAuth Token from the Slack app configuration page.
2. Set them as ENV vars
   1. `$ export SLACK_BOT_TOKEN=<slack bot token>` (starts with `xoxb-`)
   2. `$ export SIGNING_SECRET=<signing secret>`  
3. Setup AWS CLI (https://www.serverless.com/framework/docs/providers/aws/guide/credentials/)
4. Deploy using `$ npx serverless deploy`


# How to test the lambda function locally

1. Install the AWS CLI

1. Export 

1. Boot the the serverless framework offline 
`npx serverless offline`

1. Invoke the lambda function 
`aws lambda invoke /dev/null --endpoint-url http://localhost:3002 --function-name serverless-bolt-js-dev-slack`

# Shortcomings

1. The schedule of the message is configurable only by editing the cron expression in the serverless.yml
1. Doesn't use OAuth so it cannot be installed on other Slack workspaces. 
1. Limited testing
