import menu from "~/helps/menu.png";
import { useState } from "react";
import { Button, Col, Offcanvas, Row } from "react-bootstrap";

function MenuForIntro() {
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
        style={{ width: "15%" }}
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
            <Col >
              <h3 className="font-medium text-dark">Здравей Анонимен </h3>
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
          {/* {settings.tutorial ? (
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
          )} */}
          <Row>
            <Col style={{ marginTop: "1rem" }}>
              <a href="/login" className="">
                <span className="text-slate-500 font-medium logo  text-primary">
                  Влез
                </span>
              </a>
            </Col>
          </Row>
          <Row>
            <Col style={{ marginTop: "1rem" }}>
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
          {/* Винаги на края е това↓↓↓ */}
          <Row>
            <Col style={{ marginTop: "1rem" }}>
              <a color="red" href="/signup" className="">
                <span className="text-slate-500 font-medium logo text-primary">
                  Регистрация
                </span>
              </a>
            </Col>
          </Row>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

export default MenuForIntro;
