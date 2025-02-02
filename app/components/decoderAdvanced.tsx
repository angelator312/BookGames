import { Col, Row } from "react-bootstrap";
import IzborComponent from "./IzborComponent";
import { propertiesForColumnsWidth2 } from "~/utils/columnStyles";
import { useState } from "react";
import ZarcheComponent from "./ZarcheComponent";
import { regexForAdvancedDecoder as reg } from "~/utils/regex";

export interface Izbori {
  broiZarcheta: number;
  izbori: Izbor[];
}
export interface Izbor {
  isText: boolean;
  glava: number;
  zar: number | number[];
  scoreChange: number;
  text: string;
  disabled?: boolean;
}
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
  // console.log(text2
  const [zarValue, setZarValue] = useState(-1);
  if (Array.isArray(text)) text2 = text[0];
  else text2 = text;
  if (!text2) return <></>;
  let text2Lines = text2.replace(/\r/gm, "").split(reg);
  let a: Izbori = { broiZarcheta: 0, izbori: [] };
  let glavaIzb = 0;
  let textIzb = "";
  let zarIzb: number | number[] = 0;
  let scoreChangeIzb = 0;
  // console.log(text2Lines);

  text2Lines.map((e) => {
    if (!e) return e;
    if (e.indexOf("(Глава") == 0) {
      //e===>"(Глава 1)"
      glavaIzb = parseInt(e.replace(")", "").substring(6));
      // console.log("glavaIzb",glavaIzb);
    } else if (e.indexOf("(резултат") == 0) {
      //e===>"(резултат 1)"
      scoreChangeIzb = parseInt(e.replace(")", " ").substring(10));
      // console.log("scoreChangeIzb",scoreChangeIzb);
    } else if (e.indexOf("(на зар") == 0) {
      //e===>"(на зар 1)"
      let str = e.replace(")", "").substring(7).split(",");
      if (str.length == 1) {
        zarIzb = parseInt(str[0]);
      } else {
        zarIzb = str.map((e) => parseInt(e, 10));
      }
      // console.log("zarIzb", zarIzb);
      a.broiZarcheta = 1;
    } else if (e.indexOf("[") == 0) {
      //e==>[ Думи Думи и Думи]
      textIzb = e.replace("[", "").replace("]", "");
      // console.log("textIzb", textIzb);

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
      if (e.trim()) {
        a.izbori.push({
          glava: 0,
          zar: 0,
          scoreChange: 0,
          text: e,
          isText: true,
        });
      }
      glavaIzb = 0;
      zarIzb = 0;
      scoreChangeIzb = 0;
      textIzb = "";
    }
    return e;
  });
  // console.log(a.izbori);

  let arr: any[] = [];
  for (let i = 0; i < a.izbori.length; i++) {
    let e = a.izbori[i + 1];
    if (!e) {
      console.log(a.izbori[i]);

      if (a.izbori[i].isText)
        arr.push({ text: a.izbori[i].text, izb: undefined });
      else arr.push({ text: "", izb: a.izbori[i] });
      break;
    }
    if (a.broiZarcheta) {
      //console.log(e);
      e.disabled = !(e.zar == 0);
      if (zarValue == e.zar) {
        e.disabled = false;
      } else if (Array.isArray(e.zar) && e.zar.includes(zarValue)) {
        e.disabled = false;
      }
    }
    if (a.izbori[i].isText) {
      arr.push({ text: a.izbori[i].text, izb: e });
      ++i;
    } else {
      arr.push({ text: "", izb: e });
    }
  }
  // console.log(a);
  // console.log(text2Lines);
  // console.log(text2);
  // console.log(text);
  // console.log(arr);
  return (
    <>
      {a.broiZarcheta ? (
        <ZarcheComponent
          onResult={(val) => {
            setZarValue(val);
          }}
          broiZarcheta={a.broiZarcheta}
        />
      ) : null}
      <ul>
        {arr.map((e, i) => (
          <li key={i}>
            <Row>
              <Col {...propertiesForColumnsWidth2}>
                <p className="text-bold">{e.text ? e.text : <pre> </pre>}</p>
              </Col>
              {e.izb ? (
                <Col sm="2">
                  <IzborComponent izbor={e.izb} url={url} flag={flag1} />
                </Col>
              ) : null}
            </Row>
          </li>
        ))}
      </ul>
    </>
  );
}
