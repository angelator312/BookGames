import { useLoaderData } from "@remix-run/react";
import { json, type LoaderFunctionArgs } from "@remix-run/node";
// import menu from "~/helps/menu.png";
import Navbar from "./navbar";
import Text from "./text";
import FormComponent from "./formComp";
import { Col, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import type { loaderBook } from "~/utils/loaderTypes";

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

interface Params {
  text: string;
  glava: string;
  text2: string;
  user: string;
}

export default function Book({
  url,
  title,
  almP,
  kr = true,
  flag = 0,
  params = {
    text: "This is not mandatory",
    glava: "glava",
    text2: "This is not mandatory",
    user:"user",
  },
}: {
  url: string;
  title: string;
  almP: string;
  kr?: boolean;
  flag?: number;
  params?: Params;
}) {
  const loaderData = useLoaderData<loaderBook>();
  if (!flag) var { text, glava, text2, user } = loaderData;
  //@ts-ignore
  else var { text, glava, text2, user } = params;
  // else
  //  { text, glava, text2 } = useLoaderData<typeof loader>();
  // console.log(flag,text,glava,text2);

  let textLines = text.replace(/\\r/gm, "").split("\n\n");
  let furst2Lines = [textLines[0], textLines[1]];
  textLines = textLines.slice(2);
  const [timeIn] = useState(Date.now());
  useEffect(() => {
    const handleUnload = () => {
      fetch(
        "/analyses/timeForUser?user=" + user + "time=" + (Date.now() - timeIn)
      );
    };
    window.addEventListener("beforeunload", handleUnload);
    return () => window.removeEventListener("beforeunload", handleUnload); // cleanup
  }, [timeIn, user]);
  // console.log(12);
  //  "0".matchAll(reg);
  // Array.from(text2.matchAll(reg));

  // const {book}= useLoaderData<string>();
  return (
    <div className="text-center space-y-2 sm:text-left bg-i">
      <h1 className="p-1 text-dark text-center">{title} </h1>
      <div className="space-y-0.5 bg-i">
        <Navbar path={almP} glava={glava} title={title} flag={flag} />
        <Text
          furst2Lines={furst2Lines}
          glava={glava}
          url={url}
          textLines={textLines}
          text2Lines={text2}
          flag1={!flag}
        />
        {kr ? (
          <div className="m-l-35%">
            <Row>
              <Col sm="3">
                <FormComponent
                  submitVariant="secondary"
                  to={`${url}/${glava}/idea`}
                  textForSubmit="Коментирай!"
                />
              </Col>
              {/* <button type="submit" className="logo ">
                Коментирай!
              </button>
            </form> */}
              <Col sm="3">
                <FormComponent
                  submitVariant="danger"
                  to="/"
                  textForSubmit="Начало"
                  namesHidden={["time"]}
                />
              </Col>
            </Row>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
