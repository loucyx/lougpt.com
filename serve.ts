import { serveDir } from "@std/http/file-server";
import { route } from "@std/http/unstable-route";

const isDev = Deno.args.includes("--dev");

Deno.serve(
	isDev ? { port: 3456 } : { port: 80 },
	route(
		[
			{
				pattern: new URLPattern({ pathname: "/*" }),
				handler: (request) => serveDir(request, { fsRoot: "./dist" }),
			},
		],
		() => new Response("Not found", { status: 404 }),
	),
);
