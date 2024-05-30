import { useState, useEffect } from "react";
import "./styles/general.scss";
import NavigationMenu from "./components/NavigationMenu/NavigationMenu";
import Main from "./pages/Main/Main";
import { fetchGetUserData } from "./api/apiService"; 

export default function App() {
  
  //для передачи аватара в кружочек(настройки приватности) справа
  const [userAvatar, setUserAvatar] = useState<string | undefined>();

  useEffect(() => {
    const adminId = "4d90df35-0d1f-4cba-b1e9-47674bca2f51"; // заглушка для презентации
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
      <NavigationMenu userAvatar={userAvatar} /> 
      <Main />  {/*хз чё в мейн писать???*/}
    </>
  )
}
