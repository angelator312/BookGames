import { Col, Row } from "react-bootstrap";
import FormComponent from "~/components/formComp";
import { TabLang } from "~/components/TabLang";
export async function action() {
  return "";
}
export default function Intro() {
  //   const user = useLoaderData<string>();

  return (
    // <div className="text-center bg-intro">
    <Row className="text-center space-y-2 sm:text-left bg-i">
      <br />
      <br />
      <h1 className="text-slate-500 font-medium logo f-book-c p-3 line-height-1">
        Добре дошли в документацията на езика!
      </h1>
      {/* <Drop */}
      <TabLang />
      <br />
      <br />
      <Col sm="3">
      </Col>
      <Col sm="3">
        <FormComponent submitVariant="danger" to="/" textForSubmit="Начало" />
      </Col>
    </Row>
  );
}
