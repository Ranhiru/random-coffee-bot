const { generateMessageForGroup, generateRandomCoffeePairMessage } = require("../lib/coffee_pair_generator.js");

describe("generateRandomCoffeePairMessage", () => {
  it("will generate a message with the pairs", () => {
    const pairs = [
      ["John", "Jude"],
      ["Mary", "Mark"]
    ];

    const coffeePairMessage = generateRandomCoffeePairMessage(pairs);

    expect(coffeePairMessage).toContain("This weeks random coffees are:");
    expect(coffeePairMessage).toContain(`1. <@John> and <@Jude>`);
    expect(coffeePairMessage).toContain(`2. <@Mary> and <@Mark>`);
  });
});
