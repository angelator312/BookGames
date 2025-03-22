import type {
  BookInterface as BookType,
  TextInterface as Text2,
} from "~/utils/textStore";
import { redirect } from "@remix-run/node";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, useNavigate, useSearchParams } from "@remix-run/react";
import getTextStore from "~/utils/textStore";
import { requireUserId } from "~/utils/session.server";
import DropDown1 from "~/components/dropdown";
import { useEffect, useState } from "react";
import { Col, Container, Nav, Row, Tab } from "react-bootstrap";
import EditText from "~/components/editText";
import NavYesOrNo from "~/components/navbarYes";
import BookPreview from "~/components/book";
import getUserStore from "~/utils/userStore";
import type { User } from "~/utils/User";
import MyBookSettingsComponent from "~/components/BookSettingsComponent";
import type { VariableCollection } from "~/utils/VariableThings";
import { getDefaultVariables } from "~/utils/VariableThings";
export async function action({ request, params }: ActionFunctionArgs) {
  const userId = await requireUserId(request);
  if (userId) {
    let isInBookSettings = false;
    const formData = await request.formData();
    if (formData) {
      const tags = formData.get("tags")?.toString();
      //for tags
      if (typeof tags === "string") {
        const tagList = tags.split(",").map((tag) => tag.trim());
        const bookId = params.book;
        if (bookId) {
          // console.log("tags:", tagList);
          const tStore = await getTextStore();
          await tStore.setBook(bookId, { tags: tagList });
        }
      }
      // for Variables
      const isHavingVars = formData.get("isHavingVars")?.toString();
      if (isHavingVars == "yes") {
        let values: VariableCollection = {};
        formData.forEach((value, key) => {
          if (key.startsWith("var/")) {
            key = key.substring(4);
            values[key] = {
              name: key,
              value: parseInt(value.toString(), 10),
            };
          }
        });
        const bId = params.book;
        if (bId) {
          // console.log("values:", values);
          const tStore = await getTextStore();
          await tStore.saveDefaultVariables(bId, values);
          isInBookSettings = true;
        }
      }
    }
    return redirect(new URL(request.url).pathname + isInBookSettings ? "" : "?default=2");
  }
  return redirect("/login");
}

type loaderData = [
  BookType,
  string,
  Text2,
  string,
  string[][],
  User,
  VariableCollection,
  string,
  string[]
];

