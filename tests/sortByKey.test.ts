import { sortByKey } from "../src/util";

describe("util/sortByKey()", () => {
  test("should return the array of objects sorted by the specified key", () => {
    const dummy = [
      {
        name: "Albert",
        title: "President",
        hobby: "Fishing",
      },
      {
        name: "Xavier",
        title: "Janitor",
        hobby: "Basketball",
      },
      {
        name: "John",
        title: "Director of Psyops",
        hobby: "Ice Skating",
      },
      {
        name: "Alfonso",
        title: "Student",
        hobby: "Swing Dancing",
      },
    ];

    const expected = [
      {
        name: "Albert",
        title: "President",
        hobby: "Fishing",
      },
      {
        name: "Alfonso",
        title: "Student",
        hobby: "Swing Dancing",
      },
      {
        name: "John",
        title: "Director of Psyops",
        hobby: "Ice Skating",
      },

      {
        name: "Xavier",
        title: "Janitor",
        hobby: "Basketball",
      },
    ];

    expect(sortByKey(dummy, "name")).toEqual(expected);
  });

  test("should work with a numerical key as well", () => {
    const dummy = [
      { id: 1, foo: "stuff" },
      { id: 29, foo: "blah blah blah" },
      { id: 82398, foo: "really big number" },
      { id: 2, foo: "testing" },
      { id: 264, foo: "big number" },
      { id: 99, foo: "number is 99" },
    ];

    const expected = [
      { id: 1, foo: "stuff" },
      { id: 2, foo: "testing" },
      { id: 29, foo: "blah blah blah" },
      { id: 99, foo: "number is 99" },
      { id: 264, foo: "big number" },
      { id: 82398, foo: "really big number" },
    ];
    expect(sortByKey(dummy, "id")).toEqual(expected);
  });

  test("must only take an array of objects as its first argument", () => {
    /**
     * paranoid about sortByKey() being called with broken input,
     * disable type checking here:
     * @ts-ignore */
    expect(() => sortByKey("foo", "bar")).toThrow();
  });

  test("all elements of arr must have `key` in common", () => {
    const dummy = [
      { foo: "foo", bar: "bar" },
			{ foo: "foo trinity", baz: "nope"},
      { foo: "foo 2", bar: "bar dos" },
    ];

    const expected = [
      { foo: "foo", bar: "bar" },
      { foo: "foo 2", bar: "bar dos" },
			{ foo: "foo trinity", baz: "nope"}
    ];
		
    expect(() => sortByKey(dummy, "bar")).toThrow();
    expect(() => sortByKey(dummy, "baz")).toThrow();
    expect(sortByKey(dummy, "foo")).toEqual(expected);
  });

	test("must throw an error if given no arguments", () => {
		// @ts-ignore
		expect(() => sortByKey()).toThrow();
	})

	// not passing but not sure why
	test("must sort by first prop of arr[0] if key is not specified or falsy", () => {
		// ... also logs a warning if key is omitted
    const dummy = [
      { foo: "foo", bar: "bar" },
			{ foo: "foo trinity", baz: "nope"},
      { foo: "foo 2", bar: "bar dos" },
    ];

    const expected = [
      { foo: "foo", bar: "bar" },
      { foo: "foo 2", bar: "bar dos" },
			{ foo: "foo trinity", baz: "nope"}
    ];
		//@ts-ignore
		expect(sortByKey(dummy)).toEqual(expected);
		expect(sortByKey(dummy, undefined, "asc")).toEqual(expected);
	})

	test("must support nested properties", () => {

	})
});
