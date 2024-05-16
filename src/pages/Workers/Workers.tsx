<<<<<<< HEAD
import styles from "./Workers.module.scss";

=======
import React from "react";
>>>>>>> ebe003af96fdd565a3a350ab93cfd9dc5330fdd1
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { IUser } from "../../types/IUser";
import WorkerInitial from "./WorkerPage/WorkerInitial/WorkerInitial";
<<<<<<< HEAD
=======
import styles from "./Worker.module.scss";
import { fetchGetAllUsers } from "../../api/apiService"; //api
import iconHeader from "../../assets/iconsHeader.svg";
import AddTeamButton from "../Teams/AddTeamButton/AddTeamButton";
import SearchInputWorkers from "./SearchInputWorkers/SearchInputWorkers";
import AuthorizationLinksButton from "./AuthorizationLinksButton/AuthorizationLinksButton";
import WorkersButtonAddTeam from "./WorkersButtonAddTeam/WorkersButtonAddTeam";
import WorkersModal from "./WorkersModal/WorkersModal";
import WorkersModalAddUser from "./WorkersModalAddUser/WorkersModalAddUser";
>>>>>>> ebe003af96fdd565a3a350ab93cfd9dc5330fdd1


<<<<<<< HEAD
=======

function filterName (searchTextName, nameList)  {
  if(!searchTextName){
    return nameList;
  }
  return nameList.filter(({first_name, last_name}) =>
    [first_name, last_name].some(
        (name) => name?.toLowerCase().includes(searchTextName.toLowerCase())
    )
   
  )
}
>>>>>>> ebe003af96fdd565a3a350ab93cfd9dc5330fdd1

export default function Workers() {
  const [userList, setUserList] = useState<IUser[]>([]); //state списка всех юзеров
  const [isSearchName, setIsSearchName] = useState("");
  const [isOpenModal, setIsOpenModal] = useState(false)

  

 const filtredUserList = filterName(isSearchName, userList)



 console.log("filtredUserList", filtredUserList)
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
<<<<<<< HEAD
    <div className={styles.workers}>
      <div className={styles.workersTitle}>
        <img src={iconHeader} alt="title icon" />
        <h1> Сотрудники</h1>
      </div>
      <div className={styles.workersBtn}>
        <AddTeamButton />
        <SearchInputWorkers />
      </div>

      <div className={styles.workersCards}>
        <div className={styles.workersList}>
          <ul className={styles.workersList__item}>
            {userList.map((user, index) => (  //МАПИМ МАССИВ ЮЗЕРОВ ИЗ БЭКА
              <li key={index}>
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
        </div>


        { //ПОКА НЕ НАДО:
        /*  <div className={styles.workersNotInTheTeam}>
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
        </div>   */}
        
      </div>
    </div>
  </>

=======
      <div className={styles.workers}>
        <div className={styles.workersTitle}>
          <img src={iconHeader} alt="title icon" />
          <h1> Сотрудники</h1>
        </div>
        <div className={styles.workersBtn}>
          <AddTeamButton 
          onClick={() => setIsOpenModal(true)}
           />
          <WorkersModal
           isOpen={isOpenModal} 
           onClose ={() => setIsOpenModal(false)}
          />
          <AuthorizationLinksButton />
         
          <SearchInputWorkers  
          isSearchName={isSearchName}
          setIsSearchName={setIsSearchName}
          />
            
         
            <WorkersModalAddUser/>
         
            
        </div>

        <div className={styles.workersCards}>
          <div className={styles.workersList}>
            <p>В КОМАНДЕ</p>
            <ul className={styles.workersList__item}>
              {filtredUserList.map((user, index) => (
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
>>>>>>> ebe003af96fdd565a3a350ab93cfd9dc5330fdd1
  );
}
