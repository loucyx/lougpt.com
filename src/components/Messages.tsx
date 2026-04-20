import { isUndefined } from "@coven/predicates";
import type { JSX } from "preact";
import { useMessages } from "../hooks/useMessages.ts";
import { scrollIntoView } from "../utils/scrollIntoView.ts";

/**
 * Message list display.
 */
export const Messages = (): ReadonlyArray<JSX.Element> => {
	const messages = useMessages();

	return messages.map(({ message, timestamp, user }) => (
		<p
			class={`${user}-message`}
			data-timestamp={timestamp}
			ref={scrollIntoView}
		>
			{message.content}
			{isUndefined(message.link) ?
				undefined
			:	<>
					{" "}
					<a
						rel="noopener noreferrer"
						target="_blank"
						{...message.link}
					/>
				</>
			}
		</p>
	));
};
