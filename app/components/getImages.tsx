import { useEffect, useState } from "react";
import { Modal, Spinner } from "react-bootstrap";
import type { MiniInterface } from "~/utils/ImageThings";
import PreviewImages from "./previewOnImages";

export default function GetImagesModal({
  show,
  handleClose,
  handleInsertImage,
}: {
  show: boolean;
  handleClose: () => void;
  handleInsertImage: (insertID: string) => void;
}) {
  const [minis, setMinis] = useState<MiniInterface[]>([]);
  const [showImages, setShowImages] = useState<boolean>(false);
  useEffect(() => {
    async function getImages() {
      if (show) {
        setMinis(await (await fetch("/getImages")).json());
      } else setMinis([]);
    }
    getImages().then((r) => {
      setShowImages(true);
    });
  }, [show]);
  return (
    <Modal
      scrollable={true}
      show={show}
      onHide={handleClose}
      dialogClassName="modal-90w "
    >
      <Modal.Header closeButton>
        <Modal.Title>Images</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!showImages ? (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : null}
        <PreviewImages minis={minis} handleInsertImage={handleInsertImage}/>
      </Modal.Body>
    </Modal>
  );
}
