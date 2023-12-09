import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const loader = async () => {
  return json({
    sandwiches: [
      { id: 0, name: "Cheese" },
      { id: 1, name: "Tomatoes" },
    ], // await db.sandwich.findMany(),
  });
};

export default function Sandwiches() {
  const data = useLoaderData<typeof loader>();
  console.log(data);

  return (
    <ul>
      {data.sandwiches.map((sandwich) => (
        <li key={sandwich.id}>{sandwich.name}</li>
      ))}
    </ul>
  );
}
