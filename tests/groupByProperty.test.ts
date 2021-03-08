import { groupByKey } from "../src/util";

describe("groupByKey()", () => {
  test("should group an array of objects", () => {
    const dummy = [
      {
        name: "Jon",
        style: "cool",
      },
      {
        name: "Jack",
        style: "calm",
      },
      {
        name: "Martha",
        style: "calm",
      },
      {
        name: "Mindy",
        style: "excited",
      },
      {
        name: "Daniel",
        style: "loner",
      },
      {
        name: "Paul",
        style: "cool",
      },
    ];

    const expectedByName = [
      {
        D: [
          {
            name: "Daniel",
            style: "loner",
          },
        ],
      },
      {
        J: [
          {
            name: "Jack",
            style: "calm",
          },
          {
            name: "Jon",
            style: "cool",
          },
        ],
      },
      {
        M: [
          {
            name: "Martha",
            style: "calm",
          },
          {
            name: "Mindy",
            style: "excited",
          },
        ],
      },
      {
        P: [
          {
            name: "Paul",
            style: "cool",
          },
        ],
      },
    ];

    const expectedByStyle = [
      {
        calm: [
          {
            name: "Jack",
            style: "calm",
          },
          {
            name: "Martha",
            style: "calm",
          },
        ],
      },
      {
        cool: [
          {
            name: "Jon",
            style: "cool",
          },
          {
            name: "Paul",
            style: "cool",
          },
        ],
      },
      {
        excited: [
          {
            name: "Mindy",
            style: "excited",
          },
        ],
      },
      {
        loner: [
          {
            name: "Daniel",
            style: "loner",
          },
        ],
      },
    ];

     expect(groupByKey(dummy, "style")).toEqual(expect.arrayContaining(expectedByStyle));
  });

  test("should work with nested props like sortByKey", () => {
    const dummy = [
      {foo: "is an apple", baz: { fruit: "apple" } },
      {foo: "is a tomato", baz: { fruit: "tomato" } },
      {foo: "is a plum", baz: { fruit: "plum" } },
      {foo: "is another apple", baz: { fruit: "apple" } },
      {foo: "is a bitter melon", baz: { fruit: "bitter melon" } },
      {foo: "is a chestnut", baz: { fruit: "chestnut" } },
      {foo: "is another tomato", baz: { fruit: "tomato" } },
      {foo: "is an orange", baz: { fruit: "orange" } },
      {foo: "is a guava", baz: { fruit: "guava" } },
      {foo: "is yet another apple", baz: { fruit: "apple" } },
    ];

    const expected = [
      {
        apple: 
        [
          {foo: "is an apple", baz: { fruit: "apple" } },
          {foo: "is another apple", baz: { fruit: "apple" } },
          {foo: "is yet another apple", baz: { fruit: "apple" } },
        ],
        tomato: [
          {foo: "is a tomato", baz: { fruit: "tomato" } },
          {foo: "is another tomato", baz: { fruit: "tomato" } },
        ],
        plum: [
          {foo: "is a plum", baz: { fruit: "plum" } },
        ],
        "bitter melon": [
          {foo: "is a bitter melon", baz: { fruit: "bitter melon" } },
        ],
        chestnut: [
          {foo: "is a chestnut", baz: { fruit: "chestnut" } },
        ],
        orange: [
          {foo: "is an orange", baz: { fruit: "orange" } },
        ],
        guava: [
          {foo: "is a guava", baz: { fruit: "guava" } },
        ]
      }
    ];

    expect(groupByKey(dummy, "baz.fruit")).toEqual(expected);
  })
});
