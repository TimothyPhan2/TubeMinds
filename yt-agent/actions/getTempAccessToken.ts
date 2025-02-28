"use server";

import { currentUser } from "@clerk/nextjs/server";
import { SchematicClient } from "@schematichq/schematic-typescript-node";

const apiKey = process.env.SCHEMATIC_SECRET_KEY;
if (!apiKey) throw new Error("SCHEMATIC_SECRET_KEY is missing");
const client = new SchematicClient({ apiKey });


export default async function getTempAccessToken() {
  const user = await currentUser();

  if (!user) return null;

  const res = await client.accesstokens.issueTemporaryAccessToken({
    resourceType: "company",
    lookup: {
        id: user.id
    }
  })
  console.log("res= ", res.data.token)
  return res.data.token
}
