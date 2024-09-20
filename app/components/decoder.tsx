// import { log } from "console";
import FormComponent from "./formComp";
const reg = /\(Глава\s+(\d+)\)/g;
const reg2 = /math\((\d+\|\d+\|\d+)\)/g;
export function Decoder({
  text2,
  flag1 = true,
  url,
}: {
  text2: string;
  flag1?: boolean;
  url: string;
}) {
  let text2Lines = text2.replace(/\\r/gm, "").split(reg);
  let a = text2Lines.map((e, i) => {
    if (i % 2 == 0) {
      let b = e.replace(/\\r/gm, "").split(reg2);
      return b;
    } else return [e];
  });
  console.log(a);
  return (
    <>
      {a.map((e, i) => (
        <div key={i}>
          {i % 2 == 0 ? (
            // e.map
            <p className="p-3 text-bold text-j in-1 " key={i}>
              {" "}
              {e[0]}
            </p>
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
