import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./styles/general.scss";
import Main from "./pagesWorker/Main/Main";
import NavMenuWorker from "./components/NavigationMenu/NavMenuWorker";

import { IUser } from "./types/IUser";
import { fetchGetUserData } from "./api/apiService"; //api

export default function AppWorker() {
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
          setUserAvatar(response.data.photo_main || undefined);
        })
        .catch((error) => {
          console.error("Ошибка при получении данных пользователя:", error);
        });
    }
  }, [profileId]);

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