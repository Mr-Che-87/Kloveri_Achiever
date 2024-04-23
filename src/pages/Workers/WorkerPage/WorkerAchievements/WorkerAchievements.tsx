import { useState, useEffect } from "react";
import styles from "./WorkerAchievements.module.scss";
import { GiveAchieveButton } from "../buttons&inputes/GiveAchieveButton";
import { SearchAchieveInput } from "../buttons&inputes/SearchAchieveInput";
import { AllAchieveButton } from "../buttons&inputes/AllAchieveButton";
import { ModalAchieveLibrary } from "../ModalAchieveLibrary/ModalAchieveLibrary";


import { IAchieve } from "../../../../types/IAchieve";
import { fetchGetAchieveLibrary, fetchGetUserAchievements, fetchPostUserAchieve } from "../../../../api/apiService";
import { IUser } from "../../../../types/IUser";
//import { mockAchieveLibrary, IAchieve } from "../../../../mocks/AchieveLibrary";


export default function WorkerAchievements() {
 
  const [allAchievements, setAllAchievements] = useState<IAchieve[]>([]);  //стейт на ачивки библиотеки
  const [userAchievements, setUserAchievements] = useState<IAchieve[]>([]);  //стейт на ачивки юзера
  //const [achieveList, setAchieveList] = useState<IAchieve[]>([]);  //старый-единый стейт(фильтрация была по added)
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

//GET-запрос achiev-lib(возвращает всю библиотеку наград):
  useEffect(() => {
     fetchGetAchieveLibrary()
     .then((response) => {
      setAllAchievements(response.data);   //data - все данные юзера из бэка{...}
    })
      .catch((error) => {
        console.error("Ошибка при получении данных пользователя:", error);
      });
  }, []);

//??????GET-запрос на список всех имеющихся наград у юзера fetchGetUserAchievements^ 
  useEffect(() => {
    fetchGetUserAchievements()   // (userId) - хз нужен ли аргумент??
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
        //????????POST-запрос user-achiev(соединяет юзера и награду):
    fetchPostUserAchieve(userId, achieveId)   //хз как сюда приладить user_uuid и achiev_uuid
      .then(() => {
        
        return fetchGetUserAchievements();  //после добавления ачивки перезагружаем список ачивок юзера
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
        <li><GiveAchieveButton onClick={openModal} /></li>
        <li><SearchAchieveInput searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
       </li>
        <li><AllAchieveButton /></li>
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
                <button className={styles.removeButton} onClick={() => removeAchieve(achieve.id)}>
                  &times;
                </button>
            </div>
          ))
        }
      </div>  

      {showModal && (
        <ModalAchieveLibrary allAchievements={allAchievements} userAchievements={userAchievements} closeModal={closeModal} onAchieveAdd={onAchieveAdd}/>
        )}
    </div>
  );
}






/*
//ОТ ГЕНЫ:
import { useState, useEffect } from 'react';
import styles from './WorkerAchievements.module.scss';
import { GiveAchieveButton } from '../buttons&inputes/GiveAchieveButton';
import { SearchAchieveInput } from '../buttons&inputes/SearchAchieveInput';
import { AllAchieveButton } from '../buttons&inputes/AllAchieveButton';

import mockAchieveLibrary from "../../../../mocks/AchieveLibrary";
//import { ModalAchieveLibrary } from "../ModalAchieveLibrary/ModalAchieveLibrary";


export default function WorkerAchievements() {
  const [achieveList, setAchieveList] = useState<IAchieve[]>(mockAchieveLibrary);
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
     setAchieveList(mockAchieveLibrary);
  }, []);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

// Функция добавления ачивки:
const addAchieve = (achive: IAchieve) => {
  const updatedAchieves = achieveList.map((item) =>
    item.id === achive.id ? { ...item, added: true } : item
  );
  setAchieveList(updatedAchieves);
  localStorage.setItem("achieveList", JSON.stringify(updatedAchieves));
};

 // Функция удаления ачивки:
 const removeAchieve = (id: number) => {
  const updatedAchieves = achieveList.map((item) =>
    item.id === id ? { ...item, added: false } : item
  );
  setAchieveList(updatedAchieves);
  localStorage.setItem("achieveList", JSON.stringify(updatedAchieves));
};



  return (
    <div className={styles.workerAchievements}>
      <h1>Достижения</h1>
      <div className={styles.workerAchievementsNav}>
        <ul>
          <li><GiveAchieveButton onClick={openModal} /></li>
          <li><SearchAchieveInput searchQuery={searchQuery} setSearchQuery={setSearchQuery} /></li>
          <li><AllAchieveButton /></li>
        </ul>
      </div>

      <div className={styles.workerAchievementsList}>
      <MockAchieveLibrary targetIds={['a54dcde6-afce-4e51-8fdf-20c141ce69fb', 
                                      'a3e30108-f2d2-480a-9b22-6a4c5a04e822', 
                                      'e2b52892-f451-4d9b-af84-2df51982d2a6', 
                                      '9541d134-5834-4315-9bc9-3111c2e0bddc', 
                                      '1e25f9d3-b9c8-4b9f-9268-1c48fcfd9228', 
                                      'b8c19914-2a8e-4555-b07d-5175b228b7bc', 
                                      '27c0e981-61f0-463f-9633-b3f598363f3b', 
                                      '3932565d-a196-4643-9b1b-db0230857a78', 
                                      'e18512b4-684f-491b-934b-e5d7ab6a8f71',
                                      '0ab7ed1d-3de9-4366-a9a1-f6b365fc998c']} />
      </div>
    </div>
  );
}
*/
