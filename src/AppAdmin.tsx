import { useState, useEffect } from "react";
import "./styles/general.scss";
import NavMenuAdmin from "./components/NavigationMenu/NavMenuAdmin";
import Main from "./pagesAdmin/Main/Main";
import { fetchGetUserData } from "./api/apiService"; 

export default function AppAdmin() {
  
  //для передачи аватара в кружочек(настройки приватности) справа
  const [userAvatar, setUserAvatar] = useState<string | undefined>();

  useEffect(() => {
    const adminId = "85f24f8e-82ea-4711-8169-6a917ded08b1"; // заглушка для презентации
    fetchGetUserData(adminId)
      .then((response) => {
        setUserAvatar(response.data.photo_small); // установка аватара пользователя
      })
      .catch((error) => {
        console.error("Ошибка при получении данных пользователя:", error);
      });
  }, []);


  return (
    <>
      <NavMenuAdmin userAvatar={userAvatar} /> 
      <Main />  {/*хз чё в мейн писать???*/}
    </>
  )
}
