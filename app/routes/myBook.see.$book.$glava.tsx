import type { Text as Text2 } from "~/utils/textStore";
import { redirect } from "@remix-run/node";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, useSearchParams } from "@remix-run/react";
import getTextStore from "~/utils/textStore";
import { loadSettings, requireUserId } from "~/utils/session.server";
import { useEffect, useState } from "react";
import Book from "~/components/book";
import type { SettingsInterface } from "~/utils/User";
export async function action({ request }: ActionFunctionArgs) {
  return redirect(request.url);
}

type loaderData = [string, string, Text2, SettingsInterface, string[][],string];

export async function loader({ params, request }: LoaderFunctionArgs) {
  const glava = params.glava;
  const book = params.book;
  if (!glava || Number.isNaN(parseInt(glava)))
    return redirect(`/myBook/${book}/1`);
  const a = await requireUserId(request, false);
  const tStore = await getTextStore();
  let b = await tStore.getBook(book ?? "");
  if (parseInt(glava) > parseInt(b?.doGl ?? "1")) {
    await tStore.addBook(
      b?.id?.substring(5, b.id?.length - 3) ?? "",
      b?.avtor ?? "",
      b?.public,
      b?.text2 ?? "",
      glava
    );
    if (b) b.doGl = glava;
  }
  // console.log(glava);
  if (typeof a === "string") {
    if (b?.avtor == a) {
      const comments = await tStore.getComments(book ?? "", glava);
      let t = await tStore.getText(`${book}-${glava}`);
      return [book, glava, t ?? tStore.prototypeOfText(), await loadSettings(a), comments,a];
    }
    return redirect(`/book/${book}`);
  }
  return redirect("/login");
}
export default function Book1() {
  const [searchParams] = useSearchParams();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [bUrl, gl, t, settings,_any,username] = useLoaderData<loaderData>();
  const [text, setText] = useState(
    //@ts-ignore
    typeof t === "string" ? "проба" : t?.text ?? "проба"
  );
  const [text2, setText2] = useState(
    //@ts-ignore
    typeof t === "string" ? "проба" : t?.text2 ?? "проба"
  );
  useEffect(() => {
    //@ts-ignore
    setText(typeof t === "string" ? "проба" : t?.text ?? "проба");
    //@ts-ignore
    setText2(typeof t === "string" ? "проба" : t?.text2 ?? "проба");
  }, [gl, t]);
  const feedCode = searchParams.get("feedCode");
  const errCode = searchParams.get("errCode");
  let [feedMsg] = useState(searchParams.get("feed"));
  let [errMsg] = useState(searchParams.get("err"));

  if (!feedMsg) {
    switch (feedCode) {
      case "1":
        feedMsg = "Запазването приключи!";
        break;
      case "2":
        feedMsg = "Публикуването завърши успешно!";
        break;

      default:
        break;
    }
  }

  if (!errMsg) {
    switch (errCode) {
      case "1":
        errMsg = "Моля въведете текст!";
        break;

      default:
        break;
    }
  }

  // console.log("t",t);
  // console.log(text, gl, text2);

  return (
    <div style={{ fontSize: (settings.fontSize ?? 10) / 10 + "rem" }}>
      {/* <Text
            furst2Lines={furst2Lines}
            glava={gl ?? "1"}
            url={`/myBook/${bUrl}`}
            textLines={textLines}
            text2Lines={text2}
            flag1={false}
            /> */}
      <Book
        url={`/myBook/see/${bUrl}`}
        title={"Книга " + bUrl}
        almP={`/myBook/see/${bUrl}/`}
        flag={2}
        params={{
          text,
          glava: gl,
          text2,
          user: username,
          book: { text: bUrl },
        }}
      />
    </div>
  );
}
