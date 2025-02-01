import { Col, Container, Row } from "react-bootstrap";
import { Decoder } from "./decoder";
import { DecoderAdvanced } from "./decoderAdvanced";
import type { VariableInterface } from "~/utils/User";
import { compileToString } from "~/utils/User";
// const regImg = /=>\[(image:.*?)\]/gm;
import { regexForImage as regImg } from "~/utils/regex";
import RenderText from "./renderText";
import RenderTextWithDecoder from "./renderText2";

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
  // console.log("vars:", variables);
  function compileToStringM(a: string) {
    return compileToString(a, variables);
  }
  furst2Lines[0] = compileToStringM(furst2Lines[0]);
  furst2Lines[1] = compileToStringM(furst2Lines[1]);
  textLines = textLines.map((e) => compileToStringM(e));
  let textsPlImage: string[] = [];
  console.log(furst2Lines);

  furst2Lines[1].split(regImg).forEach((line) => {
    textsPlImage.push(line);
  });
  textLines.forEach((e) => {
    for (const z of e.split(regImg)) {
      textsPlImage.push(z);
    }
  });

  text2 = compileToStringM(text2);
  return (
    <Container className="bg-i p-4" style={{ textIndent: 20 }}>
      <Row>
        <Col>
          <h2 className="">Глава {glava} </h2>
        </Col>
      </Row>
      <Row>
        <Col>
          <h2 className="p-3">
            <RenderTextWithDecoder texts={furst2Lines[0]} />
          </h2>
        </Col>
      </Row>

      <RenderText texts={textsPlImage} />
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
