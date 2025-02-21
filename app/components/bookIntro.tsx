import { Row, Col, Card } from "react-bootstrap";
import book from "./book";
import RenderText2 from "./renderText2";
import ReactMarkdown from "react-markdown";

export default function BookIntro({
  smallDescription,
  urlForImage,
  avtor,
  avtorDesc,
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
          <RenderText2 texts={smallDescription} />
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
                <ReactMarkdown>{avtorDesc}</ReactMarkdown>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}
