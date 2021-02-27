export default {
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+\\.svelte$": ["svelte-jester", {
			"preprocess": true
		}],
		"^.+\\.ts$": "ts-jest"
  },
  moduleFileExtensions: ["js", "ts", "svelte"],
};
