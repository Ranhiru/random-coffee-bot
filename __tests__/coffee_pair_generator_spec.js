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
  it("will create chunks with equal number of members", function() {
    const members = [ "John", "Craig", "Mary", "Mark"];

    const membersPerGroup = 2;
    const groups = chunkInToGroups(members, membersPerGroup);
    expect(groups.length).toEqual(2)

    expect(groups[0]).toEqual(["John", "Craig"])
    expect(groups[1]).toEqual(["Mary", "Mark"])
  });

  it("will combine the group with odd number of members with the last group if the groups are not the same size", function() {
    const members = [ "John", "Craig", "Mary", "Mark", "Duncan", "Stu", "Brett"];

    const membersPerGroup = 3;
    const groups = chunkInToGroups(members, membersPerGroup);

    expect(groups.length).toEqual(2)

    expect(groups[0]).toEqual(["John", "Craig", "Mary"])
    expect(groups[1]).toEqual(["Mark", "Duncan", "Stu", "Brett"])
  });

  it("will not attempt to chunk when the list is smaller than the number of elements per group", function() {
    const members = ["John", "Craig"];
    const membersPerGroup = 4;
    const groups = chunkInToGroups(members, membersPerGroup);
    expect(groups.length).toEqual(1)
    expect(groups[0]).toEqual(["John", "Craig"])
  });

  it("will not attempt to chunk when the list size is equal to the number of elements per group", function() {
    const members = ["John"];
    const membersPerGroup = 1;
    const groups = chunkInToGroups(members, membersPerGroup);
    expect(groups.length).toEqual(1);
    expect(groups[0]).toEqual(["John"]);
  });
})
