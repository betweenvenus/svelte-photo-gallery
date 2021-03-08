import { dataset_dev } from "svelte/internal";

enum FilterMode {
  Market = "MARKET",
  Name = "NAME",
  Style = "STYLE",
}

export { FilterMode };

// Iterates through an array of objects and returns the first
// key common to all objects in the array, if there are any.
// TODO: Support searching for nested props up to n levels deep
const getFirstCommonKey = (arr: object[]): string => {
  for (const obj of arr) {
    for (const key in obj) {
      if (checkIfKeyInAllObjects(arr, key)) return key;
    }
  }
};

export { getFirstCommonKey };

const isObject = (o) => typeof o === "object";

// Checks a single key against an array of objects
const checkIfKeyInAllObjects = (arr: object[], key: string): boolean => {
  if (!Array.isArray(arr) || !arr.every((o) => isObject(o))) {
    throw new Error("checkIfKeyInAllObjects was called improperly");
  } else if (arr.every((o) => key in o)) {
    return true;
  } else {
    throw new Error(`checkIfKeyInAllObjects(): ${key} not found`);
  }
};

export { checkIfKeyInAllObjects };

type Direction = "asc" | "desc";

const prepareSortedArray = (arr: any[], direction?: Direction): any[] => {
  if (direction === "desc") {
    return [...arr].reverse();
  } else {
    return [...arr];
  }
};

export { prepareSortedArray };

const nestedPropReducerCallback = (o, x): any => {
  return typeof o === "undefined" || o === null ? o : o[x];
};

/**
 * Returns a property from an object, with support for nested properties.
 *
 * @param {object} obj - The object to search in
 * @param {string | string[]} key - A string or array of strings representing the property you want to access.
 */
const getProp = (obj: object, key: string | string[]) => {
  if (typeof obj !== "object")
    throw new Error(
      "getNestedProp(obj: object, key: string | string[]): obj must be an object"
    );
  if (typeof key === "string") {
    return key.split(".").reduce(nestedPropReducerCallback, obj);
  } else if (Array.isArray(key)) {
    return key.reduce(nestedPropReducerCallback, obj);
  } else {
    throw new Error(`getNestedProp(obj: object, key: string | string[]) was called with an
    improper key. key must be a period-delimited string or an array of strings.`);
  }
};

export { getProp };

/**
 * TODO: Add timeout
 */

/**
 * Sorts an array of objects by a common key in ascending or descending
 * order. If key is omitted, sortByKey() looks to see if any *top-level*,
 * non-nested props of arr are common to all array members and if so,
 * sorts by that key.
 *
 * @example
 * const unsorted = [
 *  {name: "Jack", age: 42},
 *  {hobby: "ice hockey", name: "Jenny", goodAt: "Math"},
 *  {company: "Microsoft", salary: "way too much", name: "Chad"},
 * ];
 *
 * // Both return [{name: "Jack"...}, {name: "Jenny"...}, {name: "Chad"...}]
 * const sorted = sortByKey(unsorted, "name");
 * const sorted = sortByKey(unsorted); // Without $key, "name" is detected as common key.
 *
 * @param {object[]} arr An array of objects to be sorted by a common key
 * @param {string | string[]} [key] The key by which to sort the objects (alphabetically or numerically)
 * @param {Direction} [direction] Direction to sort in - "asc" for ascending, "desc" for
 * descending.
 * @returns {object[]} Sorted array
 * @throws {Error} Input value must be an array of objects
 */
const sortByKey = (
  arr: object[],
  key?: string | string[],
  direction?: Direction
): object[] => {
  const isArray = Array.isArray(arr);
  if (!isArray || (isArray && arr.length < 2))
    throw new Error(
      `sortByKey() was called incorrectly. Please provide an array of more than one object.
      input received:

      ********
      arr
      ********

      ${arr}

      ********
      obj
      ********

      ${key}
      `
    );

  const keyInObject = (k: string | string[], o: object): boolean => {
    const keyIsNestedProp: boolean =
      (typeof k === "string" && k.includes(".")) || Array.isArray(k);
    if (keyIsNestedProp) {
      const p = getProp(o, k);
      return typeof p !== "undefined" ? true : false;
    } else if (typeof k === "string") {
      return k in o;
    } else {
      throw new Error(
        "keyInObject(k: string | string[], o: object): boolean - was called with something bad"
      );
    }
  };
  const sortByKeyCallback = (key: string | string[]) => {
    return (a: object, b: object): number => {
      return getProp(a, key) > getProp(b, key) ? 1 : -1;
    };
  };

  const createSortedArray = (arr, key, direction?: Direction) => {
    return prepareSortedArray([...arr].sort(sortByKeyCallback(key)), direction);
  };

  if (!key && arr.every((o) => isObject(o))) {
    const defaultKey: string = getFirstCommonKey(arr);
    return prepareSortedArray(
      [...arr].sort(sortByKeyCallback(defaultKey)),
      direction
    );
  } else if (arr.every((o) => isObject(o) && keyInObject(key, o))) {
    return createSortedArray(arr, key, direction);
  } else if (!arr.every((o) => isObject(o))) {
    throw new Error(`
      sortByKey(arr: object[], key: string | string[], direction: "asc" | "desc"): object[]
      was called with an improper arr (not an array of objects). Double check your input.
    `);
  } else if (!arr.every((o) => keyInObject(key, o))) {
    throw new Error(`
      sortByKey(arr: object[], key: string | string[], direction: "asc" | "desc"): object[]
      was called with a key that could not be found on all objects in arr. Double check your
      input.
    `);
  } else {
    throw new Error(
      "FLAGRANT SYSTEM ERROR: sortByKey's first argument must be \
      an array of objects with a common key."
    );
  }
};

export { sortByKey };

interface GroupByOptions {
  type: "key" | "alphabetical";
}

/**
 * Groups elements of an array by some kind of property?
 * value of key could be string (alphabetical) or bool
 */
/*!
 * Group items from an array together by some criteria or value.
 * (c) 2019 Tom Bremmer (https://tbremer.com/) and Chris Ferdinandi (https://gomakethings.com), MIT License,
 * @param  {Array}           arr      The array to group items from
 * @param  {String|Function} criteria The criteria to group by
 * @return {Object}                   The grouped object
 */
var groupByKey = function (arr, criteria) {
	let grouped = arr.reduce(function (obj, item) {

		// Check if the criteria is a function to run on the item or a property of it
		var key = typeof criteria === 'function' ? criteria(item) : getProp(item, criteria);

		// If the key doesn't exist yet, create it
		if (!obj.hasOwnProperty(key)) {
			obj[key] = [];
		}

		// Push the value to the object
		obj[key].push(item);

		// Return the object to the next item in the loop
		return obj;

	}, {});


  // Return grouped object as an array
  return Object.keys(grouped).map(el => {
    return {
      [el]: grouped[el]
    }
  })

  // const asArray = [];

  // Object.keys(grouped).forEach(el => asArray.push({
  //   [el]: grouped[el]
  // }));

  // return asArray;
};

export { groupByKey };

const fetchData = async (urls: string[]) => {
  try {
    const reqs = urls.map((url) => fetch(url).then((res) => res.json()));
    const data = await Promise.all(reqs);
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export { fetchData };
