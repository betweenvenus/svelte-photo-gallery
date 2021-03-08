import { sortByKey } from "../src/util";

describe("sortByKey()", () => {
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

  test("should work with a numerical property as well", () => {
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
    // @ts-expect-error
    expect(() => sortByKey("foo", "bar")).toThrow();
  });

  test("all elements of arr must have `key` in common", () => {
    const dummy = [
      { foo: "foo", bar: "bar" },
      { foo: "foo trinity", baz: "nope" },
      { foo: "foo 2", bar: "bar dos" },
    ];

    expect(() => sortByKey(dummy, "bar")).toThrow();
    expect(() => sortByKey(dummy, "baz")).toThrow();
  });

  test("must throw an error if given no arguments", () => {
    // @ts-expect-error
    expect(() => sortByKey()).toThrow();
  });

  test("if key is ommitted, must sort objects by detecting a common, top-level key, if exists", () => {
    const dummy = [
      { foo: "foo", bar: "bar" },
      { foo: "foo trinity", baz: "nope" },
      { foo: "foo 2", bar: "bar dos" },
    ];

    const expected = [
      { foo: "foo", bar: "bar" },
      { foo: "foo 2", bar: "bar dos" },
      { foo: "foo trinity", baz: "nope" },
    ];
    expect(sortByKey(dummy)).toEqual(expected);
    expect(sortByKey(dummy, undefined, "asc")).toEqual(expected);
  });

  test("must throw an error if arr has one or less item", () => {
    const noItems = [];
    const oneItem = [{ shape: "rectangle" }];

    expect(() => sortByKey(noItems, "foo")).toThrow();
    expect(() => sortByKey(oneItem, "foo")).toThrow();
  });

  test("must support nested properties and arrays", () => {
    const dummy = [
      { foo: { bar: { baz: "carrot" } } },
      { foo: { bar: { baz: "apple" } } },
      { foo: { bar: { baz: "yucca root" } } },
      { foo: { bar: { baz: "eggplant" } } },
    ];

    const expected = [
      { foo: { bar: { baz: "apple" } } },
      { foo: { bar: { baz: "carrot" } } },
      { foo: { bar: { baz: "eggplant" } } },
      { foo: { bar: { baz: "yucca root" } } },
    ];

    const dummyWithArray = [
      {
        foo: {
          bar: [{ baz: "yellow" }],
        },
      },
      {
        foo: {
          bar: [{ baz: "pink" }],
        },
      },
      {
        foo: {
          bar: [{ baz: "aubergine" }],
        },
      },
    ];

    const expectedWithArray = [
      {
        foo: {
          bar: [{ baz: "aubergine" }],
        },
      },
      {
        foo: {
          bar: [{ baz: "pink" }],
        },
      },
      {
        foo: {
          bar: [{ baz: "yellow" }],
        },
      },
    ];

    expect(sortByKey(dummy, "foo.bar.baz")).toEqual(expected);
    expect(sortByKey(dummy, ["foo", "bar", "baz"])).toEqual(expected);
    expect(sortByKey(dummyWithArray, "foo.bar.0.baz")).toEqual(
      expectedWithArray
    );
    expect(sortByKey(dummyWithArray, ["foo", "bar", "0", "baz"])).toEqual(
      expectedWithArray
    );
  });

  test("should be able to return the array in ascending or descending order", () => {
    const dummy = [
      { foo: "foo", bar: { baz: "michael myers" } },
      { foo: "foo", bar: { baz: "jason voorhees" } },
      { foo: "foo", bar: { baz: "freddy kruger" } },
      { foo: "foo", bar: { baz: "chucky" } },
    ];
    const expected = [
      { foo: "foo", bar: { baz: "chucky" } },
      { foo: "foo", bar: { baz: "freddy kruger" } },
      { foo: "foo", bar: { baz: "jason voorhees" } },
      { foo: "foo", bar: { baz: "michael myers" } },
    ];
    const expectedDesc = [
      { foo: "foo", bar: { baz: "michael myers" } },
      { foo: "foo", bar: { baz: "jason voorhees" } },
      { foo: "foo", bar: { baz: "freddy kruger" } },
      { foo: "foo", bar: { baz: "chucky" } },
    ];
    expect(sortByKey(dummy, ["bar", "baz"])).toEqual(expected);
    expect(sortByKey(dummy, "bar.baz", "asc")).toEqual(expected);
    expect(sortByKey(dummy, ["bar", "baz"], "desc")).toEqual(
      expectedDesc
    );
  });
});
