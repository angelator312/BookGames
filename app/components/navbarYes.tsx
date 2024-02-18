import { useState } from "react";
import { Alert } from "react-bootstrap";
export default function NavYesOrNo({
  text,
  yes = true,
  f = (a:any) => {},
}: {
  text: string;
  yes?: boolean;
  f?: Function;
}) {
  const [show, setShow] = useState(true);

  if (show && text.length > 2) {
    return (
      <Alert
        variant={yes ? "success" : "danger"}
        onClose={() =>{ setShow(false);f(1);}}
        dismissible
      >
        <Alert.Heading>{text}</Alert.Heading>
      </Alert>
    );
  }
  return <></>;
}
