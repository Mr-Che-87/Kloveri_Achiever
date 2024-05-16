import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import styles from "./ModalAddingAchieve.module.scss";

import { fetchPostAchieveLibrary } from "../../api/apiService";
import { IAchieve } from "../../types/IAchieve";
import ModalChooseImage from "./ModalChooseImage";
import ModalChooseBG from "./ModalChooseBG";

interface ModalAddingAchieveProps {
  closeModal: () => void;
  avatars: Array<{
    id: string;
    data: { image: string; title: string; description: string };
  }>;
  backgrounds: Array<{
    id: string;
    data: { image: string; title: string; description: string };
  }>;
  onAchieveAdd: (newAchieve: IAchieve) => void; // функция для передачи нового достижения родителю
}

const ModalAddingAchieve: React.FC<ModalAddingAchieveProps> = ({
  closeModal,
  avatars,
  backgrounds,
  onAchieveAdd,
}) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedBackground, setSelectedBackground] = useState<string | null>(
    null
  );
  const [rank, setRank] = useState<number | "">("");
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isBGModalOpen, setIsBGModalOpen] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !title ||
      !description ||
      !selectedImage ||
      !selectedBackground ||
      !rank
    ) {
      alert("Все поля должны быть заполнены.");
      return;
    }

    const achieveData = new FormData();
    achieveData.append("title", title);
    achieveData.append("description", description);
    achieveData.append("image", selectedImage);
    achieveData.append("achiev_style", selectedBackground);
    achieveData.append("rank", rank.toString());

    // Отладочные сообщения
    console.log("FormData entries:");
    achieveData.forEach((value, key) => {
      console.log(key, value);
    });

    try {
      const response = await fetchPostAchieveLibrary(achieveData);
      onAchieveAdd(response.data); // Передача нового достижения родителю
      closeModal();
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
  const handleRankChange = (e: ChangeEvent<HTMLInputElement>) =>
    setRank(e.target.valueAsNumber);
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setSelectedImage(e.target.files[0].name); // Хранение имени файла
  };
  const handleBackgroundChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setSelectedBackground(e.target.files[0].name); // Хранение имени файла
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
              required
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
            <label>Изображение</label>
            <button type="button" onClick={() => setIsImageModalOpen(true)}>
              Выбрать
            </button>
            <input type="file" onChange={handleImageChange} />
          </div>
          <div className={styles.formGroup}>
            <label>Фон</label>
            <button type="button" onClick={() => setIsBGModalOpen(true)}>
              Выбрать фон
            </button>
            <input type="file" onChange={handleBackgroundChange} />
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
      {isImageModalOpen && (
        <ModalChooseImage
          images={avatars}
          closeModal={() => setIsImageModalOpen(false)}
          onSelectImage={(image) => {
            setSelectedImage(image);
            setIsImageModalOpen(false);
          }}
        />
      )}
      {isBGModalOpen && (
        <ModalChooseBG
          backgrounds={backgrounds}
          closeModal={() => setIsBGModalOpen(false)}
          onSelectBackground={(background) => {
            setSelectedBackground(background);
            setIsBGModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default ModalAddingAchieve;
