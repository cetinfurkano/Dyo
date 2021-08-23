import React, { useState, useEffect } from "react";
import "../../assets/css/distributor/dist-input.css";
import DistOperations from "../../logics/Distributor/DistOperations";
import getDateFormat from "../../logics/DateFormat";

function PublisherInput({ setModalShow, setContracts }) {
  const [contract, setContract] = useState({
    publisherName: "",
    dealAmount: 0,
    maxDiscount: 0,
    startDate: new Date(),
    dueDate: new Date(),
    isValid: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    DistOperations.addContract(contract, (data) => {
      setContracts((prevContracts) => {
        const contracts = [...prevContracts];
        contracts.push(data);
        console.log(contracts);
        return contracts;
      });
      setModalShow(false);
    });
  };

  return (
    <div className="DistInput">
      <div className="dist_input_container">
        <div className="title">Yayınevi Bilgilerini Hızlıca Kaydet!</div>
        <div className="content">
          <form action="#">
            <div className="dist-details">
              <div className="input-box">
                <span className="details">Yayınevi Adı</span>
                <input
                  type="text"
                  placeholder="Yayınevi adını  girin."
                  required
                  value={contract.publisherName}
                  onChange={(e) =>
                    setContract({ ...contract, publisherName: e.target.value })
                  }
                />
              </div>
              <div className="input-box">
                <span className="details">Yapılan Anlaşma Miktarı</span>
                <input
                  type="text"
                  placeholder="Yapılan anlaşma tutarını belirtin."
                  required
                  value={contract.dealAmount}
                  onChange={(e) => {
                    const regexp = /^[0-9\b]+$/;
                    if (e.target.value === "" || regexp.test(e.target.value))
                      setContract({
                        ...contract,
                        dealAmount:
                          e.target.value !== ""
                            ? parseFloat(e.target.value)
                            : 0,
                      });
                  }}
                />
              </div>

              <div className="input-box">
                <span className="details">İskonto Miktarı</span>
                <input
                  type="text"
                  placeholder="Maksimum iskonto miktarı"
                  required
                  value={contract.maxDiscount}
                  onChange={(e) => {
                    const regexp = /^[0-9\b]+$/;
                    if (e.target.value === "" || regexp.test(e.target.value))
                      setContract({
                        ...contract,
                        maxDiscount:
                          e.target.value !== ""
                            ? parseFloat(e.target.value)
                            : 0,
                      });
                  }}
                />
              </div>

              <div className="input-box">
                <span className="details">Anlaşma Başlangıç Tarihi</span>
                <input
                  type="date"
                  placeholder="Anlaşma başlangıç tarihi"
                  required
                  value={getDateFormat(contract.startDate, 0)}
                  onChange={(e) =>
                    setContract({
                      ...contract,
                      startDate: new Date(e.target.value),
                    })
                  }
                />
              </div>

              <div className="input-box">
                <span className="details">Anlaşma Bitiş Tarihi</span>
                <input
                  type="date"
                  placeholder="Anlaşma bitiş tarihi"
                  required
                  value={getDateFormat(contract.dueDate, 0)}
                  onChange={(e) =>
                    setContract({
                      ...contract,
                      dueDate: new Date(e.target.value),
                    })
                  }
                />
              </div>

            </div>
            <div className="valid-details">
              <input
                type="radio"
                name="valid"
                id="dot-1"
                onChange={(e) => setContract({ ...contract, isValid: true })}
              />
              <input
                type="radio"
                name="valid"
                id="dot-2"
                onChange={(e) => setContract({ ...contract, isValid: false })}
              />
              <span className="valid-title">Aktif Mi?</span>
              <div className="category">
                <label htmlFor="dot-1">
                  <span className="dot one"></span>
                  <span className="valid">Aktif</span>
                </label>
                <label htmlFor="dot-2">
                  <span className="dot two"></span>
                  <span className="valid">Pasif</span>
                </label>
              </div>
            </div>
            <div className="button">
              <input type="submit" value="Kaydet" onClick={handleSubmit} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PublisherInput;
