import { fallbackResponse } from "./responses/fallback.ts";
import { getGreeting } from "./responses/greeting.ts";
import { getImperative, imperativeResponse } from "./responses/imperative.ts";
import { getQuestion, questionResponse } from "./responses/question.ts";

/**
 * Gets the response based on if it's only a greeting, or a question or an
 * order. If none of those applies, then it goes to a fallback message.
 */
export const getResponse = (
	input: string,
): Readonly<{
	content: string;
	link?: Readonly<{ children: string; href: string }>;
}> => {
	const trimmedInput = input.trim();
	const greeting = getGreeting(trimmedInput);
	const imperative = getImperative(trimmedInput);
	const question = getQuestion(trimmedInput);

	return {
		content: `${greeting ?? ""} ${
			imperative ? imperativeResponse(imperative)
			: question ? questionResponse(question).content
			: greeting ? ""
			: fallbackResponse()
		}`.trim(),
		...(!imperative && question ?
			{ link: questionResponse(question).link }
		:	undefined),
	};
};
