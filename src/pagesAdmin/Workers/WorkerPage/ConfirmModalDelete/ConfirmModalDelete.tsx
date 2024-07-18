import React from 'react'
import styles from "./ConfirmModalDelete.module.scss"



interface ConfirmModalDeleteProps {
    onConfirm: () => void;
    onCancel: () => void;
    message: string;
  }
  
  const ConfirmModalDelete: React.FC<ConfirmModalDeleteProps> = ({ onConfirm, onCancel }) => {
    return (
      <div className={styles.modalOverlay}>
        <div className={styles.modalContent}>
          <p>Вы уверены, что хотите удалить сотрудника ?</p>
          <div className={styles.buttonGroup}>
            <button className={styles.confirmButton} onClick={onConfirm}> {/*удалить/наградить */}
              Удалить 
            </button>  
            <button className={styles.cancelButton} onClick={onCancel}>
              Отмена
              </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default ConfirmModalDelete;
  