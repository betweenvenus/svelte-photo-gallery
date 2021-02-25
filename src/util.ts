enum FilterMode {
	Market = "MARKET",
	Name = "NAME",
	Style = "STYLE"
}

export { FilterMode };

const sortByKey = (arr: Array<object>, key: string, direction: "asc" | "desc"): object[] => {
	return [...arr].sort((a, b) => (a[key] > b[key]) ? 1 : -1);
	// return [{}];
}

export { sortByKey };

// const groupByKey;

const fetchData = async (urls: string[]) => {
	try {
		const reqs = urls.map(url => fetch(url).then(res => res.json()));
		const data = await Promise.all(reqs);
		return data;
	} catch(error) {
		throw new Error(error);
	}
}

export { fetchData };
