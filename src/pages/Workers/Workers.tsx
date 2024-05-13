import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { IUser } from "../../types/IUser";
import WorkerInitial from "./WorkerPage/WorkerInitial/WorkerInitial";

import { fetchGetUserData,
  //как будет реестр:  POST-запрос user  -  1) добавляет нового юзера
 } from "../../api/apiService";  //api


export default function Workers() {
  const [userData, setUserData] = useState<IUser | null>(null);


//GET-запрос user(возвращает список юзеров и их данные):
  useEffect(() => {
    const userId = "";
    fetchGetUserData(userId)
      .then((response) => {
      
          setUserData(response.data)
    
        
      })
      .catch((error) => {
        console.error("Ошибка при получении данных пользователя:", error);
      });
  }, []);
  

  //возвращаем индикатор загрузки пока данные не загружены:
  if (!userData) {
    return <div>Loading user data...</div>;
  }

  return (
    <div>
      Список сотрудников....
      <br />
      ....
      <br />
      ....
      <NavLink to={`/worker-page/`}>
        {" "}
        {/* Предположим, что маршрут использует uid пользователя */}
        <WorkerInitial
          showEmail={false}
          userData={userData} // Передаем данные пользователя в WorkerInitial
        />
      </NavLink>
    </div>
  );
}
