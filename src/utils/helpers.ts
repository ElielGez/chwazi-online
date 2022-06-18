export const contencateClassNames = (...classNames: string[]) => {
	const className = classNames
		// skips null, undefined, empty string...
		.filter(className => className)
		// join into a space separted string
		.join(' ');
	return className;
};
export const conditionalClassNames = (classNameConditions: { [key: string]: boolean }) => {
	const className = Object.entries(classNameConditions)
		// skip false classNames
		.filter(([className, condition]) => condition)
		// pick classNames only
		.map(([className, condition]) => className)
		// join into a space separted string
		.join(' ');
	return className;
};
