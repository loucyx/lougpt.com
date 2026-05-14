import { render } from "preact";
import { emitSubmit } from "./broadcast.ts";
import { Messages } from "./components/Messages.tsx";

document.querySelector("form")?.addEventListener("submit", emitSubmit);

const output = document.querySelector("output") as HTMLOutputElement;

render(<Messages />, output);

if (!navigator.serviceWorker.controller) {
	navigator.serviceWorker.register("/sw.js");
}
