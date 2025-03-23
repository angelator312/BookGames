import {
  Button,
  Card,
  Col,
  Container,
  Form,
  FormGroup,
  Row,
} from "react-bootstrap";
import { CommentInterface } from "~/utils/comments";
import { AddCommentForm } from "./addCommentForm";
import { useState } from "react";
import RenderTextFrom1String from "./renderText2";
import Markdown from "react-markdown";
import comments from "~/styles/myStyles/comments.css";
import { UserData } from "~/utils/User";
export const links = () => [{ rel: "stylesheet", href: comments }];

export function CommentsVisualizer({
  comments,
  bId,
  chapter,
  userName,
  autDatas,
}: {
  bId: string;
  userName: string;
  comments: CommentInterface[];
  chapter: number;
  autDatas: UserData[];
}) {
  const [hiddenForm, setHiddenForm] = useState(true);
  const togleHiddenForm = () => setHiddenForm(!hiddenForm);
  if (!Array.isArray(comments)) comments = [];
  // console.log(comments);
  // console.log(autDatas);

  return (
    <Container className="m-4">
      <Button onClick={togleHiddenForm}>
        {hiddenForm ? "Коментари" : "Скрий Коментарите"}
      </Button>
      <ul className="list-unstyled comment" hidden={hiddenForm}>
        {comments.map((val, i) => {
          return (
            <li key={i + val.time}>
              <Row>
                <Col sm={2} className="text-center">
                  {/* img of author */}
                  <img
                    height={100}
                    width={100}
                    src={/*"/img/question_mark.png"*/ autDatas[i].authorImg}
                  />
                </Col>
                <Col md={10} className="text-center">
                  <Card>
                    <Card.Header>
                      <Row>
                        <div className="mx-3 user">
                          <a className="isAuthor" href="#">
                            {val.user}
                          </a>
                        </div>
                      </Row>
                    </Card.Header>
                    <Card.Body>
                      {/* <Card.Title>{val.title}</Card.Title> */}
                      <Card.Text>
                        <RenderTextFrom1String texts={val.text} />
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </li>
          );
        })}
      </ul>
      <Row hidden={hiddenForm}>
        <Col>
          <AddCommentForm bId={bId} chapter={chapter} />
        </Col>
      </Row>
    </Container>
  );
}
