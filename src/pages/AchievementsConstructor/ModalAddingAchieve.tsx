import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import styles from "./ModalAddingAchieve.module.scss";

interface ModalAddingAchieveProps {
  closeModal: () => void;
}

const ModalAddingAchieve: React.FC<ModalAddingAchieveProps> = ({
  closeModal,
}) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [background, setBackground] = useState<File | null>(null);
  const [rank, setRank] = useState<number | "">(""); // Добавляем состояние для ранга

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title || !description || !image || !background || !rank) {
      alert("Все поля должны быть заполнены.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image);
    formData.append("achiev_style", background);
    formData.append("rank", rank.toString()); // Приведение rank к строке

    try {
      const response = await axios.post("/api/achievements/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);
      closeModal(); // Закрытие модального окна после успешной отправки
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Ошибка при отправке данных формы:",
          error.response?.data
        );
      } else {
        console.error("Неизвестная ошибка при отправке данных формы:", error);
      }
    }
  };

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value);
  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setDescription(e.target.value);
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setImage(e.target.files[0]);
  };
  const handleBackgroundChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setBackground(e.target.files[0]);
  };
  const handleRankChange = (e: ChangeEvent<HTMLInputElement>) =>
    setRank(e.target.valueAsNumber);

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
              value={title}
              onChange={handleTitleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="description">Описание</label>
            <textarea
              id="description"
              placeholder="Введите описание"
              value={description}
              onChange={handleDescriptionChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="rank">Ранг</label>
            <input
              type="number"
              id="rank"
              placeholder="Введите ранг"
              value={rank}
              onChange={handleRankChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="imageInput">Изображение</label>
            <input
              type="file"
              id="imageInput"
              onChange={handleImageChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="backgroundInput">Фон</label>
            <input
              type="file"
              id="backgroundInput"
              onChange={handleBackgroundChange}
              required
            />
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
