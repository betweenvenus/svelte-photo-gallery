import sortByKey from "../src/util";

describe("Sort array of objects by key", () => {
  test("sortByKey should return the array of objects sorted by the specified key", () => {
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
});
