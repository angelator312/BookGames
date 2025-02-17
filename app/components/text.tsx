import { Col, Container, Row } from "react-bootstrap";
import { Decoder } from "./decoder";
import { DecoderAdvanced } from "./decoderAdvanced";
import { compileToString } from "~/utils/User";
// const regImg = /=>\[(image:.*?)\]/gm;
import RenderText from "./renderText";
import type { VariableInterface } from "~/utils/VariableThings";
import { propertiesForColumnsWidth } from "~/utils/columnStyles";

export default function Text({
  glava,
  textLines,
  text2Lines: text2,
  flag1 = true,
  url,
  variables = {},
}: {
  glava: string | number;
  textLines: string[];
  text2Lines: string;
  flag1?: boolean;
  url: string;
  variables: { [key: string]: VariableInterface };
}) {
  // console.log("vars:", variables);
  function compileToStringM(a: string) {
    return compileToString(a, variables);
  }

  textLines = textLines.map((e) => compileToStringM(e));
  // console.log(furst2Lines);

  text2 = compileToStringM(text2);
  return (
    <Container className="bg-i p-4" style={{ textIndent: 20 }}>
      <Row>
        <Col  {...propertiesForColumnsWidth}>
          <h2 className="">Глава {glava} </h2>
        </Col>
      </Row>
      <Row>
        <Col>
          <RenderText texts={textLines} />
        </Col>
      </Row>
      <Row>
        <Col>
          {!flag1 ? (
            <DecoderAdvanced text2={text2} url={url} flag1={flag1} />
          ) : (
            <Decoder text2={text2} url={url} flag1={flag1} />
          )}
        </Col>
      </Row>
    </Container>
  );
}
