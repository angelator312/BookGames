import { useSearchParams } from "@remix-run/react";
import type { BookInterface } from "~/utils/textStore";
// import { HydrationProvider, Server } from "react-hydration-provider";

import { Button, Col, Container, Row } from "react-bootstrap";
import { type UserData } from "~/utils/User";
import BookHeader from "~/components/bookHeader";
import SearchComponent from "~/components/Search";
import MenuForIntro from "~/components/intro.menu";
import Title from "~/components/title";
import SubTitle from "~/components/subtitle";
import RenderBooks from "./renderBooks";

// Note: This is a component that is used nowhere.
export default function AllBooksRoute({books,dataNotMine}:{books:BookInterface[][],dataNotMine:UserData[]}) {
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
        <Col>
          <Title />
        </Col>
      </Row>
      <Row>
        <Col>
          <MenuForIntro />
        </Col>
      </Row>
      {/* </div> */}
      <Row>
        <Col>
          <SubTitle />
        </Col>
      </Row>
      <Row>
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
                <SubTitle title="Други книги" />
              </Col>
            </Row>
            <Row>
              <Col>
                <SearchComponent />
              </Col>
            </Row>
            <Row>
              <Col>
              <RenderBooks books={otherBooks} dataInThem={dataNotMine} lastNum={5} />
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </Container>
  );
}
