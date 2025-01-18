import { useLoaderData } from "@remix-run/react";
// import menu from "~/helps/menu.png";
import Text from "./text";
import FormComponent from "./formComp";
import { Col, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import type { loaderBook } from "~/utils/loaderTypes";
import MenuForHome from "./home.menu";
import type { User } from "~/utils/User";
import { getDefaultUser } from "~/utils/User";

interface Params {
  text: string;
  glava: string;
  text2: string;
  user: User;
  book: { text: string };
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
    user: getDefaultUser(),
    book: { text: "Problem" },
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
  if (!flag) 
    {
      var book=loaderData.b;
      var { text, glava, text2, user } = loaderData;
    }
  //@ts-ignore
  else var { text, glava, text2, user, book } = params;
  // else
  //  { text, glava, text2 } = useLoaderData<typeof loader>();
  // console.log(flag,text,glava,text2);
  
  let textLines = text.replace(/\r/gm, "").split("\n\n");
  let furst2Lines = [textLines[0], textLines[1]];
  textLines = textLines.slice(2);
  const [timeIn] = useState(Date.now());
  useEffect(() => {
    const handleUnload = async() => {
      await fetch(
        "/analyses/timeForUser?user=" +
          user +
          "&time=" +
          timeIn+
          "&book=" +
          book.text
      );
    };
    window.addEventListener("beforeunload", handleUnload);
    //return () => window.removeEventListener("beforeunload", handleUnload); // cleanup
  }, []);
  // console.log(12);
  //  "0".matchAll(reg);
  // Array.from(text2.matchAll(reg));

  // const {book}= useLoaderData<string>();
  return (
    <div className="text-center space-y-2 sm:text-left bg-i">
      <h1 className="p-1 text-dark text-center">{title} </h1>
      <div className="space-y-0.5 bg-i">
        <MenuForHome
        //@ts-ignore
        user={user} settings={user.settings}/>
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
                  to={
                    "/analyses/timeForUser"
                  }
                  method="GET"
                  textForSubmit="Начало"
                  namesHidden={["time", "user", "book"]}
                  textsHidden={[timeIn.toString(),user.user,book.text]}
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
