import React from "react";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { IUser } from "../../types/IUser";
import styles from "./Workers.module.scss";
import iconHeader from "../../assets/iconsHeader.svg";

import WorkerInitial from "./WorkerPage/WorkerInitial/WorkerInitial";
import { fetchGetAllUsers } from "../../api/apiService"; //api
import SearchInputWorkers from "./SearchInputWorkers/SearchInputWorkers";
import WorkersModal from "./WorkersModal/WorkersModal";

import AddWorkButton from "./WorkerPage/buttons&inputes/AddWorkButton";
import { Value } from "sass";

interface WorkersModalProps{
  isOpne: boolean;
  onClose: () => void;
  createdUser: IUser | null;
  onAddContact?:(user:IUser) => void;
}



function filterName(searchTextName: string, nameList: any[]) {
  if (!searchTextName) {
    return nameList;
  }
  return nameList.filter(({ first_name, last_name }) =>
    [first_name, last_name].some((name) =>
      name?.toLowerCase().includes(searchTextName.toLowerCase())
    )
  );
}

export default function Workers({}: WorkersModalProps) {
  
  //GET-Получение списка всех пользователей:
  const [userList, setUserList] = useState<IUser[]>([]); //state списка всех юзеров
  const [isSearchName, setIsSearchName] = useState("");
  const [isOpenModal, setIsOpenModal] = useState(false);

  const filtredUserList = filterName(isSearchName, userList);

const handleAddContact = (user: IUser) => {
  setUserList((prevUserList:IUser[]) =>[...prevUserList, user])
}

  console.log("filtredUserList", filtredUserList);
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
          <AddWorkButton onClick={() => setIsOpenModal(true)} />
          <WorkersModal
            isOpen={isOpenModal}
            onClose={() => setIsOpenModal(false)}
            onAddContact={handleAddContact} 
            createdUser={null} 
            userData={null}           
          />
          {/* <AuthorizationLinksButton /> */}

          <SearchInputWorkers
            isSearchName={isSearchName}
            setIsSearchName={setIsSearchName}
          />
        </div>

        <div className={styles.workersCards}>
          <div className={styles.workersList}>
            {filtredUserList.length > 0 ? (
                 <ul className={styles.workersList__item}>
              {filtredUserList.map((user: IUser | undefined, index: React.Key | null | undefined) => (
                <li key={index} >
                  <NavLink to={`/worker-page/${user.profile_id}`}>
                    <WorkerInitial
                      user={user} //передаем данные пользователя в WorkerInitial
                      showEmail={false}
                      avatarSize="small"
                    />
                  </NavLink>
                  <div className={styles.workersTeamName}>
                    <p>Название команды</p>
                  </div>
                </li>
              ))}
            </ul>
            ) : (
              <div className={styles.notFound}>
                {isSearchName ? `Пользователь "${isSearchName}" не найден ` : "Пользователь не найден"}
                 </div>
            )}
            {/* <p>В КОМАНДЕ</p> */}
         
          </div>

          {/* <div className={styles.workersNotInTheTeam}>
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
          </div> */}
        </div>
      </div>
    </>
  );
}
