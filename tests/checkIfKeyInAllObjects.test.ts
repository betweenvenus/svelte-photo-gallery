import { checkIfKeyInAllObjects } from "../src/util";

describe.each([]);

describe("checkIfKeyInAllObejcts(arr: obj[], key: string)", () => {
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
	test("returns true if key exists on all objects", () => {
		expect(() => checkIfKeyInAllObjects(data, "type")).toThrow();
		expect(() => checkIfKeyInAllObjects(data, "name")).toBeTruthy();
	})
});
