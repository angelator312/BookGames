import { useState } from "react";
import { Col, Modal, Row } from "react-bootstrap";
import type { Turneta, UserData } from "~/utils/User";
import IsProUser from "./IsPayUser";
import Markdown from "react-markdown";
export function AuthorResume({
  authorName,
  authorData,
  turneta,
}: {
  authorData: UserData;
  authorName: string;
  turneta?: Turneta;
}) {
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  return (
    <div className="author-resume">
      <Row>
        <Col>
          <span
            onClick={() => setShowModal(true)}
            className="fst-italic text-dark"
          >
            {authorName} <IsProUser usD={authorData} />
          </span>
        </Col>
      </Row>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title className="text-bold"> {authorName}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-black">
          <Row>
            <Col>
              <p>За мен:</p>
            </Col>
          </Row>
          <Row>
            <Col>
              <Markdown>{authorData.forMe}</Markdown>
            </Col>
          </Row>
          {turneta ? (
            <>
              <Row>
                <Col>
                  <p>Турнета:</p>
                </Col>
              </Row>
            </>
          ) : (
            ""
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}
