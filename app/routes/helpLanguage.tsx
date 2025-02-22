import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Col, Container, Row } from "react-bootstrap";
import FormComponent from "~/components/formComp";
import MenuForHome from "~/components/home.menu";
import { TabLang } from "~/components/TabLang";
import { requireUserId } from "~/utils/session.server";
import { getDefaultUser } from "~/utils/User";
import getUserStore from "~/utils/userStore";
export async function action() {
  return "";
}
export async function loader({ request }: LoaderFunctionArgs) {
  const a = await requireUserId(request, false);
  if (typeof a === "string") {
    const user = await (await getUserStore()).getUser(a);
    return { user: user ?? getDefaultUser() };
  }
  return { user: getDefaultUser() };
}
export default function Intro() {
    const {user} = useLoaderData<typeof loader>();

  return (
    <Container className=" bg-i">
      <MenuForHome settings={user.settings} user={user} />
      <Row className="text-center space-y-2 sm:text-left">
        <Col>
          <h1 className="text-slate-500 font-medium logo f-book-c p-3 line-height-1">
            Добре дошли в документацията на езика!
          </h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <TabLang />
        </Col>
      </Row>
      <Row>
        <Col sm="3">
          <FormComponent submitVariant="danger" to="/" textForSubmit="Начало" />
        </Col>
      </Row>
    </Container>
  );
}
