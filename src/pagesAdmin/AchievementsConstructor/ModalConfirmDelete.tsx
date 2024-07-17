import React from "react";
import styles from "./ModalConfirmDelete.module.scss";

interface ModalConfirmDeleteProps {
  closeModal: () => void;
  confirmDelete: () => void;
}

const ModalConfirmDelete: React.FC<ModalConfirmDeleteProps> = ({
  closeModal,
  confirmDelete,
}) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <p>Вы уверены, что хотите удалить достижение из библиотеки?</p>
        <div className={styles.buttonGroup}>
          <button className={styles.confirmButton} onClick={confirmDelete}> 
            Удалить  
          </button>  
          <button className={styles.cancelButton} onClick={closeModal}>
            Отмена
            </button>
        </div>
      </div>
    </div>



    // <div className={styles.modalOverlay}>
    //   <div className={styles.modalContent}>
    //     <h2>Вы уверены, что хотите удалить это достижение?</h2>
    //     <div className={styles.actions}>
    //       <button onClick={confirmDelete} className={styles.confirmButton}>
    //         Удалить
    //       </button>
    //       <button onClick={closeModal} className={styles.cancelButton}>
    //         Отмена
    //       </button>
    //     </div>
    //   </div>
    // </div>
  );
};

export default ModalConfirmDelete;
