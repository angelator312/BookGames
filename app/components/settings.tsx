import menu from "~/helps/menu.png";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { Button, Col, Form, Offcanvas, Row, Tab, Tabs } from "react-bootstrap";
import type { Book } from "~/utils/textStore";
import type { SettingsInterface } from "~/utils/userStore";
type loader = [string, Book[][], SettingsInterface];

function Settings() {
  const loaderThings = useLoaderData<loader>();
  const settings = loaderThings[2];
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

      <Offcanvas
        className="offcanvas-without-linkProblems"
        show={show}
        onHide={handleClose}
        style={{ width: "85%" }}
      >
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
                    type="number"
                    value={fontSize}
                    onChange={(e) => setFontSize(parseInt(e.target.value ?? 2))}
                    name="fontSize"
                  />
                </Form.Group>
              </Form>
            </Tab>
            <Tab eventKey={"Цвят"} title={"Цвят"}></Tab>
            <Tab eventKey={"Профил"} title={"Профил"}>
              <Row>
                <Col style={{ marginTop: "1rem" }}>
                  <a href="/logout" className="">
                    <span className="text-slate-500 font-medium logo text-primary">
                      Излез от профила
                    </span>
                  </a>
                </Col>
              </Row>
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

export default Settings;
