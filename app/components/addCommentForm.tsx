import { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";

export function AddCommentForm({bId,chapter}:{bId:string,chapter:number}) {
  const [text, setText] = useState("");
  return (
    <Form action="/addComment" method="POST">
      <InputGroup>
        <InputGroup.Text>Заглавие</InputGroup.Text>
        <Form.Control name="title" type="text" />
      </InputGroup>
      <InputGroup>
        <InputGroup.Text>Текст</InputGroup.Text>
        <Form.Control
          as="textarea"
          onChange={(e) => setText(e.target.value)}
        ></Form.Control>
      </InputGroup>
      <Button type="submit">Коментирай</Button>
      <input type="hidden" name="text" value={text} />
      <input type="hidden" name="bookId" value={bId} />
      <input type="hidden" name="chapter" value={chapter} />
    </Form>
  );
}
