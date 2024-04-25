import { useState, useEffect } from "react";
import styles from "./WorkerAchievements.module.scss";
import { GiveAchieveButton } from "../buttons&inputes/GiveAchieveButton";
import { SearchAchieveInput } from "../buttons&inputes/SearchAchieveInput";
import { AllAchieveButton } from "../buttons&inputes/AllAchieveButton";
import { ModalAchieveLibrary } from "../ModalAchieveLibrary/ModalAchieveLibrary";

import { IAchieve } from "../../../../types/IAchieve";
import {
  fetchGetAchieveLibrary,
  fetchGetUserAchievements,
  fetchPostUserAchieve,
} from "../../../../api/apiService";
import { IUser } from "../../../../types/IUser";
//import { mockAchieveLibrary, IAchieve } from "../../../../mocks/AchieveLibrary";

export default function WorkerAchievements() {
  const [allAchievements, setAllAchievements] = useState<IAchieve[]>([]); //стейт на ачивки библиотеки
  const [userAchievements, setUserAchievements] = useState<IAchieve[]>([]); //стейт на ачивки юзера
  //const [achieveList, setAchieveList] = useState<IAchieve[]>([]);  //старый-единый стейт(фильтрация была по added)
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  //GET-запрос achiev-lib(возвращает всю библиотеку наград):
  useEffect(() => {
    fetchGetAchieveLibrary()
      .then((response) => {
        setAllAchievements(response.data); //data - все данные юзера из бэка{...}
      })
      .catch((error) => {
        console.error("Ошибка при получении данных пользователя:", error);
      });
  }, []);

  //??????GET-запрос на список всех имеющихся наград у юзера fetchGetUserAchievements:
  useEffect(() => {
    fetchGetUserAchievements() // (userId) - хз нужен ли аргумент??
      .then((response) => {
        setUserAchievements(response.data);
      })
      .catch((error) => {
        console.error("Ошибка при загрузке ачивок пользователя:", error);
      });
  }, []);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  // Функция добавления ачивки:
  const onAchieveAdd = (userId: IUser, achieveId: IAchieve) => {
    ////////////????????
    //????????POST-запрос user-achiev(соединяет юзера и награду):
    fetchPostUserAchieve(userId, achieveId) //хз как сюда приладить user_uuid и achiev_uuid
      .then(() => {
        return fetchGetUserAchievements(); //после добавления ачивки перезагружаем список ачивок юзера
      })
      .then((response) => {
        setUserAchievements(response.data);
      })
      .catch((error) => {
        console.error("Ошибка при добавлении ачивки пользователю:", error);
      });
  };

  // Функция удаления ачивки:
  const removeAchieve = (id: string) => {
    const updatedAchieves = userAchievements.filter((item) => item.id !== id);
    setUserAchievements(updatedAchieves);
  };

  return (
    <div className={styles.workerAchievements}>
      <h1>Достижения</h1>
      <div className={styles.workerAchievementsNav}>
        <ul>
          <li>
            <GiveAchieveButton onClick={openModal} />
          </li>
          <li>
            <SearchAchieveInput
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          </li>
          <li>
            <AllAchieveButton />
          </li>
        </ul>
      </div>

      <div className={styles.workerAchievementsList}>
        {/*{achieveList.filter((achieve) => 
          achieve.added && achieve.title.toLowerCase().includes(searchQuery.toLowerCase())  //если в SearchAchieveInput ничего не введено, то searchQuery будет пустой строкой => метод includes() вернет true для всех элементов, т.к/ пустая строка содержится в любой строке. 
          ).map((achieve) => (  //фильтрация по имени (потом вернуть) */}
        {userAchievements.map((achieve) => (
          <div key={achieve.id} className={styles.achieveItem}>
            <button>
              <img src={achieve.data.image} alt={achieve.data.title} />
              <h3 className={styles.achieveTitle}>{achieve.data.title}</h3>
            </button>
            <button
              className={styles.removeButton}
              onClick={() => removeAchieve(achieve.id)}
            >
              &times;
            </button>
          </div>
        ))}
      </div>

      {showModal && (
        <ModalAchieveLibrary
          allAchievements={allAchievements}
          userAchievements={userAchievements}
          closeModal={closeModal}
          onAchieveAdd={onAchieveAdd}
        /> /////??????????????
      )}
    </div>
  );
}
