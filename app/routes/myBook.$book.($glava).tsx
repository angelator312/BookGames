import { redirect } from "@remix-run/node";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import getTextStore from "~/utils/textStore";
import { requireUserId } from "~/utils/session.server";
import DropDown1 from "~/components/dropdown";
import { useState } from "react";
import FormComponent from "~/components/formComp";
import { Button } from "react-bootstrap";
export async function action({ params, request }: ActionFunctionArgs) {
  // const form = await request.formData();
  // let glava = form.get("to");
  // if (!glava) glava = "1";
  // // let b = await getGorB("book");
  // // console.log(b);

  // const userStore = await getUserStore();
  // const uId = await getUserId(request);
  // console.log("Glava:",glava);

  // @ts-ignore Заради uId:string|null
//  console.log(
  //   await userStore.editUserSGlava(
  //     uId ?? "",
  //     `Book-${params.book}`,
  //     glava.toString()
  //   )
  // );
  // if (!glava) glava = "1";
  // const b = await textStore.getBook(book);
  // let text = await textStore.getText(`${b}-${glava}`);
  // if (!text) {
  //   text = { text: "" };
  // }
  return redirect(request.url);
}
export async function loader({ params, request }: LoaderFunctionArgs) {
  const glava = params.glava;
  const book = params.book;
  if (!glava || Number.isNaN(parseInt(glava))) return redirect(`/myBook/${book}/1`);
  const a = await requireUserId(request, false);
  const tStore = await getTextStore();
  const b = await tStore.getBook(book ?? "");
// console.log(glava);
  if (typeof a === "string") {
    if (b?.avtor == a) {
      let t = await tStore.getText(`${book}-${glava}`);
      return [book, glava, t];
    }
    return redirect(`/book/${book}`);
  }
  return redirect("/login");
}
export default function Book1() {
  const [bUrl, gl, t] = useLoaderData<typeof loader>();
  // if(typeof t==="string")
  //   var [text, setText] = useState({text:"",text2:""});
  // else
// console.log(gl);

  const [text, setText] = useState(
    typeof t === "string" ? "" : t?.text ?? ""
  );
  const [text2, setText2] = useState(
    //@ts-ignore
    typeof t?.text2 === "string" ? "" : t?.text2 ?? ""
  );

  return (
    <div className="m-l-3">
      <DropDown1
        url={`/myBook/${bUrl}`}
        doN={15}
        // @ts-ignore
        activeDrop={parseInt(gl ?? 0)}
      />
      <br />
      <textarea
        defaultValue={text ?? ""}
        placeholder="Здравей,Човече"
        onChange={(e) => setText(e.target.value ?? "")}
        name="text"
      ></textarea>
      <p>
        За нов абзац два празни реда<strong>↑↑↑</strong>
        <br />
        Текста в който пише изборите на читателя <strong>↓↓↓</strong>
      </p>
      <textarea
        placeholder="Към Тъмната гора (Глава 2)"
        // @ts-ignore
        defaultValue={text2 ?? ""}
        onChange={(e) => {
          // console.log(e.target.innerHTML);
          // @ts-ignore
          setText2(e.target.value ?? "");
        }}
      ></textarea>
      <p>
        За линк към друга глава :(Глава число) <strong>↑↑↑</strong>
      </p>
      <br />
      <FormComponent
        textsHidden={[text, text2]}
        to={`/myBook/${bUrl}/${gl}/save`}
        textForSubmit="Save changes"
      />
      <Link to="/"><Button variant="primary">Start</Button></Link>
    </div>
  );
}
