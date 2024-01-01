import { Link, useLoaderData } from "@remix-run/react";
import { json, type LoaderFunctionArgs } from "@remix-run/node";
import menu from "~/helps/menu.png";
import author from "~/helps/NIkolaRaikov.png";
import { useState } from "react";
let reg = /\(Глава\s+(\d+)\)/g;
export const loader = async ({ request }: LoaderFunctionArgs) => {
  // console.log(11);
  // let glava = await getGorB("glava");
  // let b = await getGorB("book");
  // if (!glava) glava = "1";
  // const textStore = await getTextStore();
  // // const b = await textStore.getBook(book);
  // let text = await textStore.getText(`${b}-${glava}`);
  // if (!text) {
  //   text = { text: "A" };
  // }
  return json({
    text: "This is not mandatory",
    glava: "glava",
    text2: "This is not mandatory",
  });
};

export default function Book({ n }: { n: number }) {
  const { text, glava, text2 } = useLoaderData<typeof loader>();
  // console.log(text,glava,text2);
  
  let [vis, setVis] = useState("none");
  let textLines = text.split("\n\n");
  let text2Lines = text2.split(reg);
  let furst2Lines = [textLines[0], textLines[1]];
  textLines = textLines.slice(2);
  console.log(12);
  //  "0".matchAll(reg);
  // Array.from(text2.matchAll(reg));

  // const {book}= useLoaderData<string>();
  return (
    <div
      onLoad={() => {
        console.log(screen.width,"vis");

              }}
      className="text-center space-y-2 sm:text-left"
    >
      <div className="space-y-0.5">
        <div style={{ textIndent: 20 }}>
          <table>
            <tbody>
              <tr>
                <td>
                  <h2 className="text-bold text-dark">Глава {glava} </h2>
                  <h2 className="text-bold text-dark p-3">{furst2Lines[0]} </h2>
                  <p className="text-bold p-3 text-j in-2 text-dark">
                    {furst2Lines[1]}
                  </p>
                  {textLines.map((e, i) => (
                    <p className="text-bold p-3 text-j in-2 text-dark" key={i}>
                      {" "}
                      {e}
                    </p>
                  ))}
                  {text2Lines.map((e, i) => (
                    <div key={i}>
                      {i % 2 == 0 ? (
                        <p
                          className="p-3 text-bold text-j in-1 text-dark"
                          key={i}
                        >
                          {" "}
                          {e}
                        </p>
                      ) : (
                        <form
                          action={`/e-book${n}`}
                          style={{ display: "inline" }}
                          method="POST"
                        >
                          <input type="hidden" name="to" value={e} />
                          <button type="submit" className="logo text-">
                            Глава {e}
                          </button>
                        </form>
                      )}
                    </div>
                  ))}
                </td>
                <td>
                  <button
                    onClick={() => {
                      console.log(vis);
                      if (!vis || vis == "none") {
                        setVis("block");
                      } else setVis("none");
                    }}
                  >
                    <img width={30} height={30} src={menu} alt="menu button" />
                  </button>
                  <div>
                    <img
                      style={{
                        display: vis,
                      }}
                      className="img-v"
                      id="img-1"
                      alt="A"
                      src={author}
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <Link to="/" className="text-center">
          <span className="logo text-bold text-dark">Начало</span>
        </Link>
      </div>
    </div>
  );
}
