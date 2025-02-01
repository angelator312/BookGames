import { redirect } from "@remix-run/node";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Book from "~/components/book";
import getUserStore from "~/utils/userStore";
import getTextStore from "~/utils/textStore";
import { createGorB, getUserId, requireUserId } from "~/utils/session.server";
import type { loaderBook } from "~/utils/loaderTypes";
import getVariableStore from "~/utils/variableStore";
export async function action({ params, request }: ActionFunctionArgs) {
  const form = await request.formData();
  let glava = form.get("to");
  let bId = params.book;
  if (!bId) return redirect("/");
  // console.log(glava);
  if (!glava) glava = "1";
  const userStore = await getUserStore();
  const uId = await getUserId(request);
  if (!uId) return;
  // console.log("rezultat:", form.get("rezultat")?.toString());
  const rezPlus = parseInt(form.get("rezultat")?.toString() ?? "NaN");
  // console.log(rezPlus);
  if (!Number.isNaN(rezPlus)) {
    const vStore = await getVariableStore();
    const variables = await vStore.getVariables(uId, bId);
    variables["rezultat"].value += rezPlus;
    await vStore.setVariable(uId, bId, {
      book: bId,
      user: uId,
      vars: variables,
    });
  }
  // @ts-ignore Заради uId:string|null
  await userStore.editUserSGlava(uId, `Book-${params.book}`, glava);
  return redirect(request.url);
}
export async function loader({ params, request }: LoaderFunctionArgs) {
  const uId = await requireUserId(request, false);
  const tStore = await getTextStore();
  const uStore = await getUserStore();
  const b = await tStore.getBook2(params.book ?? " ");
  // console.log(b);
  const bId=params.book;
  if(!bId)return redirect("/");

  if (typeof uId === "string") {
    if (b?.public) {
      // return a;
      //console.log(uStore.collection);

      // const user = await uStore.getUser(uId);
      let glava = params.glava;
      let text = await tStore.getText(`${b.text}-${glava}`);
      if (!text || !glava) {
        //@ts-ignore
        tStore.addComment(params.book, glava, uId, "Довършете си книгата");
        return redirect(`/?errCode=1`);
      }
      let segG = text?.text;
      let spec = text?.text2;
      // console.log({ text: segG, glava, text2: spec, b });
      const vStore = await getVariableStore();
      const vars=await vStore.getVariables(uId,bId);
      createGorB("glava", glava, request);
      createGorB("book", b.text, request);
      const settings = await uStore.getMySettings(uId);
      return {
        text: segG,
        glava,
        text2: spec,
        b,
        settings,
        user: uId,
        variables: vars,
      };
    }
    return redirect("/");
  }
  return redirect("/login?redirectTo=" + request.url);
}
export default function Book1() {
  const book = useLoaderData<loaderBook>();
  //console.log(book.glava);

  //   style={{ padding: 15.4 }}
  //   console.log(book);
  const zagl = book.b.id;
  return (
    <div style={{ fontSize: (book.settings.fontSize ?? 10) / 10 + "rem" }}>
      <Book
        url={`/myBook/see/${book.b.text}/${book.glava}`}
        title={zagl ?? ""}
        almP={`/img/${book.b.text}-`}
      />
    </div>
  );
}
