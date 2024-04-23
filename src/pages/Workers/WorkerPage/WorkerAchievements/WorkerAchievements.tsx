import { useState, useEffect } from "react";
import styles from "./WorkerAchievements.module.scss";
import { GiveAchieveButton } from "../buttons&inputes/GiveAchieveButton";
import { SearchAchieveInput } from "../buttons&inputes/SearchAchieveInput";
import { AllAchieveButton } from "../buttons&inputes/AllAchieveButton";

import { mockAchieveLibrary, IAchieve } from "../../../../mocks/AchieveLibrary";
import { ModalAchieveLibrary } from "../ModalAchieveLibrary/ModalAchieveLibrary";

export default function WorkerAchievements() {
  const [achieveList, setAchieveList] =
    useState<IAchieve[]>(mockAchieveLibrary);
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  //Отображение актуального списка добавленных ачивок и сохранение их в localStorage:
  useEffect(() => {
    //тут GET-запрос на список всех имеющихся наград у юзера fetchGetUserAchievements - !!!!!!фильтр от Лёни!!!!

    const storedAchieves = localStorage.getItem("achieveList");
    if (storedAchieves) {
      setAchieveList(JSON.parse(storedAchieves));
    } else {
      setAchieveList(mockAchieveLibrary);
      localStorage.setItem("achieveList", JSON.stringify(mockAchieveLibrary));
    }
  }, []);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  // Функция добавления ачивки:
  const addAchieve = (achive: IAchieve) => {
    //ЛИБО ТУТ(либо в ModalAchieveLibrary) - POST-запрос user-achiev(соединяет юзера и награду) - !!!!!!фильтр от Лёни!!!!

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
        {achieveList
          .filter(
            (achieve) =>
              achieve.added &&
              achieve.title.toLowerCase().includes(searchQuery.toLowerCase()) //если в SearchAchieveInput ничего не введено, то searchQuery будет пустой строкой => метод includes() вернет true для всех элементов, т.к/ пустая строка содержится в любой строке.
          )
          .map((achieve) => (
            <div key={achieve.id} className={styles.achieveItem}>
              <button>
                <img src={achieve.image} alt={achieve.title} />
                <h3 className={styles.achieveTitle}>{achieve.title}</h3>
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
          achieveList={achieveList}
          closeModal={closeModal}
          onAchieveAdd={addAchieve}
        />
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
