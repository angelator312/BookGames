import { redirect } from "@remix-run/node";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import getUserStore from "~/utils/userStore";
import getTextStore from "~/utils/textStore";
import { requireUserId } from "~/utils/session.server";
import { Card, Col, Container, Row } from "react-bootstrap";
import RenderTextWithDecoder from "~/components/renderText2";
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
      let glava = user?.glavi[`Book-${b.text}`];
      if (glava) {
        return redirect("/book" + bId);
      }
      settings = user.settings ?? settings;
    }
  }
  if (b.public) {
    // return a;
    //console.log(uStore.collection);

    const author = await uStore.getUser(b.avtor);
    let authorDescription = "Author: " + b.avtor;
    if (author) {
      authorDescription = author.data.forMe;
    }
    return {
      b,
      settings,
      user: a,
      aDescr: authorDescription,
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
  //console.log(book.glava);
  let textsPlImage: string[] = [];

  console.log(textsPlImage);

  //   style={{ padding: 15.4 }}
  //   console.log(book);
  return (
    <Container
      fluid
      style={{ fontSize: (settings.fontSize ?? 10) / 10 + "rem" }}
    >
      <Row className="centered">
        <Col>
          <h1>
            {/* <a href={"/book/" + book.b.text} style={{ textDecoration: "none" }}> */}
            {book.id}
            {/* </a> */}
          </h1>
        </Col>
      </Row>
      <Row>
        <Col>
          {/* Za knigata */}
          <RenderTextWithDecoder texts={smallDescription} />
        </Col>
        <Col>
          {/* Za Avtora */}
          <Card>
            <Card.Img src="a" />
            <Card.Body>
              <Card.Title>{book.avtor}</Card.Title>
              <Card.Text>
                <RenderTextWithDecoder texts={aDescr} />
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col>
        </Col>
      </Row>
    </Container>
  );
}
