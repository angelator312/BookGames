import FormComponent from "./formComp";
import { Col, OverlayTrigger, Row } from "react-bootstrap";
import type { Text } from "~/utils/textStore";

export default function BookHeader({
  e,
  avt = false,
}: {
  e: Text;
  avt?: boolean;
}) {
  if (!e) return;
  avt = !avt;
  return (
    <div style={{ paddingTop: "1rem" }}>
      <Row>
        <OverlayTrigger
          placement="right"
          overlay={
            <div className="space-y-0.5 text-center m-l-3">
              <h4 className="text-j text-slate-500 font-medium logo text-bold text-dark">
                <p>{e.text2}</p>
              </h4>
            </div>
          }
        >
          <Row className="text-bold text-dark">
            <Col>
              <img src="/img/book.png" alt="Book" width={60} height={60} />
            </Col>
            <Col>
              <a href={`/book/${e.text}`}>
                <h3 className="text-bold text-dark">
                  {e.id?.substring(5, e.id?.length - 3)}
                </h3>
              </a>
            </Col>
            <Col>
              <h4 className="text-bold text-dark">
                {/* <br /> */}
                Автор:
              </h4>
            </Col>
            <Col>{e.avtor}</Col>
            {/* <br /> */}
            <br />
          </Row>
        </OverlayTrigger>
      </Row>
      <Row>
        <Col className="text-center">
            <h3 className="centered  m-l-3">
              {e.public ? (
                ""
              ) : (
                // <form method="post" action={`/myBook/${e.text}/publish`}>
                //   <input className="bg-book-c" type="submit" value={"Publish"} />
                // </form>
                <FormComponent
                  submitVariant="danger"
                  textForSubmit="Publish"
                  to={`/myBook/${e.text}/publish`}
                />
              )}
            </h3>
        </Col>
        <Col className="text-center">
          <h3 className="centered text-j text-slate-500 font-medium logo text-bold text-dark m-l-3">
            {avt ? (
              ""
            ) : (
              <FormComponent
                method="get"
                submitVariant="secondary"
                textForSubmit="Delete"
                to={`/delete/${e.text}/`}
              />
            )}
          </h3>
        </Col>
      </Row>
    </div>
  );
}
