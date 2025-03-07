import { Button, Form } from "react-bootstrap";
import type { Izbor } from "./decoderAdvanced";

export default function IzborComponent({
  izbor,
  url,
  flag,
}: {
  izbor: Izbor;
  url: string;
  flag: boolean;
}) {
  // [number,number,number,string]} ) {
  // console.log(izbor);
  return (
    <Form className="my-2" method="post" action={flag ? `${url}` : `${url}/${izbor.glava}`}>
      <Form.Control type="hidden" name="to" value={izbor.glava.toString()} />
      <Form.Control
        type="hidden"
        name="var/резултат"
        value={izbor.scoreChange.toString()}
      />
      <Button variant="outline-primary" type="submit" disabled={izbor.disabled}>{izbor.text}</Button>
    </Form>
    // <FormComponent
    //   disabled={izbor.disabled}
    //   textForSubmit={izbor.text}
    //   to={flag ? `${url}` : `${url}/${izbor.glava}`}
    //   textsHidden={[izbor.glava.toString(),izbor.scoreChange.toString()]}
    //   namesHidden={["to","var/резултат"]}
    //   submitVariant="outline-secondary"
    // />
  );
}
