import { useState, useEffect } from "react";

import styles from "./WorkerAchivements.module.scss";
import { GiveAchieveButton } from "../buttons&inputes/GiveAchieveButton";
import { SearchAchieveInput } from "../buttons&inputes/SearchAchieveInput";
import { AllAchieveButton } from "../buttons&inputes/AllAchieveButton";

// Убран неиспользуемый импорт mockAchieveLibrary
import { IAchieve } from "../../../../mocks/AchieveLibrary";
import { ModalAchieveLibrary } from "../ModalAchieveLibrary/ModalAchieveLibrary";

export default function WorkerAchievements() {
  const [achiveList, setAchiveList] = useState<IAchieve[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Загрузка начального списка достижений через динамический импорт
    import("../../../../mocks/AchieveLibrary").then(
      ({ mockAchieveLibrary }) => {
        const storedAchieves = localStorage.getItem("achieveList");
        if (storedAchieves) {
          setAchiveList(JSON.parse(storedAchieves));
        } else {
          setAchiveList(mockAchieveLibrary);
          localStorage.setItem(
            "achieveList",
            JSON.stringify(mockAchieveLibrary)
          );
        }
      }
    );
  }, []);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const addAchieve = (achive: IAchieve) => {
    const updatedAchieves = [...achiveList, { ...achive, added: true }];
    setAchiveList(updatedAchieves);
    localStorage.setItem("achieveList", JSON.stringify(updatedAchieves));
  };

  // Функция удаления ачивки
  const removeAchieve = (id: number) => {
    const updatedAchieves = achiveList.filter((item) => item.id !== id);
    setAchiveList(updatedAchieves);
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
        {achiveList
          .filter(
            (achive) =>
              achive.added &&
              achive.title.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((achive) => (
            <div key={achive.id} className={styles.achiveItem}>
              <img src={achive.image} alt={achive.title} />
              <h3 className={styles.achiveTitle}>{achive.title}</h3>
              <button
                className={styles.removeButton}
                onClick={() => removeAchieve(achive.id)}
              >
                &times;
              </button>
            </div>
          ))}
      </div>

      {showModal && (
        <ModalAchieveLibrary
          achiveList={achiveList}
          closeModal={closeModal}
          onAchieveAdd={addAchieve}
        />
      )}
    </div>
  );
}
