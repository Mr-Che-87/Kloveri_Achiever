import React from "react";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { IUser } from "../../types/IUser";
import WorkerInitial from "./WorkerPage/WorkerInitial/WorkerInitial";
import styles from "./Worker.module.scss";
import { fetchGetAllUsers } from "../../api/apiService"; //api
import iconHeader from "../../assets/iconsHeader.svg";
import AddTeamButton from "../Teams/AddTeamButton/AddTeamButton";
import SearchInputWorkers from "./SearchInputWorkers/SearchInputWorkers";
import AuthorizationLinksButton from "./AuthorizationLinksButton/AuthorizationLinksButton";
import WorkersButtonAddTeam from "./WorkersButtonAddTeam/WorkersButtonAddTeam";

export default function Workers() {
  const [userList, setUserList] = useState<IUser[]>([]); //state списка всех юзеров

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
      <div className={styles.workers}>
        <div className={styles.workersTitle}>
          <img src={iconHeader} alt="title icon" />
          <h1> Сотрудники</h1>
        </div>
        <div className={styles.workersBtn}>
          <AddTeamButton />
          <AuthorizationLinksButton />
          <SearchInputWorkers />
        </div>

        <div className={styles.workersCards}>
          <div className={styles.workersList}>
            <p>В КОМАНДЕ</p>
            <ul className={styles.workersList__item}>
              {userList.map((user, index) => (
                <li key={index}>
                  <NavLink to={`/worker-page/${user.profile_id}`}>
                    <WorkerInitial
                      user={user} //передаем данные пользователя в WorkerInitial
                      showEmail={false}
                      photoType="photo_small"
                    />
                  </NavLink>
                  <div className={styles.workersTeamName}>
                    <p>Название команды</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.workersNotInTheTeam}>
            <p>НЕ В КОМАНДЕ</p>
            <ul className={styles.workersList__item}>
              {userList.map((user, index) => (
                <li key={index}>
                  <NavLink to={`/worker-page/${user.profile_id}`}>
                    <WorkerInitial
                      user={user} //передаем данные пользователя в WorkerInitial
                      showEmail={false}
                      photoType="photo_small"
                    />
                  </NavLink>
                  <div className={styles.workersAddTeam}>
                    <WorkersButtonAddTeam/>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
