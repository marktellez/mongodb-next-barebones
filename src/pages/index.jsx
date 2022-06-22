import clientPromise, { jsonify } from "@/modules/db";

export default function Homepage({ collection }) {
  return (
    <div className="mt-16 container mx-auto">
      {collection &&
        collection.length > 0 &&
        collection.map((record) => <div>{JSON.stringify(record)}</div>)}
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const collection = await (await clientPromise)
    .db()
    .collection("collection-name")
    .find({})
    .toArray();

  return {
    props: {
      collection: jsonify(collection),
    },
  };
}
