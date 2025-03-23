import { useState } from "react";
import { Button, Form, FormGroup, InputGroup } from "react-bootstrap";

export function AddCommentForm({bId,chapter}:{bId:string,chapter:number}) {
  const [text, setText] = useState("");
  return (
    <Form method="POST" action="/addComment">
      <FormGroup>
        <textarea
          id="editor"
          className="form-control"
          onChange={(e) => setText(e.target.value)}
        ></textarea>
      </FormGroup>
      <FormGroup className="text-end">
        <Button className="btn btn-secondary comment-send" type="submit">
          Коментирай
        </Button>
      </FormGroup>
      <Form.Control type="hidden" name="bookId" value={bId} />
      <Form.Control type="hidden" name="text" value={text} />
      <Form.Control type="hidden" name="chapter" value={chapter} />
    </Form>
  );
}
