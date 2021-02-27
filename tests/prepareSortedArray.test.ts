import { prepareSortedArray } from "../src/util";

describe("prepareSortedArray(arr: object[], direction: Direction): object[]", () => {
	const data = [1, 2, 3, 4, 5, 6];
	test("should just return the array if direction isn't specified", () => {
		expect(prepareSortedArray(data)).toEqual(data);
	})
	test("should reverse array if direction is 'desc'", () => {
		expect(prepareSortedArray(data, "desc")).toEqual(data.reverse());
	})
});
