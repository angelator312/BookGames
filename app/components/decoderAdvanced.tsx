import { Col, Row } from "react-bootstrap";
import IzborComponent from "./IzborComponent";
import { propertiesForColumnsWidth2 } from "~/utils/columnStyles";
import { useState } from "react";
import ZarcheComponent from "./ZarcheComponent";
import { isEmptyLine, regexForAdvancedDecoder as reg } from "~/utils/regex";
import Markdown from "react-markdown";

function matchAll(str: string): Array<Izbor | string> {
  let out: Array<Izbor | string> = [];
  let m: RegExpExecArray | null,
    predLastIndex = 0;
  while ((m = reg.exec(str)) !== null) {
    let zars: number[] = [];
    let disabled = false;
    if (m[3]) {
      disabled = true;
      let e = 0;
      zars = m[3]?.split(",").map((m) => {
        e = parseInt(m, 10);
        return e;
      });
    }
    if (reg.lastIndex > 0) {
      let sbstr = str.substring(predLastIndex, reg.lastIndex - m[0].length);
      if (sbstr.match(isEmptyLine)) {
        let arr = sbstr.split(isEmptyLine);
        arr.forEach((e) => {
          if (e.trim()) {
            out.push(e.trim());
          } else out.push("\n");
        });
      } else {
        sbstr = sbstr.trim();
        if (sbstr) out.push(sbstr);
      }
      predLastIndex = reg.lastIndex;
    }
    // console.log(JSON.stringify(m[0]));

    // out.push(m[0]);
    out.push({
      isText: false,
      glava: parseInt(m[1], 10),
      zar: zars,
      scoreChange: parseInt(m[2] ?? "0", 10),
      text: m[4],
      disabled,
    });
  }
  let sbstr = str.substring(predLastIndex, str.length).trim();
  if (sbstr) out.push(sbstr);

  return out;
}

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
  text2: textForDecoding,
  flag1: flagIsOthersBook = true,
  url,
}: {
  text2: string;
  flag1?: boolean;
  url: string;
}) {
  let text2: string;
  // console.log(text2);
  const [zarValue, setZarValue] = useState(-1);
  if (Array.isArray(textForDecoding)) text2 = textForDecoding[0];
  else text2 = textForDecoding;
  if (!text2) return <></>;

  // const tM = [...text.matchAll(reg)];
  let broiZarcheta = 0;
  let arrayBetaV = matchAll(textForDecoding);
  // console.log(arr2);
  let arrayForRender: { izbor?: Izbor; text: string }[] = [];
  for (let i = 0; i < arrayBetaV.length; i++) {
    let element = arrayBetaV[i];
    if (typeof element === "string") {
      arrayForRender.push({ text: element });
    } else if (i == 0) {
      arrayForRender.push({ text: "", izbor: element });
    } else {
      let zarove: number[] = [];
      if (Array.isArray(element.zar)) zarove = element.zar;
      else zarove = [element.zar];
      let disabled = false;

      if (zarove.length > 0) {
        // console.log(zars);
        disabled = true;
        zarove.forEach((e) => {
          // e = parseInt(m, 10);
          
          if (zarValue == e) disabled = false;
          broiZarcheta = Math.max((e + 5) / 6, broiZarcheta);
        });
        element.disabled = disabled;
        // console.log(m);
      }
      
      if (arrayForRender[arrayForRender.length - 1].izbor) {
        arrayForRender.push({ izbor: element, text: "" });
      } else if (arrayForRender[arrayForRender.length - 1].text != "\n")
        arrayForRender[arrayForRender.length - 1].izbor = element;
      else arrayForRender.push({ izbor: element, text: "" });
    }
  }
  // console.log(arr);
  // Deleting "\n" and making render multiline
  for (let i = 0; i < arrayForRender.length; i++) {
    if (arrayForRender[i].izbor) {
      let poslLine = "";
      for (let j = i - 1; j >= 0; ) {
        if (arrayForRender[j].izbor) break;
        if (arrayForRender[j].text == "\n") {
          break;
        }
        poslLine += arrayForRender[j].text;
        arrayForRender[j].text = "\n";
      }
      poslLine += arrayForRender[i].text;
      poslLine += "\n";
      arrayForRender[i].text = poslLine;
    }
  }
  arrayForRender = arrayForRender.filter((e) => !e.text.match(isEmptyLine));
  broiZarcheta = Math.floor(broiZarcheta);
  // console.log(broiZarcheta);

  return (
    <>
      {broiZarcheta ? (
        <ZarcheComponent
          onResult={(val) => {
            setZarValue(val);
          }}
          broiZarcheta={broiZarcheta}
        />
      ) : null}
      {/* <ul> */}
      {arrayForRender.map((el, index) => (
        <div key={index + el.text}>
          {el.izbor ? (
            <Row>
              {el.text.trim() ? (
                <Col {...propertiesForColumnsWidth2}>
                  {/* <p className=""> */}
                  <Markdown>{el.text}</Markdown>
                  {/* </p> */}
                </Col>
              ) : null}
              <Col
                sm={el.text.trim() ? "2" : "12"}
                className={el.text.trim() ? "" : "centered"}
              >
                <IzborComponent
                  izbor={el.izbor}
                  url={url}
                  flag={flagIsOthersBook}
                />
              </Col>
            </Row>
          ) : (
            <Markdown>{el.text}</Markdown>
          )}
        </div>
      ))}
      {/* </ul> */}
    </>
  );
}
