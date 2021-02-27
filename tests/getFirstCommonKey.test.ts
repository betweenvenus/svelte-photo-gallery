import { getFirstCommonKey } from "../src/util";

describe("getFirstCommonKey(arr: object[]): string", () => {
  const data = [
    {
      name: "Jon",
      id: 1337,
      career: "web developer",
      company: "Mopdog",
    },
    {
      type: "fruit",
      flavor: "delicious",
      name: "Grapes",
      color: "purple",
      price: 5.99,
    },
    {
      isVideoGame: true,
      genre: "Roguelike",
      availableOnPC: true,
      score: 100,
      rating: "teen",
      name: "Hades",
    },
  ];
	test("should detect a common key among all elements of array", () => {
		expect(getFirstCommonKey(data)).toEqual("name");
	})
})