import { useState, useEffect } from "react";
import "./styles/general.scss";
import Main from "./pagesWorker/Main/Main";
import NavMenuWorker from "./components/NavigationMenu/NavMenuWorker";
import { fetchGetUserData } from "./api/apiService"; 
import { useLocation } from "react-router-dom";



export default function AppWorker() {
  
  //для передачи аватара в кружочек(настройки приватности) справа
  // const [userAvatar, setUserAvatar] = useState<string | undefined>();
  const [profileId, setProfileId] = useState<string | null>("");
  const token = localStorage.getItem("token")
  
  const location = useLocation();

  

  useEffect(() => {
    if (token && profileId) {
      console.log('profileId:', profileId);
      fetchGetUserData(profileId )
      
        // .then((response) => {
        //   setUserAvatar(response.data.photo_small); // обновляем состояние userAvatar
        // })
        .catch((error) => {
          console.error("Ошибка при получении данных пользователя:", error);
        });
    }
  }, [profileId, token]);


useEffect(() => {
    if (location.state && location.state.profileId) {
      setProfileId(location.state.profileId);
    }
  }, [location]);

    return (
      <>
        <NavMenuWorker profileId={null} userAvatar={undefined} />
        <Main />
      </>
    );
}
