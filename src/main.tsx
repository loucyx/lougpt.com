import { render } from "preact";
import { emitSubmit } from "./broadcast.ts";
import { Messages } from "./components/Messages.tsx";

document.querySelector("form")?.addEventListener("submit", emitSubmit);

const main = document.querySelector("main") as HTMLElement;

render(<Messages />, main);

if (!navigator.serviceWorker.controller) {
	navigator.serviceWorker.register("/sw.js");
}
