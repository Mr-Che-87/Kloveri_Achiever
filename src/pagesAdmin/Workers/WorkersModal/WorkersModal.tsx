import { useState } from "react";
import styles from "./WorkersModal.module.scss";
// import uploadFile from "../../../assets/UploadFile.svg";
import iconCollaborator from "../../../assets/iconCollaborator.svg";
import iconClose from "../../../assets/iconCross.svg";
import iconCheack from "../../../assets/IconCheck.svg";
import WorkersModalAddUser from "../WorkersModalAddUser/WorkersModalAddUser";
import { IUser } from "../../../types/IUser";

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
  // Добавление состояния для contacts и setContacts функции

  const [showLink, setShowLink] = useState(false);
  const organizationId = localStorage.getItem("organization_id")
  const [link, ] = useState(`https://achiever.skroy.ru/registrations/${organizationId}`);

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
        <div className={styles.workersModal}>
          <div
            className={styles.workersModal__content}
            onClick={onWrapperClick}
          >
            <div className={styles.title}>
              <h3>Добавить сотрудников</h3>
            </div>
            <div className={styles.workersModal__form}>
              <div className={styles.workersModal__upload}>
                <button onClick={handleButtonClick}>
                {showLink ? 'Скрыть ссылку' : 'Показать ссылку для регистрации'}
                </button>
                {showLink && (
                  <div>
                    <input className={styles.linkShow} type="text" value={link} readOnly />
                  </div>
                )}
              </div>
              <p className={styles.or}>или</p>
              <form action="">
                <button
                  type="button"
                  className={styles.btn_collaborator}
                  onClick={handleAddUserClick}
                >
                  <img src={iconCollaborator} alt="" />
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
                  </div>

                  <p className={styles.text__description}>
                    Если этот пункт отмечен, на почту сотрудников будут
                    автоматически отправлены ссылки для авторизации
                  </p>
                </label> */}
              {/* </form> */}
            </div>
            <div className={styles.btnGroups}>
              <button className={styles.btn__close} onClick={onClose}>
                <img src={iconClose} alt="" />
                Отменить
              </button>
              <button className={styles.btn__add}>
                <img src={iconCheack} alt="" />
                Добавить
              </button>
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
