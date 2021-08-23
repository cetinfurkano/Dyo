import React from "react";
import InputField from "./SubComponents/InputField";

function SignUpTeacher({ fields, setRegisterData }) {
  return (
    <>
      <div className="tab">
        <InputField
          icon="fas fa-user"
          placeholder="Ad"
          onChange={(e) =>
            setRegisterData({ ...fields, firstName: e.target.value })
          }
          value={fields.firstName}
        />
        <InputField
          icon="fas fa-user"
          placeholder="Soyad"
          onChange={(e) =>
            setRegisterData({ ...fields, lastName: e.target.value })
          }
          value={fields.lastName}

        />
        <InputField
          icon="fas fa-envelope"
          placeholder="Email"
          onChange={(e) =>
            setRegisterData({ ...fields, email: e.target.value })
          }
          value={fields.email}

        />
      </div>
      <div className="tab">
        <InputField
          icon="fas fa-phone-alt"
          placeholder="Telefon"
          onChange={(e) =>{
            const regexp = /^[0-9\b]+$/;
            if(regexp.test(e.target.value))     
              setRegisterData({ ...fields, phoneNumber: e.target.value })
          }}
          value={fields.phoneNumber}

        />
        <InputField
          icon="fas fa-school"
          placeholder="Okul"
          onChange={(e) =>
            setRegisterData({ ...fields, school: e.target.value })
          }
          value={fields.school}

        />
        <InputField
          icon="fas fa-book-open"
          placeholder="Branş"
          onChange={(e) =>
            setRegisterData({ ...fields, branch: e.target.value })
          }
          value={fields.branch}

        />
      </div>
      <div className="tab">
        <InputField
          icon="fas fa-map-marker-alt"
          placeholder="Şehir"
          onChange={(e) => {
            const addresses = {...fields.address};
            addresses.city = e.target.value;
            setRegisterData({ ...fields, address: addresses });
          }}
          value={fields.address.city}
        />
        <InputField
          icon="fas fa-map-marker-alt"
          placeholder="İlçe"
          onChange={(e) => {
            const addresses = {...fields.address};
            addresses.district = e.target.value;
            setRegisterData({ ...fields, address: addresses });
          }}
          value={fields.address.district}

        />
        <InputField
          icon="fas fa-map-marker-alt"
          placeholder="Adres"
          onChange={(e) => {
            const addresses = {...fields.address};
            addresses.addressDescription = e.target.value;
            setRegisterData({ ...fields, address: addresses });
          }}
          value={fields.address.addressDescription}

        />
      </div>
      <div className="tab">
        <InputField
          icon="fas fa-user"
          placeholder="Distributor ID"
          onChange={(e) =>
            setRegisterData({ ...fields, distributorId: e.target.value })
          }
          value={fields.distributorId}
        />
        <InputField
          icon="fas fa-lock"
          placeholder="Şifre"
          onChange={(e) =>
            setRegisterData({ ...fields, password: e.target.value })
          }
          type="password"
          value={fields.password}

        />
        {/* <InputField icon="fas fa-lock" placeholder="Şifre Tekrar"/> */}
      </div>
    </>
  );
}

export default SignUpTeacher;
