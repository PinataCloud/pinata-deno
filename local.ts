import { pinata } from "./pinata.ts";

(async () => {
	const buffer = Deno.readFileSync("pinnie.png");
	const file = new File([buffer], "pinnie.png", { type: "image/png" });
	const upload = await pinata.upload.file(file);
	console.log(upload);
})();
