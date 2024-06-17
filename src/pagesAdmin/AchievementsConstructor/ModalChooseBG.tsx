import React, { useState } from "react";
import styles from "./ModalChooseBG.module.scss";

interface ModalChooseBGProps {
  backgrounds: Array<{
    id: string;
    data: { image: string; title: string; description: string };
  }>;
  closeModal: () => void;
  onSelectBackground: (background: string) => void;
}

const ModalChooseBG: React.FC<ModalChooseBGProps> = ({
  backgrounds,
  closeModal,
  onSelectBackground,
}) => {
  const [selectedBackground, setSelectedBackground] = useState<string | null>(
    null
  );

  const handleBackgroundClick = (background: string) => {
    setSelectedBackground(background);
  };

  const handleConfirm = () => {
    if (selectedBackground) {
      onSelectBackground(selectedBackground);
      closeModal();
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button onClick={closeModal} className={styles.closeButton}>
          &times;
        </button>
        <h2>Выбрать фон</h2>
        <div className={styles.backgroundsGrid}>
          {backgrounds.map((background) => (
            <div
              key={background.id}
              className={`${styles.backgroundCard} ${selectedBackground === background.data.image ? styles.selected : ""}`}
              onClick={() => handleBackgroundClick(background.data.image)}
              style={{
                backgroundImage: `url(${background.data.image})`,
              }}
            >
              <div className={styles.cardContent}>
                <h5>{background.data.title}</h5>
                <p>{background.data.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.actions}>
          <button onClick={closeModal} className={styles.cancelButton}>
            Отменить
          </button>
          <button onClick={handleConfirm} className={styles.confirmButton}>
            Добавить
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalChooseBG;
