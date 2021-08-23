import React, { useState,useEffect,useRef } from "react";
import Select from "react-select";
import TeacherOperations from "../../../../logics/Teacher/TeacherOperations"

function Billing() {
  const [distributors, setDistributors] = useState([])
  const [options, setOptions] = useState([])
  const [distributorId, setDistributorId] = useState();
  
  const selectedRef = useRef();

  useEffect(() => {
      TeacherOperations.getDistributors((data) => {
        setDistributors(data);   
        const selections = data.map(d => getSelection(d));
        setOptions(selections);
        var storage = localStorage.getItem("selectedDistributor-"+TeacherOperations.getUserId());
        if (!storage) {
          localStorage.setItem("selectedDistributor-"+TeacherOperations.getUserId(), JSON.stringify(selections[0]));
          selectedRef.current = selections[0];
        }
      });
  }, [])

  const handleAddClick = (e) => {
      TeacherOperations.addDistributorReference(distributorId, (data)=>{
        setDistributors(prev => {
          const oldDistributors = [...prev];
          oldDistributors.push(data);
          return oldDistributors;
        });
        const selections = distributors.map(d => getSelection(d));
        setOptions(selections);
      });
  }
  
  
  const getSelection = (data) => {
       return {value: data.id, label: data.firstName + " " + data.lastName};
  }
  
  const handleChangeDistributor = (selectedItem) => {
    selectedRef.current = selectedItem;
  }

  const handleClickChange = (e) => {
    localStorage.setItem("selectedDistributor-"+TeacherOperations.getUserId(), JSON.stringify(selectedRef.current));
    alert("Distribötürünü değiştirdin!");
  }
  
  return (
    <div className="tab-pane" id="billing">
      <h6>DİSTRİBÜTÖR AYARLARIN</h6>
      <hr />
      <form>
      <div className="form-group">
          <label htmlFor="fullId">DistributorId</label>
          <input
            type="text"
            className="form-control"
            id="fullName"
            aria-describedby="fullNameHelp"
            placeholder="Distributor Gir"
            value={distributorId && distributorId}  
            onChange={e =>setDistributorId(e.target.value)}
          />
          <small id="fullNameHelp" className="form-text text-muted">
            Buraya bağlanmak istediğin distribütörün ID bilgisini girmelisin.
          </small>
          <button className="btn btn-info" type="button" onClick={handleAddClick}>
          Ekle
        </button>
        </div>
        <div className="form-group">
          <label className="d-block">Distributor Değiştir</label>
          <Select            
            onChange={handleChangeDistributor}
            options={options}
            defaultValue={JSON.parse(localStorage.getItem("selectedDistributor-"+TeacherOperations.getUserId()))}
          />
        </div>
        <button className="btn btn-info" type="button" onClick={handleClickChange}>
          Değiştir
        </button>
      </form>
    </div>
  );
}

export default Billing;
