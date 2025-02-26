import { LoaderFunctionArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { Button, Col, Container, Row } from "react-bootstrap";
import MenuForHome from "~/components/home.menu";
import Title from "~/components/title";
import { getUserId } from "~/utils/session.server";
import { User } from "~/utils/User";
import getUserStore from "~/utils/userStore";

type loaderType = User;
export async function loader({ request }: LoaderFunctionArgs) {
  const uId = await getUserId(request);
  if (uId) {
    return (await (await getUserStore()).getUser(uId)) ?? { user: "Анонимен" };
  }
  return { user: "Анонимен" };
}
export default function Things() {
  const user = useLoaderData<loaderType>();

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
            logout={user.user == "Анонимен" ? false : true}
            user={user}
            settings={user.settings}
          />
        </Col>
      </Row>
      <Row className="mt-2 centered">
        <Col>
          <Link
            to={
              "https://docs.google.com/presentation/d/198ELmNwV5gInhQyycpcBN4toZyGzpGJ2"
            }
          >
            <Button>Презентация</Button>
          </Link>
        </Col>
      </Row>
      <Row className="mt-2 centered">
        <Col>
          <Link
            to={
              "https://docs.google.com/document/d/1f5wmE5bGNjTiJduTt4n3mLBRrLPHZxlk"
            }
          >
            <Button>Документация</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
}
