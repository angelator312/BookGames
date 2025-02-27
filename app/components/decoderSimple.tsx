import { propertiesForColumnsWidth2 } from "~/utils/columnStyles";
import FormComponent from "./formComp";
import { Col, Row } from "react-bootstrap";
import {
  regexForSimpleDecoder as reg,
  regexForSimpleDecoder2 as reg2,
} from "~/utils/regex";

//Deprecated, used only for the old book "Голямото приключение"
export function DecoderSimple({
  text2: textForDecoding,
  flag1 = true,
  url,
}: {
  text2: string;
  flag1?: boolean;
  url: string;
}) {
  let tmpText: string;
  // console.log(text2);
  if (Array.isArray(textForDecoding)) tmpText = textForDecoding[0];
  else tmpText = textForDecoding;
  if (!tmpText) return <></>;
  let text2Lines = tmpText.replaceAll(/\r/gm, "").split(reg);
  let arrayForRender = [];
  for (let ind = 0; ind < text2Lines.length; ind += 2) {
    const elNow = text2Lines[ind];
    let textBeforeIzbor = elNow.replace(/\r/gm, "").split(reg2);
    arrayForRender.push({ textBeforeIzbor, e: [text2Lines[ind + 1]] });
  }
  // console.log(a);
  // console.log(text2Lines);
  // console.log(text2);
  // console.log(text);
  return (
    <ul>
      {arrayForRender.map((e, i) => (
        // <li key={i}>
        <Row key={i}>
          <Col {...propertiesForColumnsWidth2}>
            <p className="text-bold">{e.textBeforeIzbor}</p>
          </Col>
          {e.e && e.e[0] != null ? (
            <Col sm="2">
              <FormComponent
                textForSubmit={"Глава " + e.e[0]}
                to={flag1 ? `${url}` : `${url}/${e}`}
                textsHidden={e.e}
                namesHidden={["to"]}
                submitVariant="outline-secondary"
              />
            </Col>
          ) : (
            ""
          )}
        </Row>
        // </li>
      ))}
    </ul>
  );
}
