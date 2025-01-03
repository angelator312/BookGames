import FormComponent from "./formComp";
import { Col, Container, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import type { Text } from "~/utils/textStore";

export default function BookHeader({
  e,
  avt = false,
}: {
  e: Text;
  avt?: boolean;
}) {
  if (!e) return;
  avt = !avt;
  return (
    <Container style={{ marginTop: "1rem" }}>
      <Row>
        <Col>
          <img src="/img/book.png" alt="Book" width={60} height={60} />
        </Col>
        <Col>
          <OverlayTrigger
            placement="right"
            overlay={<Tooltip>{e.text2}</Tooltip>}
          >
            <a href={`/book/${e.text}`}>
              <h3 className="text-bold text-dark">
                {e.id?.substring(5, e.id?.length - 3)}
              </h3>
            </a>
          </OverlayTrigger>
        </Col>
        <Col>
          <h4 className="text-bold text-dark">
            {/* <br /> */}
            Автор:
          </h4>
        </Col>
        <Col className="text-bold text-dark">{e.avtor}</Col>
        {/* <br /> */}
        <br />
      </Row>
      <Row>
        <Col className="text-center">
          <h3 className="centered  m-l-3">
            {e.public ? (
              ""
            ) : (
              // <form method="post" action={`/myBook/${e.text}/publish`}>
              //   <input className="bg-book-c" type="submit" value={"Publish"} />
              // </form>
              <FormComponent
                submitVariant="danger"
                textForSubmit="Publish"
                to={`/myBook/${e.text}/publish`}
              />
            )}
          </h3>
        </Col>
        <Col className="text-center">
          <h3 className="centered text-j text-slate-500 font-medium logo text-bold text-dark m-l-3">
            {avt ? (
              ""
            ) : (
              <FormComponent
                method="get"
                submitVariant="secondary"
                textForSubmit="Delete"
                to={`/delete/${e.text}/`}
              />
            )}
          </h3>
        </Col>
      </Row>
    </Container>
  );
}
