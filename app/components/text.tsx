import { Col, Container, Row } from "react-bootstrap";
import { Decoder } from "./decoder";
import { propertiesForColumnsWidth } from "~/utils/columnStyles";
import { DecoderAdvanced } from "./decoderAdvanced";
import { compileToString, VariableInterface } from "~/utils/User";

export default function Text({
  glava,
  furst2Lines,
  textLines,
  text2Lines: text2,
  flag1 = true,
  url,
  variables = {},
}: {
  glava: string | number;
  furst2Lines: string[];
  textLines: string[];
  text2Lines: string;
  flag1?: boolean;
  url: string;
  variables: { [key: string]: VariableInterface };
}) {
  console.log("vars:", variables);
  function compileToStringM(a: string) {
    return compileToString(a, variables);
  }
  return (
    <Container className="bg-i p-4" style={{ textIndent: 20 }}>
      <Row>
        <Col>
          <h2 className="">Глава {glava} </h2>
        </Col>
      </Row>
      <Row>
        <Col>
          <h2 className="p-3">{compileToStringM(furst2Lines[0])} </h2>
        </Col>
      </Row>

      <Row>
        <Col {...propertiesForColumnsWidth}>
          <p className="text-bold p-3 text-j in-2 ">
            {compileToStringM(furst2Lines[1])}
          </p>
        </Col>
      </Row>
      {textLines.map((e, i) => (
        <Row key={e + i}>
          <Col {...propertiesForColumnsWidth}>
            <p className="text-bold p-3 text-j in-2 "> {compileToStringM(e)}</p>
          </Col>
        </Row>
      ))}
      <Row>
        <Col>
          {!flag1 ? (
            <DecoderAdvanced
              text2={compileToStringM(text2)}
              url={url}
              flag1={flag1}
            />
          ) : (
            <Decoder text2={compileToStringM(text2)} url={url} flag1={flag1} />
          )}
        </Col>
      </Row>
    </Container>
  );
}
