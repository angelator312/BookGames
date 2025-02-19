import { Row, Col } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import { propertiesForColumnsWidth } from "~/utils/columnStyles";

export default function RenderText({ texts }: { texts: string[] }) {
  return (
    <div className="chapter-text">
      {texts.map((e, i) => (
        <Row key={e + i}>
          <Col {...propertiesForColumnsWidth}>
            <ReactMarkdown>{e}</ReactMarkdown>
          </Col>
        </Row>
      ))}
    </div>
  );
}
