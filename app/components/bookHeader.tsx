import { Col, Container, Dropdown, DropdownButton, Row } from "react-bootstrap";
import { AuthorResume } from "./userResume";
import type { UserData } from "~/utils/User";
import type { BookInterface } from "~/utils/textStore";

export default function BookHeader({
  e: bookForPreview,
  avt = false,
  authorData,
}: {
  authorData: UserData;
  e: BookInterface;
  avt?: boolean;
}) {
  if (!bookForPreview) return;
  return (
    <Container fluid className="mb-4">
      <Row>
        <Col xs={3} md={1}>
          <img src="/img/book-60.png" alt="Book" className="book-image" />
        </Col>
        <Col xs={9} md={7}>
          <a className="link-clear" href={!avt ? `/book/intro/${bookForPreview.text}` : `/myBook/${bookForPreview.text}`}>
            <h3 className="text-bold text-dark">{bookForPreview.id}</h3>
          </a>
          <AuthorResume authorData={authorData} authorName={bookForPreview.avtor ?? ""} />
        </Col>
        {/* <Col className="text-bold text-dark" xs={6} md={2}> */}
        {/* </Col> */}
        {/* <br /> */}
        <Col className="text-center" xs={12} md={2}>
          {avt ? (
            <DropdownButton title="Действия" id="dropdown-basic-button">
              <Dropdown.Item
                //method=post
                href={`/book/intro/${bookForPreview.text}/`}
              >
                Прочети ме
              </Dropdown.Item>
              <Dropdown.Item
                //method=post
                href={`/myBook/${bookForPreview.text}/publish`}
                disabled={bookForPreview.public}
              >
                Публикувай
              </Dropdown.Item>
              <Dropdown.Item href={`/delete/${bookForPreview.text}/`}>Изтрий</Dropdown.Item>
            </DropdownButton>
          ) : (
            ""
          )}
        </Col>
      </Row>
    </Container>
  );
}
