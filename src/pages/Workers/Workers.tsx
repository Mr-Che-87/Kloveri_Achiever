import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { IUser } from "../../types/IUser";
import WorkerInitial from "./WorkerPage/WorkerInitial/WorkerInitial";

import { fetchGetAllUsers } from "../../api/apiService";  //api


export default function Workers() {
  const [userList, setUserList] = useState<IUser[]>([]);  //state списка всех юзеров

//GET-Получение списка всех пользователей:
  useEffect(() => {
    //const userId = "1";   //хз, как сейчас будут делить на admin | worker ???
    //console.log("useEffect: Загружен список всех пользователей");
    fetchGetAllUsers()
      .then((response) => {
        setUserList(response.data);
      })
      .catch((error) => {
        console.error("Ошибка при получении списка пользователей", error);
      });
  }, []);

  //возвращаем индикатор загрузки пока данные не загружены:
  if (userList.length === 0) {
    return <div>Loading user data...</div>;
  }

  return (
    <>
    <div>
      <h1>Сотрудники</h1>
      <ul>
        {userList.map((user, index) => (
          <li key={index}>
            <NavLink to={`/worker-page/${user.profile_id}`}>   
              <WorkerInitial
                user={user}   //передаем данные пользователя в WorkerInitial
                showEmail={false}
                photoType="photo_small"
                
              />
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
      
    </>
  );
}
