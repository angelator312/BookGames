import { Card } from "react-bootstrap";
import Markdown from "react-markdown";
import { UserData } from "~/utils/User";

export function AuthorDescription({
  avtor,
  avtorData,
}: {
  avtor: string;
  avtorData: UserData;
}) {
  return (
    <Card>
      <Card.Img
        className="centered"
        style={{ width: "102px", height: "118px" }}
        src={avtorData.authorImg}
      />
      <Card.Body>
        <Card.Title>{avtor}</Card.Title>
        <Card.Text>
          <Markdown>{avtorData.forMe}</Markdown>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
