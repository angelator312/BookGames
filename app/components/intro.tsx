import { Link } from "@remix-run/react";
import { Button, Container, Row } from "react-bootstrap";

export default function Intro() {
  //   const user = useLoaderData<string>();
  return (
    // <div className="text-center bg-intro">
    <Container className="text-center">
      <Row>
        <h1 className="text-slate-500 font-medium logo f-book-c p-3 line-height-1">
          Добре дошли във виртуалната библиотека за книги игри
        </h1>
      </Row>
      <Row>
        <h3 className="text-slate-500 font-medium logo text-dark text-bold p-3">
          Здравей Анонимен!
        </h3>
      </Row>
      <Row>
        <span className="text-slate-500 font-medium logo text-dark text-bold">
          Това е виртуална библиотека с книги игри!
        </span>
      </Row>
      <Row>
        <span className="text-slate-500 font-medium logo text-dark text-bold">
          За да я разгледаш, трябва да се регистрираш!
        </span>
      </Row>
      <br />
      <br />
      <h2>
        <Link to="/login">
          {/* <span className="text-slate-500 font-medium logo text-primary p-3 logo-medium"> */}
          <Button variant="danger">Вход </Button>
          {/* </span> */}
        </Link>
        <Link
          to="/signup"
          className="link-clear"
          style={{ textDecoration: "none" }}
        >
          {/* <span className="text-slate-500 font-medium logo text-primary p-3 logo-medium"> */}{" "}
          <Button variant="secondary">Регистрация </Button>
          {/* </span> */}
        </Link>
      </h2>
    </Container>
  );
}
