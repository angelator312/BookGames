import { Link, useLoaderData } from "@remix-run/react";
import { json, type LoaderFunctionArgs } from "@remix-run/node";
// import menu from "~/helps/menu.png";
import Navbar from "./navbar";
import Text from "./text";
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

export default function Book({
  url,
  title,
  almP,
  kr = true,
}: {
  url: string;
  title: string;
  almP: string;
  kr?: boolean;
}) {
  const { text, glava, text2 } = useLoaderData<typeof loader>();
  // console.log(text,glava,text2);

  let textLines = (text.replace(/\\r/gm, "\n")).split("\n\n");
  let text2Lines = (text2.replace(/\\r/gm, "\n")).split(reg);
  let furst2Lines = [textLines[0], textLines[1]];
  textLines = textLines.slice(2);
  // console.log(12);
  //  "0".matchAll(reg);
  // Array.from(text2.matchAll(reg));

  // const {book}= useLoaderData<string>();
  return (
    <div className="text-center space-y-2 sm:text-left bg-i">
      <h1 className="p-1 text-dark text-center">{title} </h1>
      <div className="space-y-0.5 bg-i">
        <Navbar path={almP} glava={glava} title={title} />
        <Text
          furst2Lines={furst2Lines}
          glava={glava}
          url={url}
          textLines={textLines}
          text2Lines={text2Lines}
        />
        {kr ? (
          <>
            <form action={`${url}/${glava}/idea`} style={{ display: "inline" }}>
              <button type="submit" className="logo ">
                Коментирай!
              </button>
            </form>
            <br />
            <Link to="/" className="text-center">
              <span className="logo text-bold ">Начало</span>
            </Link>
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
