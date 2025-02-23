import { Row, Col } from "react-bootstrap";
import Markdown from "react-markdown";
import { propertiesForColumnsWidth } from "~/utils/columnStyles";

export default function RenderText({ texts }: { texts: string[] }) {
  //{...propertiesForColumnsWidth}
  return (
    <div className="chapter-text">
      {texts.map((e, i) => (
        // <Row key={e + i}>
        //   <Col>
        <Markdown key={e+i}>{e}</Markdown>
        //   </Col>
        // </Row>
      ))}
    </div>
  );
}
