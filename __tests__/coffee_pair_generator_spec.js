const { generateRandomCoffeePairMessage, chunkInToGroups } = require("../lib/coffee_pair_generator.js");

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

describe("chunkInToGroups", function() {
  it("will create chunks with equal numbers number of members", function() {
    const members = [ "John", "Craig", "Mary", "Mark"];

    const membersPerGroup = 2;
    const pairs = chunkInToGroups(members, membersPerGroup);
    expect(pairs.length).toEqual(2)

    expect(pairs[0]).toEqual(["John", "Craig"])
    expect(pairs[1]).toEqual(["Mary", "Mark"])
  });

  it("will combine a group with odd number of members with the last group if the groups are not the same size", function() {
    const members = [ "John", "Craig", "Mary", "Mark", "Duncan", "Stu", "Brett"];

    const membersPerGroup = 3;
    const pairs = chunkInToGroups(members, membersPerGroup);

    expect(pairs.length).toEqual(2)

    expect(pairs[0]).toEqual(["John", "Craig", "Mary"])
    expect(pairs[1]).toEqual(["Mark", "Duncan", "Stu", "Brett"])
  });
})
