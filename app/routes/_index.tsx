import {
  redirect,
  type LinksFunction,
  type LoaderFunctionArgs,
} from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Home from "~/components/home";
import Intro from "~/components/intro";
import globalLargeStylesUrl from "~/styles/global-large.css";
import globalMediumStylesUrl from "~/styles/global-medium.css";
import globalStylesUrl from "~/styles/global.css";
import bootstrapStyles from "~/styles/bootstrap.css";
import stylesUrl from "~/styles/index.css";
import { knigi, requireUserId } from "~/utils/session.server";
import { cssBundleHref } from "@remix-run/css-bundle";
import getUserStore from "~/utils/userStore";
import { getDefaultSettings, SettingsInterface } from "~/utils/User";
import { User } from "~/utils/User";
import { Book } from "~/utils/textStore";
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
  const a = await requireUserId(request, false);
  // console.log(a);
  // console.log(await knigi(a));

  if (typeof a === "string") {
    const user = await (await getUserStore()).getUser(a);
    if(user)
    {
      const searchParams = new URL(request.url).searchParams;
      return [user, await knigi(a, searchParams.get("query")), user.settings??getDefaultSettings()];
    }
  }
  return null;
};
type loaderType=[User,Book[],SettingsInterface]|null;
export default function IndexRoute() {
  // console.log(1);
  const loader = useLoaderData<loaderType>();
  if(loader)
    var [user, books, settings] = loader;
  return (
    <div>
      {loader ? (
        // @ts-ignore
        <Home user={user} books={books} settings={settings} />
      ) : (
        <Intro />
      )}
    </div>
  );
}
