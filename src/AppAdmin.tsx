import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./styles/general.scss";
import Main from "./pagesAdmin/Main/Main";
import NavMenuAdmin from "./components/NavigationMenu/NavMenuAdmin";

import { IUser } from "./types/IUser"; 
import { fetchGetUserData } from "./api/apiService"; //api


export default function AppAdmin() {
//для передачи аватара и имени в кружочек справа:
const [profileId, setProfileId] = useState<string | null>(localStorage.getItem("profileId"));
//const [profileId, setProfileId] = useState<string | null>("");
//const profileId = localStorage.getItem("profileId")
const [userData, setUserData] = useState<IUser | null>(null); //state данных юзера
//const [userAvatar, setUserAvatar] = useState<string | undefined>();
//const [firstName, setFirstName] = useState<string | undefined>();
//const token = localStorage.getItem("token")

const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.profileId) {
      setProfileId(location.state.profileId);
      localStorage.setItem("profileId", location.state.profileId); // Сохраняем profileId в localStorage
    }
  }, [location]);


  useEffect(() => {
    if (profileId) {
      fetchGetUserData(profileId)
        .then((response) => {
          setUserData(response.data);
        })
        .catch((error) => {
          console.error("Ошибка при получении данных пользователя:", error);
        });
    }
  }, [profileId]);

  return (
    <>
      <NavMenuAdmin userData={userData} /> 
      <Main />  {/*хз чё в мейн писать???*/}
    </>
  )
}
