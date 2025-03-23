import { Card, Col, Row } from "react-bootstrap";
import { CommentInterface } from "~/utils/comments";
export function CommentsVisualizer({ comments }: { comments: CommentInterface[] }) {
  return (
    <div>
      {comments.map((val, i) => {
        return (
          <Row key={i + val.time}>
            <Col>
              <Card>
                <Card.Body>
                  <Card.Title>
                    {val.user}:{val.title}
                  </Card.Title>
                  <Card.Text>{val.text}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        );
      })}
    </div>
  );
}
