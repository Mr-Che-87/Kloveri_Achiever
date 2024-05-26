import { useState } from "react";
import styles from "./WorkersModal.module.scss";
import uploadFile from "../../../assets/UploadFile.svg";
import iconCollaborator from "../../../assets/iconCollaborator.svg";
import iconClose from "../../../assets/iconCross.svg";
import iconCheack from "../../../assets/IconCheck.svg";
import WorkersModalAddUser from "../WorkersModalAddUser/WorkersModalAddUser";
import { fetchPostUser } from "../../../api/apiService";
import { IUser } from "../../../types/IUser";

interface WorkersModalProps{
  isOpen: boolean;
  onClose: () => void;
  createdUser: IUser | null;
  onAddContact: (user: IUser) => void;
  userData: IUser | null;
}

const WorkersModal = ({
   isOpen,
    onClose, 
    onAddContact,
     userData

 }: WorkersModalProps) => {
  
 // Добавление состояния для contacts и setContacts функции
 const [contacts, setContacts] = useState<IUser[]>([]);

  const handleAddContact = (user: IUser) => {
    setContacts((prevContacts) => [...prevContacts,user])
  }
  
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  if (!isOpen) {
    return null;
  }

  // закрывает модальное вне контента
  const onWrapperClick = (event) => {
    if (!event.currentTarget.contains(event.target)) {
     
      onClose();
    }
  };




const handleAddUserClick = () =>{
  setIsAddUserOpen(true)
}
  return (
    <>
      {isOpen && (
        <div className={styles.workersModal} >
          <div className={styles.workersModal__content} onClick={onWrapperClick} >
            <div className={styles.title}>
              <h3>Добавить сотрудников</h3>
            </div>
            <div className={styles.workersModal__form}>
              <form className={styles.workersModal__upload}>
                <label >
                  <input
                    type="file"
                    name="uploadFile"
                    id="buttonFile"
                    accept="image/*"
                    style={{display:"none"}}
                  />
                    <img src={uploadFile} alt="" />
                    <p>Загрузить файл</p>
                </label>
              </form>
              <p className={styles.or}>или</p>
              <form action="">
                <button type="button" className={styles.btn_collaborator} onClick={handleAddUserClick} >
                  <img src={iconCollaborator} alt="" />
                  Ввести данные
                </button>
              </form>
            </div>

            <div className={styles.workersModal__formCheckbox}>
              <form action="checkbox">
                <input type="checkbox" name="checkbox" id="checkbox" className={styles.checkboxType} />
                <label htmlFor="checkbox">
                  <div>
                    <p className={styles.text__title}>Отправить ссылки для авторизации</p>
                  </div>
                   
                <p className={styles.text__description}>
                  Если этот пункт отмечен, на почту сотрудников будут
                  автоматически отправлены ссылки для авторизации
                </p>
                </label>
              </form>
            </div>
            <div className={styles.btnGroups}>
              <button className={styles.btn__close} onClick={onClose}>
                <img src={iconClose} alt="" />
                Отменить
              </button>
              <button className={styles.btn__add} >
                <img src={iconCheack}  alt="" />
                Добавить
              </button>
            </div>
          </div>
        </div>
      )}
      {isAddUserOpen &&(
        <WorkersModalAddUser  
        onAddContact={handleAddContact}
        userData={userData}
        onClose={() => setIsAddUserOpen(false)}/>
      )}
    </>
  );
};

export default WorkersModal;
