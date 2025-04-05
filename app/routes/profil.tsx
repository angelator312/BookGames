import { Editor } from "@monaco-editor/react";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { useLoaderData, useSearchParams } from "@remix-run/react";
import { useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  Col,
  Container,
  Form,
  InputGroup,
  Modal,
  Row,
  Spinner,
  Tab,
  Tabs,
} from "react-bootstrap";
import FormComponent from "~/components/formComp";
import MenuForHome from "~/components/home.menu";
import NavYesOrNo from "~/components/navbarYes";
import PreviewImages from "~/components/previewOnImages";
import { AuthorResume } from "~/components/userResume";
import getImageStore from "~/utils/fileStore";
import type { MiniInterface } from "~/utils/ImageThings";
import { requireUserId } from "~/utils/session.server";
import type { SettingsInterface, User, UserData } from "~/utils/User";
import getUserStore from "~/utils/userStore";
import { MAX_FILE_SIZE } from "../utils/Consts";
import { AuthorDescription } from "~/components/authorDescription";
import { useDropzone } from "react-dropzone";
import GetImagesModal from "~/components/getImages";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const a = await requireUserId(request, false);
  // console.log(a);
  // console.log(await knigi(a));

  if (typeof a === "string") {
    const uStore = await getUserStore();
    const user = await uStore.getUser(a);
    if (user) {
      const iStore = await getImageStore();
      const gallery = await iStore.listImagesForUser(a);
      // console.log([
      //   user,
      //   user.settings ?? uStore.getDefaultSettings(),
      //   user.data ?? uStore.getDefaultUserData(),
      //   gallery.map((a) => {
      //     return { id: a.id, name: a.name };
      //   }),
      // ]);

      return [
        user,
        user.settings ?? uStore.getDefaultSettings(),
        user.data ?? uStore.getDefaultUserData(),
        gallery,
      ];
    }
  }
  return redirect("/login?redirectTo=" + request.url);
};
type loaderType = [User, SettingsInterface, UserData, MiniInterface[]];
export default function Settings() {
  const [user, settings, data] = useLoaderData<loaderType>();
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    onDrop(acceptedFiles, fileRejections, event) {},
  });
  const [text, setText] = useState(data.forMe);
  const [showInsertImage, setShowInsertImage] = useState(false);
  const [reloadAuthorSeed, setReloadAuthorSeed] = useState(0);
  const handleCloseInsertImage = () => setShowInsertImage(false);
  const handleInsertImage = (imgId: string) => {
    setShowInsertImage(false);
    fetch(`/setAuthorImage/${imgId}`);
    user.data.authorImg = "/getImage/" + imgId;
    setReloadAuthorSeed(Math.random());
  };
  const [fontSize, setFontSize] = useState(settings.fontSize);
  const [minis, setMinis] = useState<MiniInterface[]>([]);
  const [showImages, setShowImages] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(true);
  useEffect(() => {
    async function getImages() {
      setMinis(await (await fetch("/getImages")).json());
    }
    getImages().then((r) => {
      setShowImages(true);
    });
  }, []);
  const [idDeleteModal, setIdDeleteModal] = useState<string>("ne");
  function handleEditorChange(value: any, event: any) {
    setText(value);
  }
  const search = useSearchParams();
  const [errorText, setErrorText] = useState(search[0].get("error") ?? "");
  const [goodText, setGoodText] = useState(search[0].get("good") ?? "");
  const [showError, setShowError] = useState(false);
  const [showGood, setShowGood] = useState(false);
  useEffect(() => {
    switch (errorText) {
      case "2":
        setErrorText("Грешка при  Паролите(Някъде).");
        setShowError(true);
        break;
      case "3":
        setErrorText("Грешка при написването на втората нова парола.");
        setShowError(true);
        break;
      case "4":
        setErrorText("Грешка при първата парола.");
        setShowError(true);
        break;
      case "5":
        setErrorText("Грешка при промяна на паролата.");
        setShowError(true);
        break;
      case "6":
        setErrorText("Прекалено голяма картинка(най-много 5mb)!");
        setShowError(true);
        break;
      default:
        break;
    }
    switch (goodText) {
      case "1":
        setGoodText("Успешно променена парола!");
        setShowGood(true);
        break;
      default:
        break;
    }
  }, [errorText, goodText, showError, showGood]);
  return (
    <Container>
      <MenuForHome
        //@ts-ignore
        user={user}
        settings={settings}
      />
      <Row>
        <Col>
          <NavYesOrNo text={showError ? errorText : ""} yes={false} />
          <NavYesOrNo text={showGood ? goodText : ""} yes={true} />
        </Col>
      </Row>
      <Tabs defaultActiveKey={search[0].get("koe") ?? "1"}>
        <Tab title="За мен" eventKey={"1"}>
          <Row>
            <Col>
              {/* <Form action="/zapaziForMe"> */}
              <Row>
                <Col>
                  <Editor
                    options={{
                      unicodeHighlight: {
                        ambiguousCharacters: false,
                      },
                    }}
                    height="32vh"
                    defaultLanguage="bg"
                    onChange={handleEditorChange}
                    // name="text"
                    // placeholder="Здравей,Човече"
                    defaultValue={text == "" ? "Здравей,Човече" : text}
                  />
                </Col>
                <Col sm={4}>
                  <AuthorDescription
                    key={reloadAuthorSeed}
                    avtorData={{
                      ...user.data,
                      forMe: text,
                    }}
                    avtor={user.user}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormComponent
                    method="get"
                    textForSubmit={"Запази"}
                    to={"/zapaziForMe"}
                    namesHidden={["forMe", "toUrl"]}
                    textsHidden={[text, "/Profil?koe=1"]}
                  />
                </Col>
                {/* <Form.Control type="submit" value={"Запази"} />
                    <Form.Control type="hidden" value={text} name="forMe" />
                    <Form.Control
                    type="hidden"
                    value="/Profil?koe=1"
                    name="toUrl"
                    /> */}
              </Row>
              <Row>
                <Col>
                  <Button onClick={() => setShowInsertImage(true)}>
                    Избери профилна снимка
                  </Button>
                </Col>
              </Row>
              {/* </Form> */}
            </Col>
          </Row>
        </Tab>
        <Tab title="Настройки" eventKey={"2"}>
          <Row>
            <Col>
              <Form action="/zapaziSettings">
                <Form.Group as={Row} className="mb-3">
                  <Form.Label
                    column
                    sm={10}
                    style={{
                      fontSize: Math.max(fontSize, 10) / 10 + "rem",
                    }}
                  >
                    Големина на шрифта
                  </Form.Label>
                  <Form.Control
                    min={10}
                    max={50}
                    type="number"
                    value={fontSize}
                    onChange={(e) =>
                      setFontSize(Math.min(parseInt(e.target.value ?? 2), 50))
                    }
                    name="fontSize"
                  />
                  <Form.Control
                    type="hidden"
                    value="/profil?koe=2"
                    name="toUrl"
                  />
                </Form.Group>
                <Button type="submit">Запази</Button>
              </Form>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col>
              <h2>Смяна на паролата</h2>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form action="/changePassword" method="post">
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm={10}>
                    Стара парола
                  </Form.Label>
                  <Form.Control
                    type="password"
                    name="oldPassword"
                    placeholder="Стара парола"
                  />
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm={10}>
                    Нова парола
                  </Form.Label>
                  <Form.Control
                    minLength={8}
                    type="password"
                    name="newPassword"
                    placeholder="Нова парола"
                  />
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm={10}>
                    Повторете Новата парола
                  </Form.Label>
                  <Form.Control
                    minLength={8}
                    type="password"
                    name="newPassword2"
                    placeholder="Нова парола"
                  />
                </Form.Group>
                <Form.Control
                  type="hidden"
                  value="/profil?koe=2"
                  name="toUrl"
                />
                <Button type="submit">Запази</Button>
              </Form>
            </Col>
          </Row>
        </Tab>
        <Tab title="Галерия" eventKey={"3"}>
          <Row>
            <Col>
              {showImages ? (
                <PreviewImages
                  minis={minis ?? []}
                  handleInsertImage={(a) => {
                    return;
                  }}
                  options={{
                    names: false,
                    delete: true,
                    handleDeleteImage: (id) => {
                      setIdDeleteModal(id);
                    },
                    xxl: 2,
                  }}
                />
              ) : (
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              )}
            </Col>
          </Row>
          <Row>
            <Form
              action="/uploadImage"
              encType="multipart/form-data"
              method="post"
            >
              <section>
                <div {...getRootProps({ className: "dropzone" })}>
                  <input name={"file"} {...getInputProps()} />
                  <p>
                    Дръпнете файл тук или кликнете за да изберете файл за
                    качване.
                  </p>
                </div>
              </section>
              {acceptedFiles.length > 0 ? (
                <Button type="submit" className="my-5">
                  Качи
                </Button>
              ) : null}
            </Form>
          </Row>
          <Modal
            show={idDeleteModal != "ne"}
            onHide={() => setIdDeleteModal("ne")}
          >
            <Modal.Header closeButton>
              <Modal.Title>Премахни</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Искате ли да премахнете?
              <PreviewImages
                minis={minis.filter((a) => a.id == idDeleteModal)}
                handleInsertImage={(a) => {
                  return;
                }}
                options={{ names: false, xxl: 5 }}
              />
              <Row>
                <Col>
                  <Form action="/deleteImage">
                    <Form.Control
                      type="hidden"
                      value={idDeleteModal}
                      name="id"
                    />
                    <Form.Control
                      type="hidden"
                      value="/profil?koe=3"
                      name="toUrl"
                    />
                    <Button type="submit" className="mx-2">
                      Премахни
                    </Button>
                    <Button
                      className="mx-2"
                      onClick={() => setIdDeleteModal("ne")}
                    >
                      Отказ
                    </Button>
                  </Form>
                </Col>
              </Row>
            </Modal.Body>
          </Modal>
        </Tab>
      </Tabs>
      <GetImagesModal
        handleClose={handleCloseInsertImage}
        show={showInsertImage}
        handleInsertImage={handleInsertImage}
      />
    </Container>
  );
}
