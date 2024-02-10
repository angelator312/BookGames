import { redirect} from "@remix-run/node";
import type { ActionFunctionArgs , LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Book from "~/components/book";
import getUserStore from "~/utils/userStore";
import getTextStore from "~/utils/textStore";
import { createGorB, getUserId, requireUserId } from "~/utils/session.server";
export async function action({ params, request }: ActionFunctionArgs) {
  const form = await request.formData();
  let glava = form.get("to");
  if (!glava) glava = "1";

  const userStore = await getUserStore();
  const uId = await getUserId(request);
  // @ts-ignore Заради uId:string|null
  await userStore.editUserSGlava(uId, `Book-${params.book}`, glava);
  return redirect(request.url);
}
export async function loader({ params, request }: LoaderFunctionArgs) {
  const a = await requireUserId(request, false);
  const tStore = await getTextStore();
  const b = await tStore.getBook(params.book ?? " ");
  // console.log(b);
  if (typeof a === "string") {
    if (b?.avtor == a) return redirect("/myBook/" + params.book);
    if (b?.public) {
      // return a;
      const user = await (await getUserStore()).getUser(a);
      let glava = user?.glavi[`Book-${b.text}`] ?? "1";
      let text = await tStore.getText(`${b.text}-${glava}`);
      let segG = text?.text;
      let spec = text?.text2;
      createGorB("glava", glava, request);
      createGorB("book", b.text, request);
      return { text: segG, glava, text2: spec,b };
    }
  }
  return redirect("/");
}
export default function Book1() {
  const book = useLoaderData<typeof loader>();
  //console.log(book.glava);
  
  //   style={{ padding: 15.4 }}
  //   console.log(book);
  const zagl=book.b.id?.substring(5, book.b.id?.length - 3) 
  return (
    <div>
      <Book url={`/book/${book.b.text}`} title={zagl ?? ""} almP={`/img/${book.b.text}-`}/>
    </div>
  );
}
