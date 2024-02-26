import type { LinksFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  redirect,
  useLocation,
  useNavigate,
  useRouteError,
} from "@remix-run/react";
import { cssBundleHref } from "@remix-run/css-bundle";
// import globalLargeStylesUrl from "~/styles/global-large.css";
// import globalMediumStylesUrl from "~/styles/global-medium.css";
// import globalStylesUrl from "~/styles/global.css";
import bootstrapStyles from "bootstrap/dist/css/bootstrap.css";
import myStyles from "~/styles/myStyle.css";
import { Button } from "react-bootstrap";
// import styles from "./tailwind.css";
export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
  { rel: "stylesheet", href: myStyles },
  { rel: "stylesheet", href: bootstrapStyles },
  // { rel: "stylesheet", href: globalStylesUrl },
  // {
  //   rel: "stylesheet",
  //   href: globalMediumStylesUrl,
  //   media: "print, (min-width: 640px)",
  // },
  // {
  //   rel: "stylesheet",
  //   href: globalLargeStylesUrl,
  //   media: "screen and (min-width: 1024px)",
  // },
  // { rel: "stylesheet", href: styles },
];

export const action = async () => {
  return redirect("/");
};

export default function App() {
  const location = useLocation();
  // console.log(location);
  return (
    <html
      lang="en"
      className="bg-smkW"
    >
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>BookGames Книги игри</title>
        <Links />
        <Scripts />
      </head>
      <body className={location.pathname == "/" ? "bg-intro" : "bg-smkW"}>
        <Outlet />
        <LiveReload />
      </body>
    </html>
  );
}
export function ErrorBoundary() {
  const error = useRouteError();
  const navigate = useNavigate();
  console.error(error);
  return (
    <html>
      <head>
        <title>Oh no!</title>
        <Meta />
        <Links />
      </head>
      <body>
        Нещо се обърка!
        <Button variant="success" onClick={() => navigate(-1)}>
          Върни се назад
        </Button>
        {/* add the UI you want your users to see */}
        <Scripts />
      </body>
    </html>
  );
}
