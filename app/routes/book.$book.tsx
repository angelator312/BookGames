import { redirect } from "@remix-run/node";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import BookPreview from "~/components/book";
import getUserStore from "~/utils/userStore";
import getTextStore from "~/utils/textStore";
import { createGorB, getUserId, requireUserId } from "~/utils/session.server";
import type { loaderBook } from "~/utils/loaderTypes";
import getVariableStore from "~/utils/variableStore";
import type { VariableCollection } from "~/utils/VariableThings";
import getLastTimeStore from "~/utils/lastTimeStore";
export async function action({ params, request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const bId = params.book;
  if (!bId) return redirect("/");
  let glava:string = formData.get("to")?.toString()??"";
  // console.log(glava);
  if (!glava) glava = "1";
  const userStore = await getUserStore();
  const uId = await getUserId(request);
  if (!uId) return;
  const vStore = await getVariableStore();
  // console.log("rezultat:", form.get("rezultat")?.toString());
  let values: VariableCollection = await vStore.getVariables(uId, bId);
  formData.forEach(async (value, key) => {
    if (key.startsWith("var/")) {
      key = key.substring(4);
      let num = parseInt(value.toString(), 10);
      if (Number.isNaN(num)) {
        const tStore = await getTextStore();
        const book = await tStore.getBook(bId);
        if (book) {
          if (book.defaultVariables)
            if (book.defaultVariables[key]) {
              num = book.defaultVariables[key].value;
            }
        }
        if (Number.isNaN(num)) num = 0;
      }
      if (values[key]) {
        values[key].value += num;
      } else
        values[key] = {
          name: key,
          value: num,
        };
    }
  });

  // console.log("values:", values);
  await vStore.setVariables(uId, bId, values);
  const lastStore=await getLastTimeStore();
  await lastStore.editUserSChapter(uId, `${params.book}`, parseInt(glava, 10));
  return redirect(request.url);
}
export async function loader({ params, request }: LoaderFunctionArgs) {
  const uId = await requireUserId(request, false);
  const bId = params.book;
  if (!bId) return redirect("/");
  const tStore = await getTextStore();
  const uStore = await getUserStore();
  const lastStore = await getLastTimeStore();
  const book = await tStore.getBook2(bId ?? " ");
  // console.log(b);
  if (typeof uId === "string") {
    if (book?.avtor == uId) return redirect("/myBook/" + bId);
    if (book?.public) {
      // return a;
      //console.log(uStore.collection);

      const user = await uStore.getUser(uId);
      if (user) {
        let glava = "1";
        glava=(await lastStore.getTime(uId,bId)).chapter.toString();
        
        let text = await tStore.getText(`${book.text}-${glava}`);
        if (!text || !glava) {
          //@ts-ignore
          tStore.addComment(bId, glava, uId, "Довършете си книгата");
          (await getLastTimeStore()).editUserSChapter(uId, `${book.text}`, 1);
          return redirect(`/?errCode=1`);
        }
        let segG = text?.text;
        let spec = text?.text2;
        // console.log({ text: segG, glava, text2: spec, b });
        createGorB("glava", glava, request);
        createGorB("book", book.text, request);
        const settings = await uStore.getMySettings(uId);
        const vStore = await getVariableStore();
        const vars = await vStore.getVariables(uId, bId);
        // console.log(vars);

        return {
          text: segG,
          glava,
          text2: spec,
          b: book,
          settings,
          user: user,
          variables: vars,
        };
      }
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
      <BookPreview
        url={`/book/${book.b.text}`}
        title={zagl ?? ""}
        almP={`/img/${book.b.text}-`}
        kr={false}
      />
    </div>
  );
}
