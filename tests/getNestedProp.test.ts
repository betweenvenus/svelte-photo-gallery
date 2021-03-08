import { getProp } from '../src/util';

describe("getProp()", () => {
  const dummy: object = {
    foo: "bar",
    baz: {
      colors: {
        howMany: 6,
        howManyFavorites: 3,
        colorsArray: ["indigo", "plum", "kingly yellow"],
        nonColors: {
          darkest: "black",
          lightest: "white",
          otherNonColors: [
            {
              "animals": [
                {"mammals": ["gazelle", "human", "cat", "cheetah"]}
              ],
              "inanimateObjects": {
                ugliestObjects: { theWorst: "dropbox advertising" },
                coolestObjects: { theCoolest: [ { forReal: "deathscythe gunpla kit" } ] }
              }
            }
          ]
        }
      }
    }
  }

  test("Should return a top-level object property", () => {
    expect(getProp(dummy, "foo")).toEqual("bar");
  })
  test("Should return a nested object property", () => {
    expect(getProp(dummy, "baz.colors.howMany")).toEqual(6);
  });
  
  test("Should accept an array of strings too", () => {
    expect(getProp(dummy, ["baz", "colors", "howManyFavorites"])).toEqual(3)
  })

  test("Should work with nested arrays", () => {
    expect(getProp(dummy, "baz.colors.colorsArray.0")).toEqual("indigo");
  })
  
})
