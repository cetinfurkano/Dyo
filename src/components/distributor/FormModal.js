import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

function FormModal({ show, setModalShow, children,registerText }) {
  const handleClose = () => {
    
  }
  
  return (
    <Modal
      show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      backdrop={"static"}
      centered
      onHide={handleClose}
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
         {registerText}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        <Button onClick={() => setModalShow(false)}>Kapat</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default FormModal;
