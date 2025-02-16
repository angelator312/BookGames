import { Col, Row } from "react-bootstrap";
import IzborComponent from "./IzborComponent";
import { propertiesForColumnsWidth2 } from "~/utils/columnStyles";
import { useState } from "react";
import ZarcheComponent from "./ZarcheComponent";
import { regexForAdvancedDecoder as reg } from "~/utils/regex";
import Markdown from "react-markdown";
import { parse } from "path";

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

  const tM = [...text.matchAll(reg)];
  let arr: { izb: Izbor; text: string }[] = tM.map((m) => {
    
    return {
      text: m[1],
      izb: {
        isText: false,
        glava: parseInt(m[2], 10),
        zar: m[4]?.split(",").map((m) => parseInt(m, 10)),
        scoreChange: parseInt(m[3]??"0", 10),
        text: m[5],
      },
    };
  });
 let broiZarcheta=0;
  // console.log(text2Lines);
  // console.log(a);
  // console.log(text2Lines);
  // console.log(text2);
  // console.log(text);
  // console.log(arr);
  return (
    <>
      {broiZarcheta ? (
        <div className="mb-5">
          <ZarcheComponent
            onResult={(val) => {
              setZarValue(val);
            }}
            broiZarcheta={broiZarcheta}
          />
        </div>
      ) : null}
      <ul>
        {arr.map((e, i) => (
          <li key={i}>
            <Row>
              <Col {...propertiesForColumnsWidth2}>
                <p className="text-bold">
                  {e.text ? <Markdown>{e.text}</Markdown> : <pre> </pre>}
                </p>
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
