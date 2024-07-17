import styles from './ConfirmModal.module.scss';

interface ConfirmModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ onConfirm, onCancel }) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <p>Вы уверены, что хотите лишить сотрудника этого достижения?</p>
        <div className={styles.buttonGroup}>
          <button className={styles.confirmButton} onClick={onConfirm}> {/*удалить/наградить */}
            Лишить 
          </button>  
          <button className={styles.cancelButton} onClick={onCancel}>
            Отмена
            </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
