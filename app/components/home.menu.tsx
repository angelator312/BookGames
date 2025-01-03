import menu from "~/helps/menu.png";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { Button, Col, Form, Offcanvas, Row, Tab, Tabs } from "react-bootstrap";
import type { Book } from "~/utils/textStore";
import type { SettingsInterface, User } from "~/utils/userStore";
type loaderIndex = [string, Book[][], User];

function MenuForHome() {
  const loaderThings = useLoaderData<loaderIndex>();
  //@ts-ignore
  const settings: SettingsInterface = loaderThings[2].settings;
  const user = loaderThings[2];
  //console.log(settings);

  const [fontSize, setFontSize] = useState(settings.fontSize);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };

  return (
    <div>
      <Button
        variant="outline-light"
        onClick={handleShow}
        className="btn-menu-my"
      >
        <img width={30} height={30} src={menu} alt="menu button" />
      </Button>

      <Offcanvas show={show} onHide={handleClose} style={{ width: "85%" }}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Настройки</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body style={{ width: "95% !important" }}>
          <Tabs
            defaultActiveKey="preview"
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            <Tab eventKey={"текст"} title={"Текст"}>
              <Form action="/zapaziSettings">
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm={10}>
                    Големина на шрифта
                  </Form.Label>
                  <Form.Control
                    min={10}
                    max={50}
                    type="number"
                    value={fontSize}
                    onChange={(e) => setFontSize(parseInt(e.target.value ?? 2))}
                    name="fontSize"
                  />
                </Form.Group>
              </Form>
            </Tab>
            <Tab eventKey={"Тема"} title={"Тема"}></Tab>
            <Tab eventKey={"Профил"} title={"Профил"}>
              <Row>
                <Col style={{ marginTop: "1rem" }}>
                  <h3 className="font-medium text-dark">Здравей {user.user}</h3>
                </Col>
              </Row>
              <Row>
                <Col style={{ marginTop: "1rem" }}>
                  <a color="red" href="/logout" className="">
                    <span className="text-slate-500 font-medium logo text-primary">
                      Излез от профила
                    </span>
                  </a>
                </Col>
              </Row>
              {settings.tutorial ? (
                <Row>
                  <Col style={{ marginTop: "1rem" }}>
                    <Button
                      variant="link"
                      onClick={async () => {
                        settings.tutorial = false;
                        await fetch("/profil/stopTutorial");
                        setShow(false);
                      }}
                      className="text-slate-500 font-medium logo text-primary"
                    >
                      Спри Подсказките
                    </Button>
                  </Col>
                </Row>
              ) : (
                ""
              )}
            </Tab>
            <Tab eventKey={"Създаване"} title={"Създаване"}>
              <Row>
                <Col style={{ marginTop: "1rem" }}>
                  <a href="/newBook" className="">
                    <span className="text-slate-500 font-medium logo  text-primary">
                      Нова книга
                    </span>
                  </a>
                </Col>
              </Row>
            </Tab>
          </Tabs>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

export default MenuForHome;
