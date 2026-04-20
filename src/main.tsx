import { render } from "preact";
import { emitSubmit } from "./broadcast.ts";
import { Messages } from "./components/Messages.tsx";

document.querySelector("form")?.addEventListener("submit", emitSubmit);

render(<Messages />, document.querySelector("output") as HTMLOutputElement);

if (!navigator.serviceWorker.controller) {
	navigator.serviceWorker.register("/sw.js");
}
