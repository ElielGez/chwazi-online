export const randomSingle = (arr: any[], size: number) => {
	return arr.sort(() => Math.random() - Math.random()).slice(0, size);
};
export const randomGroups = (arr: any[], size: number) => {
	var shuffled = [...arr]; //make a copy so that we don't mutate the original array

	//shuffle the elements
	for (let i = shuffled.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
	}

	return splitArray(shuffled, size);
};
function splitArray(arr: any[], size: number) {
	const newArray: any[] = [];
	for (let c = 0; c < size; c++) {
		newArray.push([]);
	}
	for (let i = 0; i < arr.length; i++) {
		const mod = i % size;
		newArray[mod].push(arr[i]);
	}
	return newArray;
}
