import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { requireUserId } from "~/utils/session.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await requireUserId(request);
  return json({
    sandwiches: [
      { id: 0, name: "Cheese" },
      { id: 1, name: "Tomatoes" },
    ], // await db.sandwich.findMany(),
  });
};

export default function Sandwiches() {
  const data = useLoaderData<typeof loader>();
  // console.log(data);

  return (
    <ul>
      {data.sandwiches.map((sandwich) => (
        <li key={sandwich.id}>{sandwich.name}</li>
      ))}
    </ul>
  );
}
