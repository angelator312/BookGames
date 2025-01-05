import menu from "~/helps/menu.png";
import { useState } from "react";
import { Button, Col, Offcanvas, Row } from "react-bootstrap";
import type { SettingsInterface, User } from "~/utils/userStore";

function MenuForHome({
  settings,
  user,
}: {
  settings: SettingsInterface;
  user: User;
}) {
  //@ts-ignore
  //console.log(settings);
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
          <Offcanvas.Title className="text-slate-500 font-medium logo f-book-c">
            Навигация на сайта
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body
          style={{ width: "95% !important" }}
          className="offcanvas-without-linkProblems"
        >
          <Row>
            <Col style={{ marginTop: "1rem" }}>
              <h3 className="font-medium text-dark">Здравей {user.user}</h3>
            </Col>
          </Row>{" "}
          <Row>
            <Col style={{ marginTop: "1rem" }}>
              <a href="/" className="">
                <span className="text-slate-500 font-medium logo  text-primary">
                  Начало
                </span>
              </a>
            </Col>
          </Row>
          <Row>
            <Col style={{ marginTop: "1rem" }}>
              <a href="/Settings" className="">
                <span className="text-slate-500 font-medium logo  text-primary">
                  Настройки
                </span>
              </a>
            </Col>
          </Row>
          {settings.tutorial ? (
            <Row>
              <Col style={{ marginTop: "1rem" }}>
                <a href="/profil/stopTutorial" className="">
                  <span className="text-slate-500 font-medium logo  text-primary">
                    Спри подсказките
                  </span>
                </a>
              </Col>
            </Row>
          ) : (
            ""
          )}
          <Row>
            <Col style={{ marginTop: "1rem" }}>
              <a href="/newBook" className="">
                <span className="text-slate-500 font-medium logo  text-primary">
                  Нова книга
                </span>
              </a>
            </Col>
          </Row>
          {user.admin ? (
            <Row>
              <Col style={{ marginTop: "1rem" }}>
                <a href="/admin" className="">
                  <span className="text-slate-500 font-medium logo  text-primary">
                    Администрация
                  </span>
                </a>
              </Col>
            </Row>
          ) : (
            ""
          )}
          {/* Винаги на края е това↓↓↓ */}
          <Row>
            <Col style={{ marginTop: "1rem" }}>
              <a color="red" href="/logout" className="">
                <span className="text-slate-500 font-medium logo text-primary">
                  Излез от профила
                </span>
              </a>
            </Col>
          </Row>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

export default MenuForHome;
