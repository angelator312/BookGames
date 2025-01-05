import FormComponent from "./formComp";
import { ProverkaIf } from "./proverkaIf";
const reg = /\(Глава\s+(\d+)\)/g;
const reg2 = /(if\(.+\|\d+\|\d+)\)/g;
export function Decoder({
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
            <>
              {e.map((e2, i) => (
                <div key={i}>
                  {e2.indexOf("if") == 0 ? (
                    <div className="m-l-35%">
                      <ProverkaIf
                        e2={e2}
                        url={flag1 ? url : url + "/"}
                        flag1={flag1}
                      />
                    </div>
                  ) : (
                    <p  key={i}>
                      {" "}
                      {e2}
                    </p>
                  )}
                </div>
              ))}
            </>
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
            //   action=
            //   style={{ display: "inline" }}
            //   method="POST"
            // >
            //   <input type="hidden" name="to" value={e} />
            //   <button type="submit" className="logo text-">

            //   </button>
            // </form>
          )}
        </div>
      ))}
    </>
  );
}
