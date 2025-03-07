import { redirect } from "@remix-run/node";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import getUserStore from "~/utils/userStore";
import getTextStore from "~/utils/textStore";
import { requireUserId } from "~/utils/session.server";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import RenderTextFrom1String from "~/components/renderText2";
import BookIntro from "~/components/bookIntro";
export async function action({ params, request }: ActionFunctionArgs) {
  return redirect(request.url);
}
export async function loader({ params, request }: LoaderFunctionArgs) {
  const bId = params.book;
  if (!bId) return redirect("/");
  const a = await requireUserId(request, false);
  const tStore = await getTextStore();
  const uStore = await getUserStore();
  const b = await tStore.getBook2(bId ?? " ");
  // console.log(b);
  if (!b) return redirect("/");
  let settings = uStore.getDefaultSettings();
  if (typeof a === "string") {
    const user = await uStore.getUser(a);
    if (user) {
      if (user.glavi) {
        let glava = user.glavi[`Book-${b.text}`];
        if (glava&&a!=b.avtor) {
          if (a != b.avtor)
            // return redirect("/myBook/" + bId+"/"+glava);
            return redirect("/book/" + bId);
        }
      }
      settings = user.settings ?? settings;
    }
  }

  const author = await uStore.getUser(b.avtor);
  if (b.public || a == b.avtor) {
    // return a;
    //console.log(uStore.collection);

    let authorDescription = "Author: " + b.avtor;
    if (author) {
      authorDescription = author.data.forMe;
    }
    return {
      b,
      settings,
      user: a,
      aDescr: authorDescription,
      urlForImmage: "/img/question_mark.png",
      isAvtor: a == b.avtor, 
    };
  }
  return redirect("/");
}
export default function Book1() {
  const b = useLoaderData<typeof loader>();
  const aDescr = b.aDescr;
  const book = b.b;
  const settings = b.settings;
  const smallDescription = book.text2 ?? "small description";
  const isAvtor = b.isAvtor;
  //console.log(book.glava);

  // console.log(textsPlImage);

  //   style={{ padding: 15.4 }}
  //   console.log(book);
  return (
    <Container
      className="centered"
      fluid
      style={{ fontSize: (settings.fontSize ?? 10) / 10 + "rem" }}
    >
      <BookIntro
        smallDescription={smallDescription}
        urlForImage={b.urlForImmage}
        avtor={book.avtor}
        avtorDesc={b.aDescr}
        bName={book.id ?? ""}
      />
      <Row>
        <Col>
          <a
            href={
              isAvtor ? "/myBook/see/" + book.text + "/1" : "/book/" + book.text
            }
          >
            <Button variant="primary">Прочети Ме</Button>
          </a>
        </Col>
      </Row>
    </Container>
  );
}
