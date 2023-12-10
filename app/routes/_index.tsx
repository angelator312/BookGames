import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Home from "~/components/home";
import Intro from "~/components/intro";

import stylesUrl from "~/styles/index.css";
import { requireUserId } from "~/utils/session.server";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesUrl },
];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  return await requireUserId(request, false);
};

export default function IndexRoute() {
  const user = useLoaderData<string>();
  return <div>{user ? <Home user={user.toString()} /> : <Intro />}</div>;
}
