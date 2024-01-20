import {
  redirect,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
} from "@remix-run/node";
// import Container from "react-bootstrap/cjs/Container.js";
// import Row from "react-bootstrap/cjs/Row.js";
// import Col from "react-bootstrap/cjs/Col.js";
// import { useLoaderData } from "@remix-run/react";
import Book from "~/components/book";
import getTextStore from "~/utils/mongostore-texts";
import { createGorB, getGorB, getUserId } from "~/utils/session.server";
import { glavi } from "../helps/glavi";
import { Special } from "../helps/Special";
import getUserStore from "~/utils/mongostore";
const book = "Голямото приключение";
const b = "Gp";
export const action = async ({ request }: ActionFunctionArgs) => {
  console.log(11);
  const form = await request.formData();
  let glava = form.get("to");
  if (!glava) glava = "1";
  // let b = await getGorB("book");
  // console.log(b);

  const userStore = await getUserStore();
  const uId = await getUserId(request);
  // console.log("Glava:",glava);

  // @ts-ignore Заради uId:string|null
  console.log(await userStore.editUserSGlava(uId, `Book-${b}`, glava));
  // if (!glava) glava = "1";
  // const b = await textStore.getBook(book);
  // let text = await textStore.getText(`${b}-${glava}`);
  // if (!text) {
  //   text = { text: "A" };
  // }
  return redirect(request.url);
};
export const loader = async ({ request }: LoaderFunctionArgs) => {
  // const form = await request.formData();
  // let g = form.get("to");
  const textStore = await getTextStore();
  // let b = await textStore.getBook(book);
  // if (!b) return null;
  const userStore = await getUserStore();
  const uId = await getUserId(request);
  // console.log(Special.length);

  // @ts-ignore Заради uId:string|null
  const user = await userStore.getUser(uId);
  if (!user) {
    return redirect("/login");
  }
  let glava = (await getGorB("glava")) ?? user?.glavi[`Book-${b}`];
  if (!glava) glava = "1";
  let segG = glavi[parseInt(glava) - 1];
  let spec = Special[parseInt(glava) - 1];
  await textStore.addBook(book, "Gp");
  for (let i = 0; i < 48; i++)
    await textStore.addText(`Gp-${i + 1}`, glavi[i], Special[i]);

  createGorB("glava", glava, request);
  createGorB("book", b, request);

  return { text: segG, glava, text2: spec };
};

export default function Book1() {
  // const book2 = useLoaderData<string>(); style={{ padding: 15.4 }}
  console.log(book);
  return (
    <div>
      <h1 className="p-1 text-dark text-center">{book} </h1>
      <Book n={1} title={book} almP={`img/${b}-`}  />
    </div>
  );
}
