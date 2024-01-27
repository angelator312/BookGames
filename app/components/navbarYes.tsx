import { Navbar, Container } from "react-bootstrap";
export default function NavYesOrNo({
  text,
  yes = true,
}: {
  text: string;
  yes?: boolean;
}) {
  if (text.length>2) {
    return (
      <Navbar bg={yes ? "success" : "danger"}>
        <Container>
          <Navbar.Brand>{text}</Navbar.Brand>
        </Container>
      </Navbar>
    );
  }else return<></>;
}
