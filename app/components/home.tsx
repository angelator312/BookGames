import { useSearchParams } from "@remix-run/react";
import type { BookInterface } from "~/utils/textStore";
// import { HydrationProvider, Server } from "react-hydration-provider";
import NavYesOrNo from "./navbarYes";
import { Col, Container, Row } from "react-bootstrap";
import MenuForHome from "./home.menu";
import type { SettingsInterface, User, UserData } from "~/utils/User";
import Title from "./title";
import SubTitle from "./subtitle";
import RenderBooks from "./renderBooks";
import RenderAuthorBooks from "./renderAuthorBooks";

export default function Home({
  user,
  books,//my and other's books
  settings,
  dataMy,
  dataNotMine,
}: {
  settings: SettingsInterface;
  user: User;
  books: BookInterface[][];
  dataMy: UserData;
  dataNotMine: UserData[];
}) {
  // const userId = useLoaderData<string>();
  let myBooks = books[0];
  let otherBooks = books[1];
  // useEffect(() => {

  // },[books]);

  const [searchParams, setSearchParams] = useSearchParams();
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
    <Container fluid>
      {/* <div className="py-8 px-8 max-w-sm mx-auto bg-white rounded-xl  space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6"> */}
      <NavYesOrNo
        text={err ?? ""}
        yes={false}
        f={(a: any) =>
          setSearchParams((prev) => {
            if (errCode) prev.set("errCode", "");
            if (err && !errCode) prev.set("err", "");
            return prev;
          })
        }
      />
      {/* <div className="m-l-15%"> */}
      <Row>
        <Col>
          <Title />
        </Col>
      </Row>

      <Row>
        <Col>
          <MenuForHome
            user={user}
            settings={settings}
            logout={user.user == "Анонимен" ? false : true}
          />
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
          <RenderAuthorBooks
            books={myBooks}
            dataInThem={dataMy}
            lastNum={5}
            toUrl="/mine"
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Container fluid>
            <Row>
              <Col>
                <SubTitle title="Други книги" />
              </Col>
            </Row>
            <Row>
              <Col>
                <RenderBooks
                  books={otherBooks}
                  dataInThem={dataNotMine}
                  lastNum={5}
                  toUrl="/all"
                />
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </Container>
  );
}
