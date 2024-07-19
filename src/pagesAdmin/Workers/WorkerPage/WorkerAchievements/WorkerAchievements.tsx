import { useState, useEffect, CSSProperties } from "react";
import styles from "./WorkerAchievements.module.scss";
import { GiveAchieveButton } from "../buttons&inputes/GiveAchieveButton";
import { SearchAchieveInput } from "../buttons&inputes/SearchAchieveInput";
import { ModalAchieveLibrary } from "../ModalAchieveLibrary/ModalAchieveLibrary";
import ConfirmModal from "../ConfirmModal/ConfirmModal";

import { IAchieve } from "../../../../types/IAchieve";
import { IConnection } from "../../../../types/IConnection";
import {
  fetchGetAchieveLibrary,
  fetchGetIDUserAchieve,
  fetchPostUserAchieve,
  fetchDeleteUserAchievement,
} from "../../../../api/apiService";


interface WorkerAchievementsProps {
  userId: string | undefined;
  //подъём состояния (lifting state up):
  onUpdateUserAchievements: (updatedAchievements: IConnection[]) => void; 
}
interface CSSPropertiesWithVars extends CSSProperties {
  '--background-image'?: string;
}

export const WorkerAchievements: React.FC<WorkerAchievementsProps> = ({
  userId,
  onUpdateUserAchievements, //подъём состояния (lifting state up):
}) => {
  const [allAchievements, setAllAchievements] = useState<IAchieve[]>([]);
  const [userAchievements, setUserAchievements] = useState<IConnection[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedAchieveId, setSelectedAchieveId] = useState<string | null>(
    null
  );

  useEffect(() => {
    fetchGetAchieveLibrary()
      .then((response) => {
        setAllAchievements(response.data);
      })
      .catch((error) => {
        console.error("Ошибка при получении библиотеки наград:", error);
      });
  }, []);

  useEffect(() => {
    if (userId) {
      fetchGetIDUserAchieve(userId)
        .then((response) => {
          setUserAchievements(response.data);
          onUpdateUserAchievements(response.data); //обновляем состояние родителя (lifting state up)
        })
        .catch((error) => {
          console.error("Ошибка при загрузке достижений пользователя:", error);
        });
    }
  }, [userId, onUpdateUserAchievements]);  //подъём состояния (lifting state up)

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const openDeleteModal = (achieveId: string) => {
    setSelectedAchieveId(achieveId);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedAchieveId) {
      removeAchieve(selectedAchieveId);
      setShowDeleteModal(false);
    }
  };

  const handleCancel = () => {
    setShowDeleteModal(false);
  };

  const onAchieveAdd = (achieveId: string) => {
    if (userId) {
      fetchPostUserAchieve(userId, achieveId)
        .then((response) => {
          setUserAchievements((prev) => [...prev, response.data]);
        })
        .catch((error) => {
          console.error(
            "Ошибка при добавлении достижения пользователю:",
            error
          );
        });
    } else {
      console.error("Ошибка: userId не определен.");
    }
  };

  const removeAchieve = (userAchievementId: string) => {
    fetchDeleteUserAchievement(userAchievementId)
      .then(() => {
        setUserAchievements((prev) =>
          prev.filter((connect) => connect.id !== userAchievementId)
        );
      })
      .catch((error) => {
        console.error("Ошибка при удалении достижения пользователя:", error);
      });
  };

  return (
    <div className={styles.workerAchievements}>
      <h1>Достижения</h1>
      <div className={styles.workerAchievementsNav}>
        <ul>
          <li className={styles.giveAchieveButton}>
            <GiveAchieveButton onClick={openModal} />
          </li>
          <li className={styles.searchAchieveInput}>
            <SearchAchieveInput
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          </li>
          {/* <li>
            <AllAchieveButton />
          </li> */}
        </ul>
      </div>

      <div className={styles.workerAchievementsList}>
        {userAchievements
          .filter((connect) =>
            searchQuery
              ? connect.data.achievement.data.title
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase())
              : true
          )
          .map((connect, index) => (
            <div
              key={index}
              className={styles.achievementCard}
              style={
                {
                  '--background-image': `url(${connect.data.achievement.data.achiev_style})`,
                } as CSSPropertiesWithVars
              }
            >
                <img
                  className={styles.achieveImg}
                  src={connect.data.achievement.data.image}
                  alt={connect.data.achievement.data.title}
                />
                <div className={styles.achieveContent}>
                  <h2 className={styles.achieveTitle}>
                    {connect.data.achievement.data.title}
                  </h2>
                  <p className={styles.achieveDescription}>
                    {connect.data.achievement.data.description.length > 100 
                      ? connect.data.achievement.data.description.slice(0, 100) + '...' 
                      : connect.data.achievement.data.description}
                  </p>
                  <div className={styles.achieveRank}>
                    {connect.data.achievement.data.rank}<span>&nbsp;&#x20BF;</span>
                  </div>
                </div>
              
              <button
                className={styles.deleteButton}
                onClick={() => openDeleteModal(connect.id)}
              >
                  &#128465;
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
        />
      )}

      {showDeleteModal && (
        <ConfirmModal
          onConfirm={handleDeleteConfirm}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};


/*
//МОДАЛКО_ПИЗДЕЦ (не удалять пока)

export const WorkerAchievements: React.FC<WorkerAchievementsProps> = ({ userId }) => {
 
  //const [achieveList, setAchieveList] = useState<IAchieve[]>([]);  //старый-единый стейт(фильтрация по added)
  const [allAchievements, setAllAchievements] = useState<IAchieve[]>([]);  //стейт на ачивки библиотеки
  const [userAchievements, setUserAchievements] = useState<IConnection[]>([]);  //стейт на ачивки юзера
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");


  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedAchieveId, setSelectedAchieveId] = useState<string | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  
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
useEffect(() => {
if (userId) {
  console.log("useEffect: загрузка ачивок пользователя с userId:", userId);
  fetchGetIDUserAchieve(userId)
  .then((response) => {
    console.log("useEffect: Response ачивок пользователя:", response);
    const userAchievements: IConnection[] = response.data.map((connection: IConnection) => ({
      id: connection.id,
      data: connection.data
          }))
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



const openDeleteModal = (achieveId: string) => {
  setSelectedAchieveId(achieveId);
  setShowDeleteModal(true);
};

const handleDeleteConfirm = () => {
  if (selectedAchieveId) {
    removeAchieve(selectedAchieveId);
    setShowDeleteModal(false);
  }
};



const handleAddConfirm = () => {
  if (selectedAchieveId) {
    onAchieveAdd(selectedAchieveId);
    setShowAddModal(false); // Закрываем подтверждающее окно
    setSelectedAchieveId(null); // Сбрасываем выбранную ачивку
  }
};

const handleCancel = () => {
  setShowDeleteModal(false);
  //setShowAddModal(false);
};





// Функция добавления ачивки: 
const onAchieveAdd = (achieveId: string) => { 
setSelectedAchieveId(achieveId); //мутки с модалками
setShowAddModal(true);   //мутки с модалками
//console.log("onAchieveAdd: Добавление соединения с ачивкой с achieveId:", achieveId);  
if (userId) {
//POST-Создание связи между пользователем и достижением: 
   fetchPostUserAchieve(userId , achieveId)
   .then((response) => {
    setUserAchievements((prevUserAchievements) => {
      const newConnection: IConnection = response.data;
      return [...prevUserAchievements, newConnection];
    });
  })
  .catch((error) => {
    console.error("Ошибка при добавлении ачивки пользователю:", error);
  });
} else {
  console.error("Ошибка: userId не определен.");
}
setShowAddModal(false); // Закрываем модальное окно после выполнения действия
};


// Функция удаления ачивки: 
// DELETE-Удаление связи между пользователем и достижением по ID     
const removeAchieve = (userAchievementId: string) => {
  setSelectedAchieveId(userAchievementId);   //мутки с модалками
setShowDeleteModal(true);  //мутки с модалками
  // Отправляем запрос на удаление ачивки у пользователя
  console.log("Удаляем ачивку с id:", userAchievementId);
  fetchDeleteUserAchievement(userAchievementId)
    .then(() => {
      console.log("Ачивка успешно удалена на сервере.");
      // Обновляем список ачивок пользователя на клиенте
      setUserAchievements(prevAchievements => prevAchievements.filter((connect) => connect.id !== userAchievementId));
  })
    .catch((error) => {
      console.error("Ошибка при удалении ачивки пользователя:", error);
    });
    setShowDeleteModal(false); // Закрываем модальное окно после выполнения действия
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
    {userAchievements
      .filter((connect) => 
        //проверяем, есть ли что-то в searchQuery: 
        searchQuery ?     //если есть, фильтруем по запросу: 
        connect.data.achievement.data.title.toLowerCase().includes(searchQuery.toLowerCase()) :             true       //если нет, показываем все ачивки (метод includes() вернет true для всех элементов, т.к. пустая строка содержится в любой строке) 
        ).map((connect, index) => (
          <div
          key={index}
          className={styles.achievementCard}
          style={{
            backgroundImage: `url(${connect.data.achievement.data.achiev_style})`,
          }}
        >
            <button className={styles.achieveButton}>
              <img className={styles.achieveImg} src={connect.data.achievement.data.image} alt={connect.data.achievement.data.title} />
              <h3 className={styles.achieveTitle}>{connect.data.achievement.data.title}</h3>
              </button>
              <button className={styles.removeButton} onClick={() => openDeleteModal(connect.id)}>
                &times;
              </button>
          </div>
        ))
      }
    </div>  

    {showModal && (
      <ModalAchieveLibrary 
      allAchievements={allAchievements} 
      userAchievements={userAchievements} 
      closeModal={closeModal} 
      onAchieveAdd={onAchieveAdd}   
      setShowAddModal={setShowAddModal}  
      setShowConfirmModal={setShowConfirmModal}  
      setShowDeleteModal={setShowDeleteModal}  
      )}

{showDeleteModal && (
  <ConfirmModal
    message="Вы уверены, что хотите удалить ачивку?"
    onConfirm={handleDeleteConfirm}
    onCancel={handleCancel}
  />
)}

{showConfirmModal && (
      <ConfirmModal
          message="Вы уверены, что хотите добавить ачивку?"
          onConfirm={handleAddConfirm}
          onCancel={() => {
              setShowConfirmModal(false);
              setSelectedAchieveId(null);
          }}
          />
        )}
          </div>
        );
      }
*/
