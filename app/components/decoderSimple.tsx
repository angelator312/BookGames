import { propertiesForColumnsWidth } from "~/utils/columnStyles";
import FormComponent from "./formComp";
import { Col } from "react-bootstrap";
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
  let a = text2Lines.map((e, i) => {
    if (i % 2 == 0) {
      let b = e.replace(/\r/gm, "").split(reg2);
      return b;
    } else return [e];
  });
  // console.log(a);
  // console.log(text2Lines);
  // console.log(text2);
  // console.log(text);
  return (
    <>
      {a.map((e, i) => (
        <div key={i}>
          {i % 2 == 0 ? (
            <Col {...propertiesForColumnsWidth}>
              <p className="text-bold">{e}</p>
            </Col>
          ) : (
            <div className="m-l-35% ">
              <FormComponent
                textForSubmit={"Глава " + e[0]}
                to={flag1 ? `${url}` : `${url}/${e}`}
                textsHidden={e}
                namesHidden={["to"]}
                submitVariant="outline-secondary"
              />
            </div>
          )}
        </div>
      ))}
    </>
  );
}
