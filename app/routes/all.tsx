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
      return [
        user,
        knigite[1],
        user.settings ?? getDefaultSettings(),
        await getUserDatas(knigite[1]),
      ];
    }
  }
  return redirect("/login?redirectTo=" + request.url);
};
type loaderType = [User, BookInterface[], SettingsInterface, UserData[]] | null;
export default function AllBooksRoute() {
  const loader = useLoaderData<loaderType>();
  if (loader) {
    var [user, books, settings, dataNotMine] = loader;
  } else return;

  return (
    <Container fluid className="bg-intro ">
      <Row>
        <Col>
          <Title />
        </Col>
      </Row>

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
          <RenderBooks books={books} dataInThem={dataNotMine} />
        </Col>
      </Row>
    </Container>
  );
  // return (
  //   <Container fluid className="bg-intro ">
  //     <Row>
  //       <Col>
  //         <Title />
  //       </Col>
  //     </Row>

  //     <Row>
  //       <Col>
  //         <MenuForHome
  //           //@ts-ignore
  //           user={user}
  //           settings={settings}
  //         />
  //       </Col>
  //     </Row>
  //     <Row>
  //       <Col>
  //         <Container fluid className=" bg-opacity-25 rounded-3 p-3">
  //           <Row>
  //             <Col>
  //               <SearchComponent />
  //             </Col>
  //           </Row>
  //           <Row>
  //             <Col>
  //               <div>
  //                 {books.map((e, i) => (
  //                   <Row key={i}>
  //                     <Col>
  //                       <BookHeader authorData={dataNotMine[i]} e={e} />
  //                     </Col>
  //                   </Row>
  //                 ))}
  //                 {books.length <= 0 ? (
  //                   <h3 className="centered text-bold">Няма Резултати</h3>
  //                 ) : (
  //                   ""
  //                 )}
  //               </div>
  //             </Col>
  //           </Row>
  //         </Container>
  //       </Col>
  //     </Row>
  //   </Container>
  // );
}
