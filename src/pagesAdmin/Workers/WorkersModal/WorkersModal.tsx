import { useState } from "react";
import styles from "./WorkersModal.module.scss";
// import uploadFile from "../../../assets/UploadFile.svg";
import iconDocument from "../../../assets/iconDocument.svg";
import WorkersModalAddUser from "../WorkersModalAddUser/WorkersModalAddUser";
import { IUser } from "../../../types/IUser";
import iconAddPlus from "../../../assets/plus.svg";
import iconChain from "../../../assets/chain.svg";

interface WorkersModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddContact: (user: IUser) => void;
  userData: IUser | null;
  user: IUser;
}

const WorkersModal = ({
  user,
  isOpen,
  onClose,
  userData,
  onAddContact,
}: WorkersModalProps) => {
  const [showLink, setShowLink] = useState(false);
  const userDataString = localStorage.getItem("userData");

  let organizationId = "";
  if (userDataString) {
    try {
      const userData = JSON.parse(userDataString);
      organizationId = userData.organization_id;
    } catch (error) {
      console.error("Ошибка при парсинге данных userData из localStorage:", error);
    }
  } else {
    console.log("Данные userData не найдены в localStorage");
  }

  const [link,] = useState(`https://achiever.skroy.ru/registrations/?organization_id=${organizationId}`);
  const handleButtonClick = () => {
    setShowLink(!showLink);
  };

  const handleAddContact = (user: IUser) => {
    onAddContact(user);
  };

  const [isAddUserOpen, setIsAddUserOpen] = useState(false);

  // закрывает модальное вне контента
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onWrapperClick = (event: any) => {
    if (!event.currentTarget.contains(event.target)) {
      onClose();
    }
  };

  const handleAddUserClick = () => {
    setIsAddUserOpen(!showLink);
  };

  return (
    <>
      {isOpen && (
        <div className={styles.modalOverlay}>
      
          <div className={styles.workersModal}>
               <button onClick={onClose} className={styles.closeButton}>
          &times;
          </button>
            <div
              className={styles.workersModal__content}
              onClick={onWrapperClick}
            >
              <div className={styles.title}>
                <h3>
                  <img src={iconAddPlus} />
                  Добавить сотрудников
                </h3>
              </div>
              <div className={styles.workersModal__form}>
                <div className={styles.workersModal__upload}>
                  <button onClick={handleButtonClick}>
                    <img src={iconChain} alt="Chain" />
                    {showLink ? 'Скрыть ссылку' : 'Показать ссылку для регистрации'}
                  </button>
                  {showLink && (
                    <div>
                      <input className={styles.linkShow} type="text" value={link} readOnly />
                    </div>
                  )}
                </div>
                <p className={styles.or}>или</p>
                <form>
                  <button
                    type="button"
                    className={styles.btn_collaborator}
                    onClick={handleAddUserClick}
                  >
                    <img src={iconDocument} alt="" />
                    Ввести данные
                  </button>
                </form>
              </div>
  
              <div className={styles.workersModal__formCheckbox}>
                {/* <form action="checkbox">
                  <input
                    type="checkbox"
                    name="checkbox"
                    id="checkbox"
                    className={styles.checkboxType}
                  /> */}
                {/* <label htmlFor="checkbox">
                  <div>
                    <p className={styles.text__title}>
                      Отправить ссылки для авторизации
                    </p>
                  </label>
  
                  <p className={styles.text__description}>
                    Если этот пункт отмечен, на почту сотрудников будут
                    автоматически отправлены ссылки для авторизации
                  </p>
                </form> */}
              </div>
              <div className={styles.btnGroups}>
                <button className={styles.btn__close} onClick={onClose}>
                  Отменить
                </button>
                <button className={styles.btn__add}>
                  Добавить
                </button>
              </div>
            </div>
          </div>
        </div>
        )}
        {isAddUserOpen && (
          <WorkersModalAddUser
            onAddContact={handleAddContact}
            userData={userData}
            onClose={() => {
              setIsAddUserOpen(false);
            }}
            user={user}
          />
        )}
    </>
  );
};

export default WorkersModal;