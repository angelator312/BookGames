import { Button, Form, InputGroup, Row } from "react-bootstrap";
export default function FormComponent({
  to,
  textForSubmit,
  texts = [],
  names = [],
  textsHidden = [],
  namesHidden = [],
  submitVariant = "success",
  method = "post",
  handleClick=()=>"",
  disabled=false
}: {
  texts?: string[];
  names?: string[];
  textsHidden?: string[];
  namesHidden?: string[];
  textForSubmit: string;
  to: string;
  disabled?: boolean;
  submitVariant?: string;
  method?: string;
  handleClick?: () => void;
}) {
  return (
    <Form method={method} action={to} >
      <InputGroup className="mb-3">
        {texts.map((e, i) => (
          <Form.Group
            as={Row}
            className="mb-3"
            controlId={i.toString()}
            key={i}
          >
            <Form.Label column sm={10}>
              {e}
            </Form.Label>
            <Form.Control
              type="text"
              value={e}
              name={names[i] ?? "text" + (i + 1)}
            />
          </Form.Group>
        ))}
      </InputGroup>
      <InputGroup className="mb-3">
        <Button
          disabled={disabled}
          onClick={handleClick}
          variant={submitVariant}
          as="input"
          type="submit"
          value={textForSubmit}
        />
      </InputGroup>
      <InputGroup className="mb-3">
        {textsHidden.map((e, i) => (
          <Form.Control
            type="hidden"
            key={i}
            value={e}
            name={namesHidden[i] ?? "text" + (i + 1)}
          />
        ))}
      </InputGroup>
    </Form>
  );
}
