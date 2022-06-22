import createHandler from "next-connect";
import { ObjectId } from "mongodb";
import clientPromise from "@/modules/db";

export async function record(_id) {
  const record = await (await clientPromise)
    .db()
    .collection("collection-name")
    .findOne(ObjectId(_id));

  return record ? record : {};
}

const handler = createHandler();

handler.get(async (req, res) => {
  res.json({ _id: await record(req.query._id) });
});

export default handler;
