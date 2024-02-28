import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { Link, redirect, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import FormComponent from "~/components/formComp";
import { requireUserId } from "~/utils/session.server";
import getTextStore from "~/utils/textStore";
export async function action({ params, request }: ActionFunctionArgs) {
  const a = await requireUserId(request, true);
  const b = params.b;
  if (typeof b !== "string") return redirect("/");
  const tStore = await getTextStore();
  tStore.deleteBook(b,a);
  return redirect("/");
}
export async function loader({ params, request }: LoaderFunctionArgs) {
  const a = await requireUserId(request, true);
  const tStore = await getTextStore();
  const b = await tStore.getBook(params.b ?? " ");
  if (b?.avtor == a || !b) return b;
  else return redirect("/");
}
function stringCreator() {
  function rand(from: number, to: number) {
    return Math.floor(Math.random() * (to + 1 - from)) + from;
  }
  let str = "";
  let len = rand(5, 10);
  for (let i = 0; i < len; i++) {
    const e = String.fromCharCode(rand(126, 33));
    str += e;
  }
  return str;
}
export default function Idea() {
  const book = useLoaderData<typeof loader>();
  const [verif, setVerif] = useState(1);
  const [ch] = useState(stringCreator());
  const [ch2, setCh2] = useState("0");
  const zagl = book ? book.id?.substring(5, book.id?.length - 3) : "N";
  return (
    <main className="login-main bg-i">
      <div className="container bg-i">
        <div className="bg-white bg-i">
          <h1 className="home-link ">
            Наистина ли искаш да изтриеш книгата {zagl}?
          </h1>
          <p>3 пъти трябва да го докажеш </p>
          {verif == 1 ? (
            <>
              <Row>
                <Col sm="5">
                  <p>Напиши {ch}</p>
                  <input
                    defaultValue={""}
                    onChange={(e) => setCh2(e.target.value)}
                  />
                  <br />
                  <Button
                    disabled={!(ch == ch2)}
                    variant="danger"
                    onClick={() => setVerif(2)}
                  >
                    Да
                  </Button>
                </Col>
              </Row>
            </>
          ) : (
            <FormComponent
              textForSubmit={"Да"}
              to={"/delete/" + book?.text}
              submitVariant="danger"
            />
          )}
          <br />
          <Row>
            <Link to="/">
              <Button variant="secondary">Не</Button>
            </Link>
          </Row>{" "}
        </div>
      </div>
    </main>
  );
}
