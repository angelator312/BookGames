import { Row, Col, Card } from "react-bootstrap";
import book from "./book";
import RenderTextFrom1String from "./renderText2";
import Markdown from "react-markdown";

export default function BookIntro({
  smallDescription,
  urlForImage,
  avtor,
  avtorDesc: avtorDescription,
  bName,
  show = true,
}: {
  smallDescription: string;
  urlForImage: string;
  avtor: string;
  avtorDesc: string;
  bName: string;
  show?: boolean;
}) {
  if (!show) return null;
  return (
    <>
      <Row className="centered">
        <Col>
          <h1>
            {/* <a href={"/book/" + book.b.text} style={{ textDecoration: "none" }}> */}
            {bName}
            {/* </a> */}
          </h1>
        </Col>
      </Row>
      <Row sm="8" className="centered">
        <Col>
          {/* Za knigata */}
          <RenderTextFrom1String texts={smallDescription} />
        </Col>
        <Col sm="4" className="centered">
          {/* Za Avtora */}
          <Card>
            <Card.Img
              className="centered"
              style={{ width: "102px", height: "118px" }}
              src={urlForImage}
            />
            <Card.Body>
              <Card.Title>{avtor}</Card.Title>
              <Card.Text>
                <Markdown>{avtorDescription}</Markdown>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}
