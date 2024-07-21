import React, { useState } from "react";
import styles from "./ModalChooseImage.module.scss";

interface ModalChooseImageProps {
  images: Array<{
    id: string;
    data: { image: string; title: string; description: string };
  }>;
  closeModal: () => void;
  onSelectImage: (image: string) => void;
}

const ModalChooseImage: React.FC<ModalChooseImageProps> = ({
  images,
  closeModal,
  onSelectImage,
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
  };

  const handleConfirm = () => {
    if (selectedImage) {
      onSelectImage(selectedImage);
      closeModal();
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button onClick={closeModal} className={styles.closeButton}>
          &times;
        </button>
        <h2 className={styles.textTitle}>Выбрать изменить</h2>
        <div className={styles.imagesGrid}>
          {images.map((image) => (
            <div className={styles.card}>
              <div
                key={image.id}
                className={`${styles.imageCard} ${selectedImage === image.data.image ? styles.selected : ""}`}
                onClick={() => handleImageClick(image.data.image)}
                style={{
                  backgroundImage: `url(${image.data.image})`,
                }}
              ></div>
              <div className={styles.cardContent}>
                <h5>{image.data.title}</h5>
                {/* <p className={styles.cardDescription}>
                  {image.data.description}
                </p> */}
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

export default ModalChooseImage;
