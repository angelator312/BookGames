import { Col, Row } from "react-bootstrap";
import IzborComponent from "./IzborComponent";
import { propertiesForColumnsWidth } from "~/utils/columnStyles";

export interface Izbori {
  zarche: boolean;
  izbori: Izbor[];
}
export interface Izbor {
  isText: boolean;
  glava: number;
  zar: number;
  scoreChange: number;
  text: string;
}

const reg =
  /=>\s*(\(Глава .*?\))\s*(\(резултат .*?\))?\s*(\(на зар .*?\))?\s*(\[[^\]]+])/gm;
export function DecoderAdvanced({
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
  let a: Izbori = { zarche: false, izbori: [] };
  let glavaIzb = 0;
  let textIzb = "";
  let zarIzb = 0;
  let scoreChangeIzb = 0;
  //console.log(text2Lines);

  text2Lines.map((e) => {
    if (!e) return e;
    if (e.indexOf("(Глава") == 0) {
      //e===>"(Глава 1)"
      glavaIzb = parseInt(e.replace(")", "").substring(6));
      console.log("glavaIzb", e.replace(")", "").substring(6));
    } else if (e.indexOf("(резултат") == 0) {
      //e===>"(резултат 1)"
      scoreChangeIzb = parseInt(e.replace(")", " ").substring(10));
      console.log("scoreChangeIzb", e.replace(")", " ").substring(10));
    } else if (e.indexOf("(на зар") == 0) {
      //e===>"(на зар 1)"
      zarIzb = parseInt(e.replace(")", "").substring(6));
      a.zarche = true;
      console.log("zarIzb", zarIzb);
    } else if (e.indexOf("[") == 0) {
      //e==>[ Думи Думи и Думи]
      textIzb = e.replace("[", "").replace("]", "");
      console.log("textIzb", textIzb);

      a.izbori.push({
        glava: glavaIzb,
        zar: zarIzb,
        scoreChange: scoreChangeIzb,
        text: textIzb,
        isText: false,
      });
      glavaIzb = 0;
      zarIzb = 0;
      scoreChangeIzb = 0;
      textIzb = "";
    } else {
      a.izbori.push({
        glava: 0,
        zar: 0,
        scoreChange: 0,
        text: e,
        isText: true,
      });
      glavaIzb = 0;
      zarIzb = 0;
      scoreChangeIzb = 0;
      textIzb = "";
    }
    return e;
  });
  //console.log(a);
  // console.log(text2Lines);
  // console.log(text2);
  // console.log(text);
  return (
    <div>
      {a.izbori.map((e, i) => (
        <Row key={i}>
          {e.isText ? (
            <Col {...propertiesForColumnsWidth}>
              <p className="text-bold">{e.text}</p>
            </Col>
          ) : (
            <Col className="m-l-35% ">
              <IzborComponent izbor={e} url={url} flag={flag1} />
            </Col>
          )}
        </Row>
      ))}
    </div>
  );
}
