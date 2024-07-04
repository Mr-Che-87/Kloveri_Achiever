import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./styles/general.scss";
import Main from "./pagesWorker/Main/Main";
import NavMenuWorker from "./components/NavigationMenu/NavMenuWorker";
<<<<<<< HEAD

import { IUser } from "./types/IUser"; 
import { fetchGetUserData } from "./api/apiService"; //api
=======
>>>>>>> dev3

import { IUser } from "./types/IUser";
import { fetchGetUserData } from "./api/apiService"; //api

export default function AppWorker() {
<<<<<<< HEAD
//для передачи аватара и имени в кружочек справа:
  const [profileId, setProfileId] = useState<string | null>(localStorage.getItem("profileId"));
  //const [profileId, setProfileId] = useState<string | null>("");
  //const profileId = localStorage.getItem("profileId")
  const [userData, setUserData] = useState<IUser | null>(null); //state данных юзера
  //const [userAvatar, setUserAvatar] = useState<string | undefined>();
  //const [firstName, setFirstName] = useState<string | undefined>();
//const token = localStorage.getItem("token")

const location = useLocation();
=======
  // для передачи аватара и имени в кружочек справа:
  const [profileId, setProfileId] = useState<string | null>(
    localStorage.getItem("profileId")
  );
  const [userData, setUserData] = useState<IUser | null>(null); // state данных юзера
  const [userAvatar, setUserAvatar] = useState<string | undefined>(undefined);
  const location = useLocation();

  const handlePhotoUpdate = (newPhotoUrl: string) => {
    setUserAvatar(newPhotoUrl);
  };
>>>>>>> dev3


useEffect(() => {
  if (location.state && location.state.profileId) {
    setProfileId(location.state.profileId);
    localStorage.setItem("profileId", location.state.profileId); // Сохраняем profileId в localStorage
  }
}, [location]);
  
  useEffect(() => {
<<<<<<< HEAD
=======
    if (location.state && location.state.profileId) {
      setProfileId(location.state.profileId);
      localStorage.setItem("profileId", location.state.profileId); // Сохраняем profileId в localStorage
    }
  }, [location]);

  useEffect(() => {
>>>>>>> dev3
    if (profileId) {
      fetchGetUserData(profileId)
        .then((response) => {
          setUserData(response.data);
<<<<<<< HEAD
=======
          setUserAvatar(response.data.photo_main || undefined);
>>>>>>> dev3
        })
        .catch((error) => {
          console.error("Ошибка при получении данных пользователя:", error);
        });
    }
  }, [profileId]);

<<<<<<< HEAD

    return (
      <>
        <NavMenuWorker userData={userData}/>  
        <Main />
      </>
    );
}
=======
  return (
    <>
      <NavMenuWorker
        userData={userData}
        userAvatar={userAvatar}
        handlePhotoUpdate={handlePhotoUpdate}
        profileId={profileId}
      />
      <Main />
    </>
  );
}
>>>>>>> dev3
