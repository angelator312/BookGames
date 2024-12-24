import { redirect, type LinksFunction, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Home from "~/components/home";
import Intro from "~/components/intro";
import globalLargeStylesUrl from "~/styles/global-large.css";
import globalMediumStylesUrl from "~/styles/global-medium.css";
import globalStylesUrl from "~/styles/global.css";
import bootstrapStyles from "~/styles/bootstrap.css";
import stylesUrl from "~/styles/index.css";
import { knigi, loadSettings, requireUserId } from "~/utils/session.server";
import { cssBundleHref } from "@remix-run/css-bundle";
import { SettingsInterface } from "~/utils/userStore";
export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
  { rel: "stylesheet", href: bootstrapStyles },
  { rel: "stylesheet", href: globalStylesUrl },
  {
    rel: "stylesheet",
    href: globalMediumStylesUrl,
    media: "print, (min-width: 640px)",
  },
  {
    rel: "stylesheet",
    href: globalLargeStylesUrl,
    media: "screen and (min-width: 1024px)",
  },
  { rel: "stylesheet", href: stylesUrl },
];

export const action = async ({ request }: LoaderFunctionArgs) => {
  return redirect("/");
};


export const loader = async ({ request }: LoaderFunctionArgs) => {
  const a= await requireUserId(request, false);
  // console.log(a);
  // console.log(await knigi(a));
  
  if (typeof a ==="string") {
    const settings:SettingsInterface = await loadSettings(a);
    return [a,await knigi(a),settings];
  }
  return [0,0,0];
};

export default function IndexRoute() {
// console.log(1);
  const [user,books] = useLoaderData<typeof loader>();
  // @ts-ignore
  return <div >{user ? <Home user={user.toString()} books={books}/> : <Intro />}</div>;
}
