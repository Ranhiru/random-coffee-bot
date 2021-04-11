const { generateMessageForGroup } = require('../lib/coffee_pair_generator.js');

describe("generateMessageForGroup", function () {
  it("will generate a message with the given index and groups", function() {
    expect(generateMessageForGroup(1, ["John", "James"])).toEqual("1. <@John> and <@James> \n");
  });
});
