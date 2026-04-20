const options = { behavior: "smooth" } as const satisfies ScrollIntoViewOptions;

/**
 * Given an element, scorll it into view somoothly.
 */
export const scrollIntoView = (element: Element | null): void =>
	element?.scrollIntoView(options);
