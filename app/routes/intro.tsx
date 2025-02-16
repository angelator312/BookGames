import { redirect, useLoaderData, useSearchParams } from "@remix-run/react";
import type { BookInterface } from "~/utils/textStore";
// import { HydrationProvider, Server } from "react-hydration-provider";

import { Button, Col, Container, Row } from "react-bootstrap";
import { type UserData } from "~/utils/User";
import BookHeader from "~/components/bookHeader";
import SearchComponent from "~/components/Search";
import MenuForIntro from "~/components/intro.menu";
import { getUserDatas, knigi, requireUserId } from "~/utils/session.server";
import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import globalLargeStylesUrl from "~/styles/global-large.css";
import globalMediumStylesUrl from "~/styles/global-medium.css";
import globalStylesUrl from "~/styles/global.css";
import stylesUrl from "~/styles/index.css";
import bootstrapStyles from "~/styles/bootstrap.css";
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

  if (typeof a !== "string") {
    const searchParams = new URL(request.url).searchParams;
    const knigite = await knigi("", searchParams.get("query"));
    return [knigite, await getUserDatas(knigite[1])];
  }
  return redirect("/");
};
type loaderType = [BookInterface[][], UserData[]];
export default function AllBooksRoute() {
  const loader = useLoaderData<loaderType>();
  let [books, dataNotMine] = loader;
  let oshte1 = false;
  let otherBooks = books[1];
  // useEffect(() => {

  if (books[1].length > 5) {
    otherBooks = books[1].slice(0, 5);
    oshte1 = true;
  }
  // const userId = useLoaderData<string>();
  // console.log(books[1], oshte1);

  const [searchParams] = useSearchParams();
  let err = searchParams.get("err");
  const errCode = searchParams.get("errCode");
  if (!err)
    switch (errCode) {
      case "1":
        err = `Книгата не е завършена!!!`;
        break;
      default:
        break;
    }
  return (
    <Container fluid className="bg-intro">
      {/* <div className="py-8 px-8 max-w-sm mx-auto bg-white rounded-xl  space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6"> */}
      {/* <div className="m-l-15%"> */}
      <Row>
        <Col style={{ marginTop: "1rem" }}>
          <h1 className="text-slate-500 font-medium logo f-book-c">
            Книги-игри
          </h1>
        </Col>
      </Row>

      <Row>
        <Col>
          <MenuForIntro />
        </Col>
      </Row>
      {/* </div> */}
      <Row className="mt-5">
        <Col>
          <div className="bg-white bg-opacity-25 rounded-3 p-3">
              <a href="/newBook">
                <Button variant="outline-primary" className="text-sm">
                  Тук Няма Никой,Създай книга:
                </Button>
              </a>
          </div>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col>
          <Container fluid className="bg-white bg-opacity-25 rounded-3 p-3">
            <Row>
              <Col>
                <SearchComponent />
              </Col>
            </Row>
            <Row>
              <Col>
                <div>
                  {otherBooks.map((e, i) => (
                    <Row key={i}>
                      <Col>
                        <BookHeader authorData={dataNotMine[i]} e={e} />
                      </Col>
                    </Row>
                  ))}
                  {otherBooks.length <= 0 ? (
                    <h3 className="centered text-bold">Няма Резултати</h3>
                  ) : (
                    ""
                  )}
                  {oshte1 ? (
                    <Row>
                      <Col>
                        <a href={"/all"}>
                          <Button variant="outline-primary" className="text-sm">
                            Виж всички
                          </Button>
                        </a>
                      </Col>
                    </Row>
                  ) : null}
                </div>
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </Container>
  );
}
