import styles from "./ModalAddingAchieve.module.scss";

const ModalAddingAchieve = ({ closeModal }) => {
  // Функция для обработки отправки формы
  const handleSubmit = (e) => {
    e.preventDefault();
    // Обработка данных формы
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button onClick={closeModal} className={styles.closeButton}>
          &times;
        </button>

        <h2>Создать достижение</h2>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="title">Название</label>
            <input
              type="text"
              id="title"
              placeholder="Введите название"
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="description">Описание</label>
            <textarea id="description" placeholder="Введите описание" />
          </div>
          <div className={styles.formGroup}>
            <label>Изображение</label>
            <div className={styles.fileInputContainer}>
              <button type="button" className={styles.fileInput}>
                Выбрать
              </button>
              <span>или</span>
              <button type="button" className={styles.uploadButton}>
                Загрузить
              </button>
            </div>
          </div>
          <div className={styles.formGroup}>
            <label>Фон</label>
            <button type="button" className={styles.fileInput}>
              Выбрать фон
            </button>
          </div>
          <div className={styles.formActions}>
            <button
              type="button"
              onClick={closeModal}
              className={styles.cancelButton}
            >
              Отменить
            </button>
            <button type="submit" className={styles.submitButton}>
              Добавить
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalAddingAchieve;
