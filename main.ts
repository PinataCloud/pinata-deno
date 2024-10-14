import { pinata } from "./pinata.ts";

async function handler(req: Request): Promise<Response> {
	const path = new URL(req.url).pathname;

	// respond with text/html
	if (path === "/") return new Response("Welcome to Deno!");

	// receive POST data from a form
	if (req.method === "POST" && path === "/upload") {
		const data = await req.formData();
		const file = data.get("file") as File;
		const upload = await pinata.upload.file(file);
		return Response.json(upload);
	}

	return new Response("Path not found", { status: 404 });
}

// To start the server on the default port, call `Deno.serve` with the handler.
Deno.serve(handler);
