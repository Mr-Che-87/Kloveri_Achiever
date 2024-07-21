/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-empty-pattern */
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { IUser } from "../../types/IUser";
import styles from "./Workers.module.scss";
import iconHeader from "../../assets/nav-workers-icon.svg";
import iconAddWorker from "../../assets/ImageAndTitle.png";
import WorkerInitial from "./WorkerPage/WorkerInitial/WorkerInitial";
import SearchInputWorkers from "./SearchInputWorkers/SearchInputWorkers";
//import AuthorizationLinksButton from "./AuthorizationLinksButton/AuthorizationLinksButton";
//import WorkersButtonAddTeam from "./WorkersButtonAddTeam/WorkersButtonAddTeam";
import AddWorkerButton from "./AddWorkerButton/AddWorkerButton";
//import AddTeamButton from "../Teams/AddTeamButton/AddTeamButton";
import WorkersModal from "./WorkersModal/WorkersModal";
import { fetchGetAllUsers, fetchReturnGetLink } from "../../api/apiService"; //api
import { ILinkData } from "../../types/ILinkData";

interface IWorkers {
  user: IUser;
  userData: IUser;
  linkData: ILinkData;
}

// Поиск по имени и фамилии
function filterName(searchTextName: string, nameList: any[]) {
  if (!searchTextName) {
    return nameList;
  }
  return nameList.filter((user) => {
    const fullName = `${user.first_name} ${user.last_name}`;
    return fullName.toLowerCase().includes(searchTextName.toLowerCase());
  });
}

export default function Workers({ user, userData }: IWorkers) {
  const [userList, setUserList] = useState<IUser[]>([]); //state списка всех юзеров
  const [isSearchName, setIsSearchName] = useState("");
  const [isOpenModal, setIsOpenModal] = useState(false);
  const filtredUserList = filterName(isSearchName, userList);
  const [linkDataMap, setLinkDataMap] = useState<Map<string, ILinkData>>();

  const handleAddContact = (newUser: IUser) => {
    setUserList((prevUserList) => [newUser, ...prevUserList]);
  };

  //   const handleUpdateObject = () => {
  //     setUpdateObject(prevState => !prevState);
  // };

  useEffect(() => {
    const userDataString = localStorage.getItem("userData");
    let organizationId = "";
    if (userDataString) {
      try {
        const userData = JSON.parse(userDataString);
        organizationId = userData.organization_id;
      } catch (error) {
        console.error(
          "Ошибка при парсинге данных userData из localStorage:",
          error
        );
      }
    } else {
      console.error("Данные userData не найдены в localStorage");
    }
    if (organizationId) {
      fetchReturnGetLink(organizationId)
        .then((response) => {
          console.log("link data fetched:", response.data);
          // Создаем словарь linkDataMap, где ключ - это profile_id пользователя
          const linkDataMap = new Map<string, ILinkData>();
          response.data.forEach((link: ILinkData) => {
            if (link.profile_id) {
              linkDataMap.set(link.profile_id, link);
            }
          });
          setLinkDataMap(linkDataMap);
        })
        .catch((error) => {
          console.log("Error fetching link data:", error);
        });
    } else {
      console.error("Organization ID is not available");
    }
  }, []);

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
          <AddWorkerButton onClick={() => setIsOpenModal(true)} />
          <WorkersModal
            onAddContact={handleAddContact}
            isOpen={isOpenModal}
            onClose={() => setIsOpenModal(false)}
            userData={userData}
            user={user}
          />

          <SearchInputWorkers
            isSearchName={isSearchName}
            setIsSearchName={setIsSearchName}
          />
        </div>

        <div className={styles.workersCards}>
          <div className={styles.workersList}>
            {filtredUserList.length > 0 ? (
              <ul className={styles.workersList__item}>
                {filtredUserList.map((user, index) => (
                  <li key={index}>
                  
                    <NavLink to={`/admin-panel/worker-page/${user.profile_id}`}>
                     <button>

                      <WorkerInitial
                        user={user} //передаем данные пользователя в WorkerInitial
                        showEmail={true}
                        avatarSize={"small"}
                        linkData={linkDataMap?.get(user.profile_id) || null}
                      />
                     </button>
                    
                    </NavLink>
                    <div className={styles.workersTeamName}>
                      {/* <p>Название команды</p> */}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className={styles.notFound}>
                {userList.length === 0 ? (
                  <div>
                    <img src={iconAddWorker} alt="Добавьте пользователя" />
                  </div>
                ) : isSearchName ? (
                  `Пользователь "${isSearchName}" не найден `
                ) : (
                  "Пользователь не найден"
                )}
              </div>
            )}
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

