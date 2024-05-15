import { useState, useEffect } from "react";
import styles from "./WorkerAchievements.module.scss";
import { GiveAchieveButton } from "../buttons&inputes/GiveAchieveButton";
import { SearchAchieveInput } from "../buttons&inputes/SearchAchieveInput";
import { AllAchieveButton } from "../buttons&inputes/AllAchieveButton";
import { ModalAchieveLibrary } from "../ModalAchieveLibrary/ModalAchieveLibrary";

//import { mockAchieveLibrary, IAchieve } from "../../../../mocks/AchieveLibrary";  //старая заглушка
//import { IUser } from "../../../../types/IUser";
import { IAchieve } from "../../../../types/IAchieve";
import { IConnection } from "../../../../types/IConnection";
import { fetchGetAchieveLibrary, 
         //fetchGetUserAchievements,
         fetchGetIDUserAchieve,
         fetchPostUserAchieve,
         fetchDeleteUserAchievement
        } from "../../../../api/apiService";


interface WorkerAchievementsProps {
  userId: string | undefined;
}

export const WorkerAchievements: React.FC<WorkerAchievementsProps> = ({ userId }) => {
 
  //const [achieveList, setAchieveList] = useState<IAchieve[]>([]);  //старый-единый стейт(фильтрация по added)
  const [allAchievements, setAllAchievements] = useState<IAchieve[]>([]);  //стейт на ачивки библиотеки
  const [userAchievements, setUserAchievements] = useState<IAchieve[]>([]);  //стейт на ачивки юзера
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

// GET-Получение всей библиотеки наград:
  useEffect(() => {
    //console.log("useEffect: загрузка всей библиотеки наград"); 
    fetchGetAchieveLibrary()
     .then((response) => {
      //console.log("useEffect: Response всей библиотеки наград", response);
      setAllAchievements(response.data);   //data - все данные из бэка{...}
    })
      .catch((error) => {
        console.error("Ошибка при получении данных пользователя:", error);
      });
  }, []);



//GET-Получение списка достижений пользователя по ID:
//проблема в отображении дублирующихся ачивок!!(отображает, но криво удаляет + ошибка)
useEffect(() => {
  if (userId) {
    console.log("useEffect: загрузка ачивок пользователя с userId:", userId);
    fetchGetIDUserAchieve(userId)
    .then((response) => {
      console.log("useEffect: Response ачивок пользователя:", response);
      const userAchievements: IAchieve[] = response.data.map((connection: IConnection) => connection.data.achievement); // извлекаем только награды из соединений
      setUserAchievements(userAchievements);
    })
    .catch((error) => {
      console.error("Ошибка при загрузке ачивок пользователя:", error);
    });
  }
}, [userId]);



  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };



// Функция добавления ачивки: 
const onAchieveAdd = (achieveId: string) => { 
  //console.log("onAchieveAdd: Добавление соединения с ачивкой с achieveId:", achieveId);  

  if (userId) {
//POST-Создание связи между пользователем и достижением: 
     fetchPostUserAchieve(userId , achieveId)
    .then(() => {
      return fetchGetIDUserAchieve(userId);
    })
    .then((response) => {
      console.log("onAchieveAdd: Response соединения пользователя с ачивкой после добавления:", response.data);
      const userAchievements: IAchieve[] = response.data.map((connection: IConnection) => connection.data.achievement); // извлекаем только награды из соединений
      setUserAchievements(userAchievements);
    })
    .catch((error) => {
      console.error("Ошибка при добавлении ачивки пользователю:", error);
    });
  } else {
    console.error("Ошибка: userId не определен.");
  }
};
  

// Функция удаления ачивки: 
  // DELETE-Удаление связи между пользователем и достижением по ID     //НЕ РАБОТАЕТ после перезагрузки!!
  const removeAchieve = (id: string) => {
    // Отправляем запрос на удаление ачивки у пользователя
    console.log("Удаляем ачивку с id:", id);
    fetchDeleteUserAchievement(id)
      .then(() => {
        console.log("Ачивка успешно удалена на сервере.");
        // Обновляем список ачивок пользователя на клиенте
        setUserAchievements(prevAchievements => prevAchievements.filter((item) => item.id !== id));
    })
      .catch((error) => {
        console.error("Ошибка при удалении ачивки пользователя:", error);
      });
  };
 
 /* 
 //СТАРАЯ ФУНКЦИЯ: 
  const removeAchieve = (id: string) => {
    const updatedAchieves = userAchievements.filter((item) => item.id !== id);
    setUserAchievements(updatedAchieves);
  };
 */
 
  

  
  

//console.log("Ключи элементов списка:", userAchievements.map(achieve => achieve.id));  //какая-то муть с уникальными ключами id-соединения - ДУБЛЯЖ АЧИВОК

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
      {userAchievements.map((achieve: IAchieve) => (
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


