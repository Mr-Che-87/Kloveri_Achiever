import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import axios from "axios";
import styles from "./ModalAddingAchieve.module.scss";
import cardAchieveBG from "../../assets/CardAchievementBG.png";
import iconAddPhoto from "../../assets/iconAddPhoto.png";  //iconAddPhoto2.png - оранжевый
import iconPlus from "../../assets/bigAdd.svg"
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
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [imagePreview,setImagePreview] = useState<string | null>(null)
  const [selectedBackground, setSelectedBackground] = useState<string | null>(
    null
  );
  const [rank, setRank] = useState<number | "">("");
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isBGModalOpen, setIsBGModalOpen] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(true);

  useEffect(() => {
    if (backgrounds && backgrounds.length > 0) {
      setSelectedBackground(backgrounds[3].data.image); // [5] - оранжевый фон, [3] - фиолетовый
    }

      const handleEscKey = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          closeModal();
        }
      };
      document.addEventListener("keydown", handleEscKey);
      return () => {
        document.removeEventListener("keydown", handleEscKey);
      };
      
  }, [backgrounds, closeModal]);



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

  // const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) =>
  //   setTitle(e.target.value);

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 25) {
      setTitle(value);
    }
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setDescription(e.target.value);

  const handleRankChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 7) {
      setRank(e.target.valueAsNumber);
    }
  };

  // const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   // if (e.target.files) setSelectedImage(e.target.files[0].name); // Хранение имени файла
  //   if(e.target.files && e.target.files.length > 0) {
  //     const file = e.target.files[0];
  //     setSelectedImage(file);
      
  //   }
  // };
 
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  console.log(file, "file");
  if(file) {
    const url = URL.createObjectURL(file);
    setSelectedImage(file);
    setImagePreview(url)
    }
  }

  //функция обрезания дескрипшна с троеточием:
  const truncateDescription = (text: string): string => {
    const maxLength = 40;
    if (text.length > maxLength) {
      return text.substring(0, maxLength - 3) + "...";
    } else {
      return text;
    }
  };

  return (
    <div>
      {isModalVisible && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <button onClick={closeModal} className={styles.closeButton}>
              &times;
            </button>
            <div className={styles.modalTitle}>
              <img src={iconPlus} alt="" />
              <h2 className={styles.textTitle}>Создать достижение</h2>
            </div>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.addAchievePhotoContainer}>
                {
                  selectedBackground? (
                    <img 
                    className={styles.iconAddAchieve}
                    src={selectedBackground}
                    style={{ maxWidth: '100%', maxHeight: '100%', marginLeft: "-20px" }}
                    />
                  ) : (
                    <img
                  className={styles.iconAddAchieve}
                  src={cardAchieveBG}
                  alt="Icon Add Achieve"
                />
                  )
                }
                {
                selectedImage? (
                  <img 
                  className={styles.iconAddPhoto}
                  src={imagePreview ? imagePreview : selectedImage}
                  style={{ maxWidth: '100%', maxHeight: '100%' , left: "42px"}}
                  />
                ) : (
                  <img
              className={styles.iconAddPhoto}
              src={iconAddPhoto} 
              alt="Add photo"
                  />
                )
              }
              {
              title? (
                <p className={styles.titleHeadIcon}>{title}</p>
                ) : (
                <p className={styles.titleHeadIcon}>Название</p>
                ) 
              }
              {
              description ? (
                <p className={styles.descriptionHeadIcon}>{truncateDescription(description)}</p>
                ) : (
                <p className={styles.descriptionHeadIcon}>Описание</p>
                )
              }
              {
              rank ? (
                <p className={styles.rankHeadIcon}>{rank}&#8239;&#x20BF;</p>
                ) : (
                <p className={styles.rankHeadIcon}>&#x20BF;</p>
                )
              }
            </div>

            <div className={styles.nameAndRank }>
              <div className={`${styles.formGroup} ${styles.formGroupName}`}>
                <label htmlFor="title">Название</label>
                <input
                  className={styles.titleInput}
                  type="text"
                  id="title"
                  placeholder="Введите название"
                  value={title}
                  onChange={handleTitleChange}
                  maxLength={25}
                  required
                />
              </div>

              <div className={`${styles.formGroup} ${styles.formGroupRank}`}>
                <label htmlFor="rank">Ценность в баллах</label>
                <input
                  className={styles.rankInput}
                  type="number"
                  id="rank"
                  placeholder="Введите цену достижения"
                  value={rank}
                  onChange={handleRankChange}
                  maxLength={7}
                  required
                />
              </div>
            </div>


              <div
                className={`${styles.formGroup} ${styles.formGroupDescription}`}
              >
                <label htmlFor="description">Описание</label>
                <textarea
                  id="description"
                  placeholder="Введите описание"
                  value={description}
                  onChange={handleDescriptionChange}
                  required
                />
              </div>

              <div
                className={`${styles.formGroup} ${styles.formGroupBackground}`}
              >
                <label>Фон</label>
                <div className={styles.buttonAddBackgroundContainer}>
                  <button
                    type="button"
                    onClick={() => {
                      setIsBGModalOpen(true);
                      setIsModalVisible(false);
                    }}
                  >
                    Выбрать фон
                  </button>
                </div>
              </div>

              <div className={`${styles.formGroup} ${styles.formGroupImage}`}>
                <label>изменить</label>
                <div className={styles.avatarContainer}>
                  <div className={styles.chooseImageContainer}>
                    <button
                      type="button"
                      onClick={() => {
                        setIsImageModalOpen(true);
                        setIsModalVisible(false);
                      }}
                    >
                      Выбрать изменить
                    </button>
                  </div>
                  <div className={styles.addImageContainer}>                
                    <label className={styles.labelFileDownload} htmlFor="fileInput">
                      <p className={styles.pFileDownload}>или загрузить своё</p> 
                      <input
                        className={`${styles.fileDownload} ${styles.fileDownloadImage}`}
                        type="file"
                        id="fileInput"
                        onChange={handleImageChange}
                      /> 
                    </label> 
                  </div>
                </div>
              </div>


              <div className={styles.formActions}>
                <button
                  type="button"
                  onClick={closeModal}
                  className={styles.cancelButton}>
                  Отменить
                </button>
                <button type="submit" className={styles.submitButton}>
                  Добавить
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {isImageModalOpen && (
        <ModalChooseImage
          images={avatars}
          closeModal={() => {
            setIsImageModalOpen(false);
            setIsModalVisible(true);
          }}
          onSelectImage={(image) => {
            setSelectedImage(image);
            setIsImageModalOpen(false);
            setIsModalVisible(true);
          }}
        />
      )}
      {isBGModalOpen && (
        <ModalChooseBG
          backgrounds={backgrounds}
          closeModal={() => {
            setIsBGModalOpen(false);
            setIsModalVisible(true);
          }}
          onSelectBackground={(background) => {
            setSelectedBackground(background);
            setIsBGModalOpen(false);
            setIsModalVisible(true);
          }}
        />
      )}
    </div>
  );
};

export default ModalAddingAchieve;
