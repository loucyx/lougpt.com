import { randomSort } from "../utils/randomSort.ts";

const dayGrettings = {
	"good afternoon": "Good afternoon!",
	"good evening": "Good evening!",
	"good morning": "Good morning!",
} as const;

const greetingsArray = (
	[
		"",
		"Greetings!",
		"Hello there!",
		"Hello!",
		"Hey there!",
		"Hey!",
		"Heya!",
		"Hi!",
		"Hiya!",
		"Howdy!",
		"Salutations!",
		"Yo!",
	] as const
).toSorted(randomSort);

const greetings = Object.defineProperty(
	greetingsArray,
	greetingsArray.indexOf(""),
	{
		get(): string {
			const hours = new Date().getHours();

			return dayGrettings[
				hours < 12 ? "good morning"
				: hours < 18 ? "good afternoon"
				: "good evening"
			];
		},
	},
);

const greetingRegExp = [
	...greetings
		.slice(1)
		.map((greeting) => greeting.slice(0, -1).toLocaleLowerCase()),
	...Object.keys(dayGrettings),
].join("|");

let current = 0;

export const getGreeting = (input: string): string => {
	const [greeting] =
		new RegExp(
			String.raw`(?:^|\b)(?<greeting>${greetingRegExp})\b`,
			"i",
		).exec(input) ?? [];

	return greeting ?
			(dayGrettings[
				greeting?.toLocaleLowerCase() as keyof typeof dayGrettings
			] ?? greetings[current++ % greetings.length])
		:	"";
};
