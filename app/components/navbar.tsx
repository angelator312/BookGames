import { useState } from "react";
import {Button,Offcanvas }from "react-bootstrap";
import menu from "~/helps/menu.png";

function Example({path,title,glava}:{path:string,title:string,glava:string}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button
        className="btn-menu-my"
        variant="outline-light"
        onClick={handleShow}
      >
        <img width={30} height={30} src={menu} alt="menu button" />
      </Button>

      <Offcanvas show={show} onHide={handleClose} style={{ width: "95%" }}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            {title} Глава {glava}
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body style={{ width: "95% !important" }}>
          <img alt="Липсват снимка/и" src={path + glava + ".jpg"} />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Example;
