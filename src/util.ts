enum FilterMode {
  Market = "MARKET",
  Name = "NAME",
  Style = "STYLE",
}

export { FilterMode };

const getFirstKeyOfObject = (obj: object | object[]): string => {
  if (!obj)
    throw new Error("getFirstKeyOfObject was called without an argument");
  else if (Array.isArray(obj)) {
    return obj[0][Object.keys(obj[0])[0]];
  } else if (typeof obj === "object") {
    return obj[Object.keys(obj)[0]];
  } else {
    throw new Error(
      "getFirstKeyOfObject must be called with an object or an array of objects!"
    );
  }
};

// Iterates through an array of objects and returns the first
// key common to all objects in the array, if there are any.
const getFirstCommonKey = (arr: object[]): string => {
  for (const obj of arr) {
    for (const key in obj) {
      if (checkIfKeyInAllObjects(arr, key)) return key;
    }
  }
};

const isObject = (o) => typeof o === "object";

export { getFirstCommonKey };

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

const sortByKeyCallback = (key: string) => {
  return (a: object, b: object): number => {
    return a[key] > b[key] ? 1 : -1;
  };
};

const prepareSortedArray = (arr: any[], direction?: Direction): any[] => {
  if (direction === "desc") {
    return [...arr].reverse();
  } else {
    return [...arr];
  }
};

const accessNestedProps = (obj, key) => {
    return key.split(".").reduce((o, x) => {
        return (typeof o == "undefined" || o === null) ? o : o[x];
    }, obj);
}

export { accessNestedProps };

export { prepareSortedArray };

/**
 * TODO: Add timeout
 */

/**
 * Sorts an array of objects by a common key in ascending or descending
 * order. If $key is omitted, the array is searched until:
 *  - the first common key of all objects in the array is detected
 *  - nothing is found, throwing an error
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
  key: string | string[],
  direction?: Direction
): object[] => {
  if (Array.isArray(arr) && !key && arr.every((o) => isObject(o))) {
    const defaultKey: string = getFirstCommonKey(arr);
    return prepareSortedArray(
      [...arr].sort(sortByKeyCallback(defaultKey)),
      direction
    );
  } else if (Array.isArray(arr) && arr.every((o) => isObject(o) && key in o)) {
    return prepareSortedArray([...arr].sort(sortByKeyCallback(key)), direction);
  } else {
    throw new Error(
      "FLAGRANT SYSTEM ERROR: sortByKey's first argument must be \
		an array of objects with a common key."
    );
  }
};

export { sortByKey };

// const groupByKey;

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
