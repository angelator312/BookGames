import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { CommentInterface } from "~/utils/comments";
import { AddCommentForm } from "./addCommentForm";
import { useState } from "react";
import RenderTextFrom1String from "./renderText2";
export function CommentsVisualizer({
  comments,
  bId,
  chapter,
}: {
  bId: string;
  comments: CommentInterface[];
  chapter: number;
}) {
  const [hiddenForm, setHiddenForm] = useState(true);
  const togleHiddenForm = () => setHiddenForm(!hiddenForm);
  if (!Array.isArray(comments)) comments = [];
  console.log(comments);
  
  return (
    <Container className="m-4">
      {comments.map((val, i) => {
        return (
          <Row key={i + val.time} className="mt-3">
            <Col>
              <Card>
                <Card.Body>
                  <Card.Title>
                    {val.user}:{val.title}
                  </Card.Title>
                  <Card.Text>
                    <RenderTextFrom1String texts={val.text} />
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        );
      })}
      <Row>
        <Col>
          <Button onClick={togleHiddenForm}>
            {hiddenForm ? "Коментирай" : "Скрий Коментара"}
          </Button>
        </Col>
        <Col hidden={hiddenForm}>
          <AddCommentForm bId={bId} chapter={chapter}/>
        </Col>
      </Row>
    </Container>
  );
}
