import type { Maybe } from "@coven/types";
import { useBroadcast } from "@simulcast/preact";
import { registry } from "../broadcast.ts";
import { getResponse } from "../getResponse.ts";
import { useLocalStorage } from "./useLocalStorage.ts";

export type Message = Readonly<{
	message: {
		content: string;
		link?: Readonly<{ children: string; href: string }>;
	};
	timestamp: number;
	user: "bot" | "human";
}>;

/**
 * Hook to handle message submission and state for message listing.
 */
export const useMessages = (): Maybe<ReadonlyArray<Message>> => {
	const [messages, setMessages] = useLocalStorage<ReadonlyArray<Message>>(
		"messages",
		[],
	);
	const { onSubmit } = useBroadcast(registry);

	onSubmit((event) => {
		event.preventDefault();
		const form = event.currentTarget as HTMLFormElement;
		const { elements } = form as unknown as {
			elements: { message: HTMLInputElement };
		};
		const message = elements.message.value;

		if (message) {
			const timestamp = Date.now();
			const response = getResponse(message);

			setMessages((messages) => [
				...messages,
				{ message: { content: message }, timestamp, user: "human" },
				{ message: response, timestamp: timestamp + 1, user: "bot" },
			]);
			elements.message.value = "";
		}
	});

	return messages.length > 0 ? messages : undefined;
};
