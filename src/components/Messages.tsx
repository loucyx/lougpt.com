import { isUndefined } from "@coven/predicates";
import type { JSX } from "preact";
import { useMessages } from "../hooks/useMessages.ts";
import { scrollIntoView } from "../utils/scrollIntoView.ts";

/**
 * Message list display.
 */
export const Messages = (): JSX.Element | ReadonlyArray<JSX.Element> => {
	const messages = useMessages();

	return (
		messages?.map(({ message, timestamp, user }) => (
			<p
				aria-label={`Message from ${user}`}
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
		)) ?? (
			<aside>
				<h1>
					<span aria-hidden="true">👋</span> Hi there!
				</h1>
				<p>
					<strong>
						<img src="/favicon.svg" aria-hidden="true" />
						<span>LouGPT</span>
					</strong>{" "}
					is a Chatbot with the following features:
				</p>
				<ul>
					<li>
						<strong>
							<span aria-hidden="true">⚡️</span>Fast:
						</strong>
						You get an instant answer as soon as you send your
						message.
					</li>
					<li>
						<strong>
							<span aria-hidden="true">🤞</span>Honest:
						</strong>
						No hallucinations, no lies.
					</li>
					<li>
						<strong>
							<span aria-hidden="true">🔐</span>Private:
						</strong>
						No data is sent to the server, the chat is only stored
						locally. No analytics.
					</li>
					<li>
						<strong>
							<span aria-hidden="true">🌎</span>Accessible:
						</strong>
						Available everywhere, where you have a browser, that is.
					</li>
				</ul>
			</aside>
		)
	);
};
