import compromise from "compromise";
import { randomSort } from "../utils/randomSort.ts";

export const imperativeResponses = (
	[
		<Gerund extends string>(gerund: Gerund) =>
			`Chatbots aren't good at ${gerund}. You should try ${gerund} yourself.` as const,
		<Gerund extends string>(gerund: Gerund) =>
			`I'm not exactly built for ${gerund}. You're better off ${gerund} that yourself.` as const,
		<Gerund extends string>(gerund: Gerund) =>
			`A chatbot ${gerund}? Bold choice. Try ${gerund} yourself.` as const,
		<Gerund extends string>(gerund: Gerund) =>
			`You really want a chatbot for ${gerund}? Go do the ${gerund} yourself.` as const,
		<Gerund extends string>(gerund: Gerund) =>
			`I'm going to save us both some trouble: don't use a chatbot for ${gerund}. Just do it yourself.` as const,
		<Gerund extends string>(gerund: Gerund) =>
			`Chatbots and ${gerund} don't mix well. You're better at ${gerund} than this thing is.` as const,
		<Gerund extends string>(gerund: Gerund) =>
			`Delegating ${gerund} to a chatbot is optimistic. Try ${gerund} yourself.` as const,
		<Gerund extends string>(gerund: Gerund) =>
			`I would not trust a chatbot with ${gerund}. You should take it from here.` as const,
		<Gerund extends string>(gerund: Gerund) =>
			`This feels like a terrible use of a chatbot. Go do the ${gerund} yourself.` as const,
		<Gerund extends string>(gerund: Gerund) =>
			`${gerund.replace(/./, (char) => char.toLocaleUpperCase())} is such a great thing to do yourself. Why let a chatbot take that from you?` as const,
	] as const
).toSorted(randomSort);

export const getImperative = (input: string): string =>
	compromise(input).verbs().isImperative().text().toLocaleLowerCase();

let current = 0;
export const imperativeResponse = (
	imperative: string,
): ReturnType<(typeof imperativeResponses)[number]> | "" => {
	// @ts-expect-error Types aren't great for `compromise`
	const [{ Gerund: gerund } = {}] =
		compromise(imperative).verbs().conjugate() ?? [];

	return (
		imperativeResponses[current++ % imperativeResponses.length]?.(gerund)
		?? ""
	);
};
