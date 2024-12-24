import { useState } from "react";
import { Button, Form, Offcanvas, Row, Tab, Tabs } from "react-bootstrap";

function Settings() {
  const [show, setShow] = useState(false);
  const [fontSize, setFontSize] = useState("2");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <Button variant="outline-light" onClick={handleShow}>
        <span className="text-slate-500 font-medium logo text-center text-primary">
          Настройки
        </span>
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
              <Form action="/zapaziFontSettings">
                <Form.Group
                  as={Row}
                  className="mb-3"
                  
                >
                  <Form.Label column sm={10}>
                    Големина на шрифта
                  </Form.Label>
                  <Form.Control
                    type="number"
                    value={fontSize}
                    onChange={(e) => setFontSize(e.target.value??2)}
                    name="fontSize"
                  />
                </Form.Group>
              </Form>
            </Tab>
            <Tab eventKey={"език"} title={"Език"}></Tab>
            <Tab eventKey={"Цвят"} title={"Цвят"}></Tab>
          </Tabs>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

export default Settings;
