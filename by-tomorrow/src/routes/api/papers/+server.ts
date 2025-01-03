import { json } from "@sveltejs/kit";
import { db } from "$lib/database";

export async function GET(event) {
    const paperMetadata = await db.paperMetadata.findMany();
    return json(paperMetadata);
}