import React,{useState,useEffect} from "react";
import DistOperations from "../../logics/Distributor/DistOperations"

const Profile = React.forwardRef((props, ref) => {
  const [profilePhoto, setProfilePhoto] = useState();

  useEffect(() => {
    DistOperations.getDistributor((data)=> {
      setProfilePhoto(data.profilePhoto);
    });
  }, [])

  return (
    <a ref={ref} href={props.href} className="btn">
      <div className="header__img">
        <img
           src={profilePhoto && profilePhoto.url}
          alt=""
        />
      </div>
    </a>
  );
});

export default Profile;
