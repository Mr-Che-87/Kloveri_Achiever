import { FormEvent, useState } from "react";
import styles from "./WorkersModal.module.scss";
import uploadFile from "../../../assets/UploadFile.svg";
import iconCollaborator from "../../../assets/iconCollaborator.svg";
import iconClose from "../../../assets/iconCross.svg";
import iconCheack from "../../../assets/IconCheck.svg";

const WorkersModal = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }

  // закрывает модальное вне контента
  const onWrapperClick = (event) => {
    if (!event.currentTarget.contains(event.target)) {
     
      onClose();
    }
  };


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
                  {/* <button type="button" className={styles.btn_upload}>
                   
                    Загрузить файл
                  </button> */}
                </label>
              </form>
              <p className={styles.or}>или</p>
              <form action="">
                <button type="button" className={styles.btn_collaborator}>
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
              <button className={styles.btn__add}>
                <img src={iconCheack} alt="" />
                Добавить
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WorkersModal;
