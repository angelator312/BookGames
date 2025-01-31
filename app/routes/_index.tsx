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
import { getUserDatas, knigi, requireUserId } from "~/utils/session.server";
import { cssBundleHref } from "@remix-run/css-bundle";
import getUserStore from "~/utils/userStore";
import { getDefaultSettings } from "~/utils/User";
import type { User , SettingsInterface, UserData } from "~/utils/User";
import type { Book } from "~/utils/textStore";
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
      const knigite = await knigi(a, searchParams.get("query"));
      return [user,knigite, user.settings??getDefaultSettings(),await getUserDatas(knigite[1])];
    }
  }
  return redirect("/intro");
};
type loaderType=[User,Book[],SettingsInterface,UserData[]]|null;
export default function IndexRoute() {
  // console.log(1);
  const loader = useLoaderData<loaderType>();
  if(loader)
  {
    var [user, books, settings,dataNotMine] = loader;
    //console.log(books[1]);
    
  }
  
  return (
    <div>
      {loader ? (
        // @ts-ignore
        <Home dataMy={user.data} dataNotMine={dataNotMine} user={user} books={books} settings={settings} />
      ) : (
        <Intro />
      )}
    </div>
  );
}