export async function loader({ params, request }: LoaderFunctionArgs) {
  const glava = params.glava;
  const bId = params.book;
  if (!bId) return;
  if (!glava || Number.isNaN(parseInt(glava)))
    return redirect(`/myBook/${bId}/1`);
  const userId = await requireUserId(request, false);
  const tStore = await getTextStore();
  let book = await tStore.getBook(bId ?? "");
  if (!book) return redirect(`/`);

  if (parseInt(glava) > parseInt(book.doGl ?? "1")) {
    if (book.id) {
      // console.log("gl:", parseInt(glava), parseInt(book.doGl ?? "1"));
      book.doGl = glava;
      await tStore.setBook(bId, { doGl: glava });
    }
  }
  // console.log(glava);
  if (typeof userId === "string") {
    if (book.avtor == userId) {
      const uStore = await getUserStore();
      const comments = await tStore.getComments(bId ?? "", glava);
      let glavaOtText = await tStore.getText(`${bId}-${glava}`);
      return [
        await tStore.getBook(bId),
        glava,
        glavaOtText ?? tStore.getDefaultText(),
        book.doGl,
        comments,
        await uStore.getUser(userId),
        book.defaultVariables ?? getDefaultVariables(),
        book.text2,
        book.tags ?? [],
      ];
    }
    return redirect(`/book/${bId}`);
  }
  return redirect("/login?redirectTo=" + request.url);
}
export default function MyBookRoute() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [book, glavaString, glavaOtText, doN, commentsOrg, user, vars, bookResume, tags] =
    useLoaderData<loaderData>();
  const bookUrl = book.text;// otherName is bookID(gb10/gb18)
  let comments = commentsOrg;
  function update() {
  }
  const [istoriaText, setIstoriaText] = useState(
    //@ts-ignore
    typeof glavaOtText === "string" ? "проба" : glavaOtText?.text ?? "проба"
  );
  const [variantiText, setVariantiText] = useState(
    //@ts-ignore
    typeof glavaOtText === "string" ? "проба" : glavaOtText?.text2 ?? "проба"
  );
  useEffect(() => {
    //@ts-ignore
    setIstoriaText(typeof glavaOtText === "string" ? "проба" : glavaOtText?.text ?? "проба");
    //@ts-ignore
    setVariantiText(typeof glavaOtText === "string" ? "проба" : glavaOtText?.text2 ?? "проба");
  }, [glavaString, glavaOtText]);
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

  let istoriaLines = istoriaText.replace("\r", "\n").split("\n\n");
  // let furst2Lines = [textLines[0], textLines[1]];
  istoriaLines = istoriaLines.slice(2);
  // console.log("t",t);
  // console.log(text, gl, text2);

  return (
    <div className="m-l-3">
      <NavYesOrNo text={feedMsg ?? ""} />
      <NavYesOrNo text={errMsg ?? ""} yes={false} />
      <br />
      <Tab.Container
        id="left-tabs-example"
        defaultActiveKey={
          searchParams.get("default") == "2" ? "settings" : "editAndPreview"
        }
      >
        <Row>
          <Nav>
            <Col>
              <Nav.Item>
                <Nav.Link eventKey="editAndPreview">Редактирай</Nav.Link>
              </Nav.Item>
            </Col>
            <Col>
              <Nav.Item>
                <Nav.Link eventKey="settings">Настройки</Nav.Link>
              </Nav.Item>
            </Col>
            <Col>
              <DropDown1
                url={`/myBook/${bookUrl}`}
                // @ts-ignore
                doN={parseInt(doN ?? "15")}
                // @ts-ignore
                activeDrop={parseInt(glavaString)}
              />
            </Col>
            <Col>
              <Nav.Item>
                <Nav.Link
                  eventKey="editAndPreview"
                  onClick={() => {
                    window.open(`/myBook/see/${bookUrl}/${glavaString}`);
                  }}
                >
                  Преглед
                </Nav.Link>
              </Nav.Item>
            </Col>
          </Nav>
        </Row>
        <Row>
          <Tab.Content
            id="uncontrolled-tab-example"
            className="mb-3"
            key={"space"}
          >
            {/* <Button eventKey="preview" title="Преглед" onClick={()=>{window.open(`/myBook/see/${bUrl}/${gl}`);}}> */}

            {/* </Button> */}
            <Tab.Pane eventKey="editAndPreview" title="Редактирай">
              <Container fluid className="h-100">
                <Row className="mt-3">
                  <Col>
                    <EditText
                      text={istoriaText}
                      text2={variantiText}
                      glava={glavaString ?? "1"}
                      bUrl={`${bookUrl}`}
                      setText={setIstoriaText}
                      setText2={setVariantiText}
                      priIzvikvane={update}
                      key={glavaString}
                    />
                  </Col>
                  <Col style={{ height: "80vh", overflow: "scroll" }}>
                    <BookPreview
                      url={`/myBook/${bookUrl}`}
                      title={book.id ?? "Книга " + bookUrl}
                      almP={`/myBook/${bookUrl}/`}
                      flag={3}
                      params={{
                        text: istoriaText,
                        glava: glavaString,
                        text2: variantiText,
                        //@ts-ignore
                        user: user ?? "",
                        book: { text: bookUrl },
                        //@ts-ignore
                        variables: vars,
                      }}
                      kr={false}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col></Col>
                </Row>
              </Container>
            </Tab.Pane>
            <Tab.Pane eventKey="settings" title="Настройки">
              <MyBookSettingsComponent
                bName={book.id ?? ""}
                //@ts-ignore
                user={
                  user
                  //   {
                  //   ...user,
                  //   // _id:new ObjectId(user._id)
                  // }
                }
                tags={tags}
                bookResume={bookResume}
                name={bookUrl}
                vars={vars}
              />
            </Tab.Pane>
          </Tab.Content>
          <Container>
            {/* @ts-ignore */}
            {comments.map((e, i) => (
              <Row key={i}>
                <Col sm="7">
                  <NavYesOrNo
                    text={e[0].length > 0 ? `${e[0]}\n от ${e[1]}` : ""}
                    f={(a: any) => {
                      navigate(
                        `/myBook/${bookUrl}/${glavaString}/deleteComment/${i}?p="sx"`
                      );
                    }}
                  />
                </Col>
              </Row>
            ))}
          </Container>
        </Row>
      </Tab.Container>
    </div>
  );
}
