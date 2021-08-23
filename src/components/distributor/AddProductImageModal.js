import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import defaultImage from "../../assets/img/distributor/default.jpg";

function AddProductImageModal({
  show,
  setModalShow,
  images,
  setProductImages,
}) {
  const [willUpload, setWillUpload] = useState([]);
  const [willDisplay, setWillDisplay] = useState(images.map(i => i.url));


  const handleAddClick = (e) => {
    setWillDisplay((prev) => {
      const willDisp = [...prev];
      willDisp.push(defaultImage);
      return willDisp;
    });
  };

  const handleRemoveImage = (e) => {
    setWillDisplay(prev => {
      const willRemove = [...prev];
      willRemove.pop();
      return willRemove;
    });
  }
  
  const handleUpload = (e) => {
    setWillUpload((prev) => {
      const willUpdate = [...prev];
      willUpdate.push(e.target.files[0]);
      return willUpdate;
    });

    setWillDisplay((prev) => {
      const willDisp = [...prev];
      willDisp[e.target.dataset.index] = URL.createObjectURL(e.target.files[0]);
      return willDisp;
    });
  };

  const handleHide = (e) => {
    console.log("kapanıyor");
  };

  return (
    <Modal
      show={show}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      backdrop={"static"}
      centered
      scrollable
      onHide={handleHide}
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Ürün Resimleri
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ul className="list-group">
          {/* {images.map((image, index) => (
            <li className="list-group-item" key={index}>
              <img
                src={image.url}
                width="100"
                height="100"
                alt="kitap"
                style={{ objectFit: "contain", display: "inlineBlock" }}
                data-index={index}
              />
              <h5 style={{ marginLeft: "20px", display: "inlineBlock" }}>
                    Resim{index + 1}
                  </h5>
              <div className="text-center">
                <button type="button" className="btn btn-danger">
                  Sil
                </button>
                <input
                  type="file"
                  className="btn btn-warning"
                  accept="image/*"
                  onChange={handleUpload}
                  data-index={index}
                 />
              </div>
            </li>
          ))} */}
          {willDisplay.length > 0
            ? willDisplay.map((image, index) => (
                <li className="list-group-item" key={index}>
                  <img
                    src={image}
                    width="100"
                    height="100"
                    alt="kitap"
                    style={{ objectFit: "contain", display: "inlineBlock" }}
                    data-index={index}
                  />
                  <h5 style={{ marginLeft: "20px", display: "inlineBlock" }}>
                    Resim{index + 1}
                  </h5>
                  <div className="text-center">
                    <button type="button" className="btn btn-danger mr-2" onClick={handleRemoveImage}>
                      Sil
                    </button>
                    <input
                      type="file"
                      className="btn btn-warning"
                      style={{ maxWidth: "150px" }}
                      accept="image/*"
                      onChange={handleUpload}
                      data-index={index}
                    />
                  </div>
                </li>
              ))
            : ""}
        </ul>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => { 
            setProductImages(willUpload);
            setModalShow(false);
          }}
        >
          Tamam
        </Button>
        <Button type="button" onClick={handleAddClick}>
          Ekle
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddProductImageModal;
