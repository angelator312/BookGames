import { Link } from "@remix-run/react";
import { Button } from "react-bootstrap";

export default function IndexRoute() {
  return (
    <div className="centered">
      <h1 className="text-bold text-dark">404 Not Found</h1>
      <Link to="/">
        <Button>Начало</Button>
      </Link>
    </div>
  );
}
