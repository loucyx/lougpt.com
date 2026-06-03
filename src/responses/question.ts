import { memo } from "@coven/memo";
import compromise from "compromise";
import { randomSort } from "../utils/randomSort.ts";

export const questionResponses = (
	[
		"Chatbots tend to answer questions incorrectly. Try looking for",
		"You could ask a chatbot, if you enjoy being confidently misled. Better idea, look for",
		"That sounds like a question, which is exactly where chatbots get embarrassing. Search it yourself:",
		"I could pretend to know the answer, but let's be adults about this:",
		"Questions deserve better than synthetic guesswork. Start here:",
		"If accuracy matters even a little, don't ask a chatbot. Use this:",
		"Sure, a chatbot could answer that. Whether it answers correctly is a different matter. Try:",
		"That's a great way to get a polished wrong answer. Search for it instead:",
		"Rather than rolling the dice on chatbot nonsense, try this:",
		"I'm not saying a chatbot would make that up. I'm saying you should search:",
	] as const
).toSorted(randomSort);

export const getQuestion = (input: string): string => {
	const question = compromise(input).sentences().isQuestion().text();
	const compromisedQuestion = compromise(input);
	const peopleOrTopics =
		compromisedQuestion.people().text()
		|| compromisedQuestion.topics().text();
	const nouns = compromisedQuestion.nouns().text();

	return (
		question.match(/^who\s+/i) ?
			peopleOrTopics ? `${peopleOrTopics} Wikipedia`
			: nouns.match(/you/i) ? "What is a chatbot?"
			: nouns.match(/^i$/i) ? "How to know myself?"
			: question
		: question.match(/^what\s+(?:am|are|is|was|were)\b/i) ?
			peopleOrTopics ? `${peopleOrTopics} definition`
			: nouns.match(/you/i) ? "chatbot definition"
			: nouns.match(/^i$/i) ? "human being definition"
			: question
		: question.match(/what can you do/i) ? "How to be sarcastic?"
		: question
	);
};

let current = 0;
export const questionResponse = (
	q: string,
): Readonly<{
	content: string;
	link?: Readonly<{ children: string; href: string }>;
}> =>
	memo({
		content: questionResponses[current++ % questionResponses.length] ?? "",
		link: {
			children: `"${q}" in DuckDuckGo`,
			href: `https://noai.duckduckgo.com/?${new URLSearchParams({ q })}`,
		},
	});
