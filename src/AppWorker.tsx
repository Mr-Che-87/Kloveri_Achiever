import { useState, useEffect } from "react";
import "./styles/general.scss";
import Main from "./pagesWorker/Main/Main";
import NavMenuWorker from "./components/NavigationMenu/NavMenuWorker";
import { fetchGetUserData } from "./api/apiService"; 

export default function AppWorker() {
  
  //для передачи аватара в кружочек(настройки приватности) справа
  const [userAvatar, setUserAvatar] = useState<string | undefined>();

  useEffect(() => {
    const workerId = "00897e4c-9d17-4457-8114-3c584ddac9cc"; // заглушка для презентации
    fetchGetUserData(workerId)
      .then((response) => {
        setUserAvatar(response.data.photo_small); // установка аватара пользователя
      })
      .catch((error) => {
        console.error("Ошибка при получении данных пользователя:", error);
      });
  }, []);


  return (
    <>
      <NavMenuWorker userAvatar={userAvatar} /> 
      <Main />  {/*хз чё в мейн писать???*/}
    </>
  )
}
