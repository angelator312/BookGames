import { useState } from "react";
import { Button, Offcanvas } from "react-bootstrap";
import menu from "~/helps/menu.png";

//Note: This is used nowhere.
function ImageNavbar({
  path,
  title,
  glava,
  flag = 0,
}: {
  path: string;
  title: string;
  glava: string;
  flag?: number;
}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div
      className={
        flag ? (flag == 2 ? "btn-menu-my-2" : "btn-menu-my-3") : "btn-menu-my"
      }
    >
      <Button variant="outline-light" onClick={handleShow}>
        <img width={30} height={30} src={menu} alt="menu button" />
      </Button>

      <Offcanvas
        className="offcanvas-without-linkProblems"
        show={show}
        onHide={handleClose}
        style={{ width: "95%" }}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            {title} Глава {glava}
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body style={{ width: "95% !important" }}>
          <img alt="Липсват снимка/и" src={path + glava + ".jpg"} />
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

export default ImageNavbar;
