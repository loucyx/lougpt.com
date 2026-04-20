import { randomSort } from "../utils/randomSort.ts";

export const fallbackResponses = (
	[
		"I don't know what you want me to do with that information.",
		"Wonderful. A statement. Now what exactly am I supposed to do with that?",
		"Thanks for the information, I guess. You forgot the part where you wanted something.",
		"That sure was some input. Shame it didn't include a clear request.",
		"You've provided data, not direction.",
		"Okay. And your point is?",
		"Not to be difficult, but that doesn't give me anything useful to respond to.",
		"Interesting. Still no idea what you expect me to do with it.",
		"That's not a question, not a request, and not especially actionable.",
		"I received the words. The purpose, however, remains a mystery.",
	] as const
).toSorted(randomSort);

let current = 0;
export const fallbackResponse = (): string =>
	fallbackResponses[current++ % fallbackResponses.length] ?? "";
