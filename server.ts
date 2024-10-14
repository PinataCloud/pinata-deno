import { pinata } from "./pinata.ts";

async function handler(req: Request): Promise<Response> {
	const path = new URL(req.url).pathname;

	if (path === "/") return new Response("Welcome to Deno!");

	if (req.method === "POST" && path === "/upload") {
		const data = await req.formData();
		const file = data.get("file") as File;
		if (!file) {
			return new Response("No file attached", { status: 400 });
		}
		const upload = await pinata.upload.file(file);
		return Response.json(upload);
	}

	return new Response("Path not found", { status: 404 });
}

Deno.serve(handler);
