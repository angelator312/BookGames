import type { LinksFunction } from "@remix-run/node";
import { Row, Col, Container, Button } from "react-bootstrap";
import BookHeader from "~/components/bookHeader";
import type { BookInterface } from "~/utils/textStore";
import type { UserData } from "~/utils/User";
import globalLargeStylesUrl from "~/styles/global-large.css";
import globalMediumStylesUrl from "~/styles/global-medium.css";
import globalStylesUrl from "~/styles/global.css";
import bootstrapStyles from "~/styles/bootstrap.css";
import { cssBundleHref } from "@remix-run/css-bundle";
import stylesUrl from "~/styles/index.css";
import { Link } from "@remix-run/react";
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
export default function RenderBooks({
  books,
  dataInThem,
  lastNum = 0,
  toUrl = "",
}: {
  books: BookInterface[];
  dataInThem: UserData;
  lastNum?: number;
  toUrl?: string;
  searchUnit?: boolean;
}) {
  let oshte0 = false;
  let myBooks = books;
  if (lastNum > 0) {
    // useEffect(() => {
    if (books.length > lastNum) {
      myBooks = books.slice(0, lastNum);
      oshte0 = true;
    }
  }

  return (
    <Container fluid className=" bg-opacity-25 rounded-3 p-3">
      <Row>
        <Col>
          <div className="bg-white bg-opacity-25 rounded-3 p-3">
            {myBooks.map((e, i) => (
              <Row key={i}>
                <Col>
                  <BookHeader authorData={dataInThem} e={e} avt={true} />
                </Col>
              </Row>
            ))}
            {myBooks.length == 0 ? (
              <a href="/newBook">
                <Button variant="outline-primary" className="text-sm">
                  Тук Няма Никой,Създай книга:
                </Button>
              </a>
            ) : null}
            {oshte0 ? (
              <Row>
                <Col>
                  <Link to={toUrl}>
                    <Button variant="outline-primary" className="text-sm">
                      Виж всички
                    </Button>
                  </Link>
                </Col>
              </Row>
            ) : null}
          </div>
        </Col>
      </Row>
    </Container>
  );
}
