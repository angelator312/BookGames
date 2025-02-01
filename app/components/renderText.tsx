import { Row, Col } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import { propertiesForColumnsWidth } from "~/utils/columnStyles";

export default function RenderText({ texts }: { texts: string[] }) {
  return (
    <div>
      {texts.map((e, i) => (
        <Row key={e + i}>
          <Col {...propertiesForColumnsWidth}>
            {e.startsWith("image:") ? (
              <img src={"/getImage/" + e.split(":")[1]} alt="any" />
            ) : (
              <>
                <br />
                <ReactMarkdown>{e}</ReactMarkdown>
              </>
            )}
          </Col>
        </Row>
      ))}
    </div>
  );
}
