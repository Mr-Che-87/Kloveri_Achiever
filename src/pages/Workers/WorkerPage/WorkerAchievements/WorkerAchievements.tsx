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
         fetchPostUserAchieve, 
         fetchGetIDUserAchieve 
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

//GET-запрос achiev-lib(возвращает всю библиотеку наград):
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

//??????GET-запрос  user-achiev (на список всех имеющихся СОЕДИНЕНИЙ награда+юзер): 
//работает через жопу!!!  (возможно проблема в отображении дублирующихся ачивок)
useEffect(() => {
  if (userId) {
    console.log("useEffect: загрузка ачивок пользователя с userId:", userId);
    fetchGetIDUserAchieve(userId)
    .then((response) => {
      console.log("useEffect: Response ачивок пользователя:", response);
      const userConnections: IConnection[] = response.data;  //получаем список соединений пользователь-награда
      const userAchieveIds = userConnections.map(connection => connection.data.achiev_uuid); //извлекаем идентификаторы ачивок из соединений
      const filteredAchievements = allAchievements.filter(achievement => userAchieveIds.includes(achievement.id));   //фильтруем все ачивки из библиотеки по идентификаторам из соединений
      setUserAchievements(filteredAchievements);
    })
    .catch((error) => {
      console.error("Ошибка при загрузке ачивок пользователя:", error);
    });
  }
}, [userId, allAchievements]);



  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };




// Функция добавления ачивки: 
const onAchieveAdd = (achieveId: string) => { 
  console.log("onAchieveAdd: Добавление соединения с ачивкой с achieveId:", achieveId);  
  // GET-запрос user-achiev (возвращает СОЕДИНЕНИЕ между юзером и наградой    
  if (userId) {
     fetchPostUserAchieve(userId , achieveId)
    .then(() => {
      return fetchGetIDUserAchieve(userId);
    })
    .then((response) => {
      console.log("onAchieveAdd: Response соединения пользователя с ачивкой после добавления:", response.data);
      const userConnections: IConnection[] = response.data;
      const userAchieveIds = userConnections.map(connection => connection.data.achiev_uuid);
      const filteredAchievements = allAchievements.filter(achievement => userAchieveIds.includes(achievement.id));
      setUserAchievements(filteredAchievements);
    })
    .catch((error) => {
      console.error("Ошибка при добавлении ачивки пользователю:", error);
    });
  } else {
    console.error("Ошибка: userId не определен.");
  }
};
  
  // Функция удаления ачивки:  - ПОКА СТАРОЕ
  const removeAchieve = (id: string) => {
    const updatedAchieves = userAchievements.filter((item) => item.id !== id);
    setUserAchievements(updatedAchieves);
  };
 /*
  //DELETE-запрос на удаление ачивки user-achiev/deactivate
  //НЕ РАБОТАЕТ!!
  const removeAchieve = (connectUuid: string) => {
    console.log("removeAchieve: Удаление соединения с connectUuid", connectUuid);
    
    if (userId) {
      fetchDeleteUserAchieve(connectUuid)
        .then(() => {
          // После успешного удаления обновляем список ачивок пользователя с сервера
          return fetchGetIDUserAchieve(userId);
        })
        .then((response) => {
          console.log("removeAchieve: Response ачивок пользователя после удаления:", response.data);
          const updatedUserAchievements = response.data.map((connection: IConnection) => {
            return allAchievements.find((achievement) => achievement.id === connection.data.achiev_uuid);
          }).filter((achievement: IAchieve | undefined) => !!achievement);
          
          setUserAchievements(updatedUserAchievements);
        })
        .catch((error) => {
          console.error("Ошибка при удалении ачивки пользователя:", error);
        });
    } else {
      console.error("Ошибка: userId не определен.");
    }
  };
  */  
  

//console.log("Ключи элементов списка:", userAchievements.map(achieve => achieve.id));  //какая-то муть с уникальными ключами id-соединения

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
      {userAchievements
        .filter((achieve) => 
          //проверяем, есть ли что-то в searchQuery: 
          searchQuery ?     //если есть, фильтруем по запросу: 
            achieve.data.title.toLowerCase().includes(searchQuery.toLowerCase()) :             true       //если нет, показываем все ачивки (метод includes() вернет true для всех элементов, т.к. пустая строка содержится в любой строке) 
          ).map((achieve: IAchieve) => (
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

