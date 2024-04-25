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
  const [achieveList, setAchieveList] =
    useState<IAchieve[]>(mockAchieveLibrary);
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

//GET-запрос achiev-lib(возвращает всю библиотеку наград):
  useEffect(() => {
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
                <button className={styles.removeButton} onClick={() => removeAchieve(achieve.id)}>
                  &times;
                </button>
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
