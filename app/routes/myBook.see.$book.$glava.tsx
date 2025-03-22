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
  let glava: string = formData.get("to")?.toString() ?? "";
  //console.log(glava);\
  const bId = params.book;
  if (!bId) return redirect("/");
  // console.log(glava);
  if (!glava) glava = "1";
  const userStore = await getUserStore();
  const uId = await getUserId(request);
  if (!uId) return;
  // console.log("rezultat:", form.get("rezultat")?.toString());
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
      // console.log(key, values[key]);
    }
  });

  // console.log("values:", values);
  await vStore.setVariables(uId, bId, values);
  const lastStore = await getLastTimeStore();  
  await lastStore.editUserSChapter(uId, `${bId}`, parseInt(glava, 10));
  const outUrl =
    request.url.substring(0, request.url.lastIndexOf("/")) + "/" + glava;

  return redirect(outUrl);
}
export async function loader({ params, request }: LoaderFunctionArgs) {
  const uId = await requireUserId(request, false);
  const tStore = await getTextStore();
  const uStore = await getUserStore();
  const b = await tStore.getBook2(params.book ?? " ");
  // console.log(b);
  const bId = params.book;
  if (!bId) return redirect("/");

  if (typeof uId === "string") {
    if (b?.avtor == uId) {
      // return a;
      //console.log(uStore.collection);

      // const user = await uStore.getUser(uId);
      let glava = params.glava;
      let text = await tStore.getText(`${b.text}-${glava}`);
      if (!text || !glava) {
        (await getLastTimeStore()).editUserSChapter(uId, b.text, 1);
        return redirect(`/myBook/${b.text}/${glava}?errCode=1`);
      }
      let segG = text?.text;
      let spec = text?.text2;
      // console.log({ text: segG, glava, text2: spec, b });
      const vStore = await getVariableStore();
      const vars = await vStore.getVariables(uId, bId);
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
    return redirect("/?a");
  }
  return redirect("/login?redirectTo=" + request.url);
}
export default function Book1() {
  const book = useLoaderData<loaderBook>();
  //console.log(book.glava);

  //   style={{ padding: 15.4 }}
  //   console.log(book);
  const zagl = book.b.id;
  // console.log(book.text2);

  return (
    <div style={{ fontSize: (book.settings.fontSize ?? 10) / 10 + "rem" }}>
      <BookPreview
        url={`/myBook/see/${book.b.text}/${book.glava}`}
        title={zagl ?? ""}
        almP={`/img/${book.b.text}-`}
        kr={false}
      />
    </div>
  );
}
