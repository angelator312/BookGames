import { redirect } from "@remix-run/node";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import BookPreview from "~/components/book";
import IdeaComp from "~/components/idea";
import getUserStore from "~/utils/userStore";
import getTextStore from "~/utils/textStore";
import { createGorB, requireUserId } from "~/utils/session.server";
import { Row } from "react-bootstrap";
import { getDefaultSettings } from "~/utils/User";
export async function action({ params, request }: ActionFunctionArgs) {
  const form = await request.formData();
  let gl = params.gl;
  if (!form) return redirect(request.url);
  const comment = form.get("comment");
  if (!comment) return redirect(request.url);
  const tStore = await getTextStore();
// console.log( );
  const u=await requireUserId(request);
  if(!u)return redirect("/login");
  await tStore.addComment(params.b ?? "", gl ?? "", u,comment.toString());
  return redirect(request.url);
}
export async function loader({ params, request }: LoaderFunctionArgs) {
  const a = await requireUserId(request, false);
  const tStore = await getTextStore();
  const b = await tStore.getBook(params.b ?? " ");
  if (typeof a === "string") {

    if (b?.avtor == a) return redirect("/myBook/" + params.b);
    if (b?.public) {
      // return a;
      const user = await (await getUserStore()).getUser(a);
      let glava = params.gl ?? user?.glavi[`Book-${b.text}`] ?? "1";
      let text = await tStore.getText(`${b.text}-${glava}`);
      let myComments=await tStore.getMyComments(params.b??"",glava,a)??[];
      if (!text || !glava) return redirect("/");
      if(!user) return redirect("/login?redirectTo="+request.url);
      let segG = text.text;
      let spec = text.text2;
      createGorB("glava", glava, request);
      createGorB("book", b.text, request);

      return { text: segG, glava, text2: spec, b,myComments,user };
    }
  }
  return redirect("/");
}
export default function Idea() {
  const book = useLoaderData<typeof loader>();
  //console.log(book.glava);
  const settings=book.user.settings??getDefaultSettings();
  //   style={{ padding: 15.4 }}
  //   console.log(book);
  const zagl = book.b.id;
  return (
    <div>
      <Row style={{ fontSize: (settings.fontSize ?? 10) / 10 + "rem" }}>
        <BookPreview
          url={`/book/${book.b.text}`}
          title={zagl ?? ""}
          almP={`/img/${book.b.text}-`}
          kr={false}
        />
      </Row>
      <Row>
        <div className="space-y-2 sm:text-left bg-i">
          <IdeaComp
            url={`/book/${book.b.text}/${book.glava}/idea`}
            comments={book.myComments}
          />
        </div>
      </Row>
    </div>
  );
}
