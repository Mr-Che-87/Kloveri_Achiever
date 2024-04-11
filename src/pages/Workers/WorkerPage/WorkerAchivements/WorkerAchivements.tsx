import { useState, useEffect } from "react";

import styles from "./WorkerAchivements.module.scss";
import { GiveAchieveButton } from "../buttons&inputes/GiveAchieveButton";
import { SearchAchieveInput } from "../buttons&inputes/SearchAchieveInput";
import { AllAchieveButton } from "../buttons&inputes/AllAchieveButton";

import { mockAchieveLibrary, IAchieve } from "../../../../mocks/AchieveLibrary";
import { ModalAchieveLibrary } from "../ModalAchieveLibrary/ModalAchieveLibrary";

export default function WorkerAchivements() {
  const [achiveList, setAchiveList] = useState<IAchieve[]>(mockAchieveLibrary);  //state списка ачивок
  const [showModal, setShowModal] = useState(false);  //state показа модального окна


  //отображение актуального списка добавленных ачивок и сохранение их в localStorage:
  useEffect(() => {
    const storedAchieves = localStorage.getItem("achieveList");  //получаем сохранённый список ачивок с помощью .getItem по ключу "achieveList"(стейт)
      if (storedAchieves) {  //если история уже есть, то...
        setAchiveList(JSON.parse(storedAchieves));  //..распарсиваем её в стейт
      } else {  //если нет, то...
        setAchiveList(mockAchieveLibrary);
        localStorage.setItem("achieveList", JSON.stringify(mockAchieveLibrary)); //...сохраняем в историю по ключу "achieveList", запарсив начальный список ачивок
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
    const updatedAchieves = achiveList.map((item) =>
    //если в новом массиве находится элемент с таким же id, как у добавляемого достижения achive, то он создает новый объект с установленным значением added: true. Если id не совпадает, то элемент не меняется:
      item.id === achive.id ? { ...item, added: true } : item
    );
    setAchiveList(updatedAchieves);
    //сохраняем в историю по ключу "achieveList", запарсив изменённый список ачивок:
    localStorage.setItem("achieveList", JSON.stringify(updatedAchieves)); 
  };

   // Функция удаления ачивки:
   const removeAchieve = (id: number) => {
    const updatedAchieves = achiveList.map((item) =>
      item.id === id ? { ...item, added: false } : item
    );
    setAchiveList(updatedAchieves);
    localStorage.setItem("achieveList", JSON.stringify(updatedAchieves));
  };


  return (
    <div className={styles.workerAchivements}>
      <h1>Достижения</h1>
      <div className={styles.workerAchivementsNav}>
      <ul>
        <li><GiveAchieveButton onClick={openModal}/></li>  {/*открываем мод-окно*/}
        <li><SearchAchieveInput /></li>
        <li><AllAchieveButton /></li>
      </ul>
      </div>

      <div className={styles.workerAchivementsList}>
      {achiveList.filter(achive => achive.added).map((achive) => (  //фильтрует массив, оставляя только added и на его основе map-ит новый массив:
          <div key={achive.id} className={styles.achiveItem}>
            <button>
              <img src={achive.image} alt={achive.title} />
              <h3 className={styles.achiveTitle}>{achive.title}</h3>
              <button className={styles.removeButton} onClick={() => removeAchieve(achive.id)}> 
                &times;
              </button>
            </button>
          </div>
        ))}
      </div>

      {showModal && (  
      <ModalAchieveLibrary achiveList={achiveList} closeModal={closeModal} onAchieveAdd={addAchieve} />
      //Когда showModal=true,  ModalAchieveLibrary отображается на экране с передачей пропсов
      )}
    </div>
  );
}