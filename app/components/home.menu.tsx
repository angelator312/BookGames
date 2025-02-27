import menu from "~/helps/menu.png";
import { useState } from "react";
import { Button, Col, Offcanvas, Row } from "react-bootstrap";
import type { SettingsInterface, User } from "~/utils/User";

function MenuForHome({
  settings,
  user,
  logout = true,
}: {
  logout?: boolean;
  settings?: SettingsInterface;
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
        placement="end"
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
            <Col className="mt-2">
              <h3 className="font-medium text-dark">Здравей {user.user}</h3>
            </Col>
          </Row>{" "}
          <Row>
            <Col className="mt-2">
              <a href="/" className="">
                <span className="text-slate-500 font-medium logo  text-primary">
                  Начало
                </span>
              </a>
            </Col>
          </Row>
          <Row>
            <Col className="mt-2">
              <a href="/Profil" className="">
                <span className="text-slate-500 font-medium logo  text-primary">
                  Профил
                </span>
              </a>
            </Col>
          </Row>
          {/* {settings.tutorial ? (
            <Row>
              <Col className="mt-2">
                <a href="/profil/stopTutorial" className="">
                  <span className="text-slate-500 font-medium logo  text-primary">
                    Спри подсказките
                  </span>
                </a>
              </Col>
            </Row>
          ) : (
            ""
          )} */}
          <Row>
            <Col className="mt-2">
              <a href="/newBook" className="">
                <span className="text-slate-500 font-medium logo  text-primary">
                  Нова книга
                </span>
              </a>
            </Col>
          </Row>
          <Row>
            <Col className="mt-2">
              <a
                href="https://github.com/angelator312/Systezanie-1"
                className=""
              >
                <span className="text-slate-500 font-medium logo  text-primary">
                  Github
                </span>
              </a>
            </Col>
          </Row>
          {user.admin ? (
            <Row>
              <Col className="mt-2">
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
          {logout ? (
            <Row>
              <Col className="mt-2">
                <a color="red" href="/logout" className="">
                  <span className="text-slate-500 font-medium logo text-primary">
                    Излез от профила
                  </span>
                </a>
              </Col>
            </Row>
          ) : (
            <Row>
              <Col className="mt-2">
                <a color="red" href="/signup" className="">
                  <span className="text-slate-500 font-medium logo text-primary">
                    Регистрация
                  </span>
                </a>
              </Col>
            </Row>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

export default MenuForHome;
