import { Row, Col, Card } from "react-bootstrap";
import book from "./book";
import RenderTextFrom1String from "./renderText2";
import Markdown from "react-markdown";
import { AuthorDescription } from "./authorDescription";
import { UserData } from "~/utils/User";

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
  avtorDesc: UserData;
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
          <AuthorDescription
            avtor={avtor}
            avtorData={avtorDescription}
          />
        </Col>
      </Row>
    </>
  );
}
