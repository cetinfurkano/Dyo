import React, { useState, useEffect, useRef } from "react";
import PerformanceInfo from "./PerforanceInfo";
import { Modal, Button } from "react-bootstrap";
import "../../assets/css/distributor/performance.css";
import DistOperations from "../../logics/Distributor/DistOperations";
import getDateFormat from "../../logics/DateFormat"

function Performance() {
  const [contracts, setContracts] = useState([]);
  useEffect(() => {
    DistOperations.getContracts((data) => {
      console.log(data);
      setContracts(data);
    });
  }, []);
  
  console.log(contracts);
  
  const [show, setShow] = useState(false);
  const selectedPublisher = useRef(null);



  const handleClick = (publisherName) => {
    selectedPublisher.current = contracts.filter(
      (contract) => contract.publisherName === publisherName
    )[0];
    console.log(selectedPublisher.current);
    var test = new Date(selectedPublisher.current.startDate);
    console.log(test.toUTCString());
    setShow(true);
  };

  return (
    <div className="Performance">
      <div className="container pt-5 mt-5 mb-4">
        <div
          className="row mx-auto"
          style={{ maxWidth: "57rem", maxHeight: "57rem" }}
        >
          {contracts.length > 0
            ? contracts.map((contract, index) => (
                <PerformanceInfo
                  percentage={String(contract.currentPercent)}
                  publisherName={contract.publisherName}
                  onClick={handleClick}
                  key={index}
                />
              ))
            : ""}
        </div>
      </div>

      <Modal
        show={show}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        backdrop={"static"}
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Perfomans Detayları
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedPublisher.current !== null ? (
            <div className="PerformanceModal">
              <form>
                <div className="form-group row">
                  <label
                    htmlFor="contractDueDate"
                    className="col-sm-4 col-form-label"
                  >
                    Anlaşma Bitiş Tarihi
                  </label>
                  <label className="input">
                    <input
                      id="contractDueDate"
                      className="input__field"
                      type="date"
                      placeholder=" "
                      value={getDateFormat(selectedPublisher.current.dueDate, 0)}
                      readOnly
                    />
                    <span className="input__label">Anlaşma Bitiş Tarihi</span>
                  </label>
                </div>
                <div className="form-group row">
                  <label
                    htmlFor="contracStartDate"
                    className="col-sm-4 col-form-label"
                  >
                    Anlaşma Başlangıç Tarihi
                  </label>
                  <label className="input">
                    <input
                      id="contracStartDate"
                      className="input__field"
                      type="date"
                      placeholder=" "
                      defaultValue={getDateFormat(selectedPublisher.current.startDate, 0)}
                      readOnly
                    />
                    <span className="input__label">
                      Anlaşma Başlangıç Tarihi
                    </span>
                  </label>
                </div>
                <div className="form-group row">
                  <label
                    htmlFor="contractAmount"
                    className="col-sm-4 col-form-label"
                  >
                    Anlaşma Miktarı
                  </label>
                  <label className="input">
                    <input
                      id="contractAmount"
                      className="input__field"
                      type="text"
                      placeholder=" "
                      readOnly
                      defaultValue={selectedPublisher.current.dealAmount + " ₺"}
                    />
                    <span className="input__label">Anlaşma Miktarı</span>
                  </label>
                </div>
                <div className="form-group row">
                  <label
                    htmlFor="discountAmount"
                    className="col-sm-4 col-form-label"
                  >
                    İskonto Miktarı
                  </label>
                  <label className="input">
                    <input
                      id="
                    discountAmount"
                      className="input__field"
                      type="text"
                      placeholder=" "
                      readOnly
                      defaultValue={
                        selectedPublisher.current.maxDiscount + " ₺"
                      }
                    />
                    <span className="input__label">İskonto Miktarı</span>
                  </label>
                </div>
                <div className="form-group row">
                  <label htmlFor="revenues" className="col-sm-4 col-form-label">
                    Yapılan Hasılat
                  </label>
                  <label className="input">
                    <input
                      id="revenues"
                      className="input__field"
                      type="text"
                      placeholder=" "
                      readOnly
                      defaultValue={selectedPublisher.current.revenues + " ₺"}
                    />
                    <span className="input__label">Yapılan Hasılat</span>
                  </label>
                </div>
                <div className="form-group row">
                  <label
                    htmlFor="requiredAmount"
                    className="col-sm-4 col-form-label"
                  >
                    Hedef İçin Gereken Miktar
                  </label>
                  <label className="input">
                    <input
                      id="
                    requiredAmount"
                      className="input__field"
                      type="text"
                      placeholder=" "
                      readOnly
                      defaultValue={
                        selectedPublisher.current.requiredAmount + " ₺"
                      }
                    />
                    <span className="input__label">
                      Hedef İçin Gereken Miktar
                    </span>
                  </label>
                </div>
              </form>
            </div>
          ) : (
            ""
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShow(false)}>Kapat</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Performance;
