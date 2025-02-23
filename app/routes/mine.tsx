import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getDefaultSettings } from "http2";
import { requireUserId, knigi, getUserDatas } from "~/utils/session.server";
import type { BookInterface } from "~/utils/textStore";
import type { User, SettingsInterface, UserData } from "~/utils/User";
import getUserStore from "~/utils/userStore";
import globalLargeStylesUrl from "~/styles/global-large.css";
import globalMediumStylesUrl from "~/styles/global-medium.css";
import globalStylesUrl from "~/styles/global.css";
import bootstrapStyles from "~/styles/bootstrap.css";
import { cssBundleHref } from "@remix-run/css-bundle";
import stylesUrl from "~/styles/index.css";
import RenderBooks from "~/components/renderBooks";
import { Container, Row, Col } from "react-bootstrap";
import MenuForHome from "~/components/home.menu";
import Title from "~/components/title";
import RenderAuthorBooks from "~/components/renderAuthorBooks";
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
    if (user) {
      const searchParams = new URL(request.url).searchParams;
      const knigite = await knigi(a, searchParams.get("query"));
      return [user, knigite[0], user.settings ?? getDefaultSettings()];
    }
  }
  return redirect("/login?redirectTo=" + request.url);
};
type loaderType = [User, BookInterface[], SettingsInterface] | null;
export default function AllBooksRoute() {
  const loader = useLoaderData<loaderType>();
  if (loader) {
    var [user, books, settings] = loader;
  } else return;

  return (
    <Container fluid className="bg-intro ">
      <Row>
        <Col>
          <MenuForHome
            //@ts-ignore
            user={user}
            settings={settings}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Title />
        </Col>
      </Row>
      <Row>
        <Col>
          <RenderAuthorBooks books={books} dataInThem={user.data} />
        </Col>
      </Row>
    </Container>
  );
}
