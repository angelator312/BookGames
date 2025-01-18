import {
  propertiesForColumnsWidth2,
} from "~/utils/columnStyles";
import FormComponent from "./formComp";
import { Col, Row } from "react-bootstrap";
const reg = /\(Глава\s+(\d+)\)/g;
const reg2 = /(if\(.+\|\d+\|\d+)\)/g;
export function DecoderSimple({
  text2: text,
  flag1 = true,
  url,
}: {
  text2: string;
  flag1?: boolean;
  url: string;
}) {
  let text2: string;
  // console.log(text2);
  if (Array.isArray(text)) text2 = text[0];
  else text2 = text;
  if (!text2) return <></>;
  let text2Lines = text2.replace(/\r/gm, "").split(reg);
  let a = [];
  for (let i = 0; i < text2Lines.length; i += 2) {
    const e = text2Lines[i];
    let b = e.replace(/\r/gm, "").split(reg2);
    a.push({ b, e: [text2Lines[i + 1]] });
  }
  // console.log(a);
  // console.log(text2Lines);
  // console.log(text2);
  // console.log(text);
  return (
    <ul>
      {a.map((e, i) => (
        <li key={i}>
          <Row>
            <Col {...propertiesForColumnsWidth2}>
              <p className="text-bold">{e.b}</p>
            </Col>
            {e.e&&e.e[0]!=null ? (
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
        </li>
      ))}
    </ul>
  );
}
