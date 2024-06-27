import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./WorkerData.module.scss";
import { ChangeWorkerInformationButton } from "../buttons&inputes/ChangeWorkerInformationButton";
import defaultAvatar from "@/assets/defaultAvatar.png";
import { IUser } from "../../../types/IUser";
import { fetchUpdateUser } from "../../../api/apiService";  //api
//import { mockUserData, IUser } from "../../../../mocks/usersData"; //старая мок-заглушка


interface WorkerDataProps {
  isEditing: boolean;
  showEmail: boolean; //отображение мейла
  toggleEdit: () => void;
  userData: IUser | null;
  avatarSize: "small" | "large";
}

export default function WorkerData({
  isEditing,
  toggleEdit,
  userData,
  showEmail,
  avatarSize
}: WorkerDataProps) {
  
  const [formData, setFormData] = useState<IUser | null>(null);    //внутренний state данных юзера
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    if (userData) {
      setFormData({ ...userData });
      setImageUrl(userData.photo_main || defaultAvatar);
    }
  }, [userData]);

  
  //РУЧКИ ИЗМЕНЕНИЯ И ВАЛИДАЦИИ ИНПУТОВ:
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Вызов функции handleChange");
    const { name, value } = event.target;
       console.log("Изменённые данные до отправки на сервер:", event.target.value);
    setFormData((currentFormData) => ({
      ...currentFormData,
      [name]: value,
    }));
  };


    const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const sanitizedValue = inputValue.replace(/[^\d8]/g, ''); // Оставляем только "8"
    if (/^(\8)?\d{0,10}$/.test(sanitizedValue)) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        phone: sanitizedValue,
      }));
    }
  };

  const handleDateChange = (date: Date | null, fieldName: string) => {
    setFormData((currentFormData) => ({
      ...currentFormData,
      [fieldName]: date ? date.toISOString().split("T")[0] : "",
    }));
  };



  //PATCH:
  const handleSave = () => {
    console.log("Вызов функции handleSave");
    console.log("Сохранённые данные до отправки на сервер:", formData);
    toggleEdit();
    if (formData !== null && formData.profile_id) {
      const formDataToSend = new FormData();
      formDataToSend.append("profile_id", formData.profile_id);
      formDataToSend.append("first_name", formData.first_name ?? "");
      formDataToSend.append("last_name", formData.last_name ?? "");
      formDataToSend.append("middle_name", formData.middle_name ?? "");
      formDataToSend.append("birth_date", formData.birth_date ?? "");
      formDataToSend.append("phone", formData.phone ?? "");
      formDataToSend.append("email", formData.email ?? "");
      if (imageFile) {
        formDataToSend.append("photo_main", imageFile);
        formDataToSend.append("photo_small", imageFile);
      }
  
      fetchUpdateUser(formData.profile_id, formDataToSend)
        .then((response) => {
          console.log("Данные юзера успешно обновлены:", response.data);
          setImageUrl(response.data.photo_main || defaultAvatar); // Update image URL
        })
        .catch((error) => {
          console.error("Ошибка при обновлении данных пользователя:", error);
        });
    }
  };
  //сохранение через Enter:
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    console.log("Нажата клавиша:", event.key);
    if (event.key === "Enter" && isEditing) {
      console.log("Обработка сохранения через Enter");
      event.preventDefault();
      handleSave();
    }
  };


  //Дата-пикер:
  const parseDateForPicker = (dateStr?: string): Date | null => {
    if (!dateStr) {
      return null;
    }
    const date = new Date(dateStr);
    return date instanceof Date && !isNaN(date.getTime()) ? date : null;
  };


  if (!formData) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.workerData}>
      <div className={styles.workerInitial}>
        <div className={`${styles.avatarWrapper} ${styles[avatarSize]}`}>
          <img
            className={`${styles.workerAvatar} ${styles[avatarSize]}`}
            src={imageUrl ? imageUrl : defaultAvatar}
            alt="Avatar"
          />

          {isEditing && (
            <>
            <label htmlFor="changeAvatar">
                <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                id="changeAvatar"
                style={{display:"none"}}
              />
              <div className={styles.editIcon}>
                {/* <img src={cameraIcon} alt="Camera" /> */}
                <p>Изменить <br /> изображение</p>
              </div>
            </label>
            
            </>
          )}
        </div>

        <div>
          <div className={styles.workerName}>
            {`${formData.first_name} ${formData.last_name}` ||
              "Загружаем имя..."}
          </div>

          {showEmail && (
            <div className={styles.workerMail}>
              {formData.email || "Загружаем email..."}
            </div>
          )}
        </div>
      </div>
      <div className={styles.divider}></div>
      <div className={styles.workerDataTitle}>
        <h1>Информация</h1>
        <ChangeWorkerInformationButton
          isEditing={isEditing}
          toggleEdit={toggleEdit} 
          handleSave={handleSave}   
        />
      </div>
      <div className={styles.workerInformation}>
        <div className={styles.workerLogin}>
          <h2>Логин</h2>
          <input
            name="email"
            type="email"
            placeholder="Введите Логин"
            value={formData.email || ""}
            readOnly={!isEditing}
            required
          />
          <div className={styles.divider}></div>
        </div>

        <div className={styles.workerFullname}>
          <h2>Имя</h2>
          <input
            name="full-name"
            type="text"
            placeholder="Введите ФИО"
            value={`${formData.first_name || ""} ${formData.middle_name || ""} ${formData.last_name || ""}`}
            readOnly
          />
          <div className={styles.divider}></div>
        </div>

        <div className={styles.workerBirthday}>
          <h2>Дата рождения</h2>
                 
          <input
            name="birth_date"
            type="text"
            value={  formData.birth_date || ""}
            readOnly
          />
          <div className={styles.divider}></div>
        </div>

        <div className={styles.workerNumber}>
          <h2>Телефон</h2>
          <input
            name="phone"
            type="text"
            placeholder="Введите телефон"
            value={formData.phone || ""}  
            onChange={handlePhoneChange}
            onKeyDown={handleKeyDown}
            disabled={!isEditing}
          />
          <div className={styles.divider}></div>
        </div>

        <div className={styles.workerStartdate}>
          <h2>Дата начала работы</h2>
          <DatePicker
            selected={parseDateForPicker(formData?.start_work_date)}
            onChange={(date) => handleDateChange(date, "start_work_date")}
            value={formData.start_work_date || ""}
            dateFormat="yyyy-MM-dd"
            disabled={!isEditing}
            onKeyDown={handleKeyDown}
          />
          <div className={styles.divider}></div>
          
          <div className={styles.divider}></div>
        </div>

        <div className={styles.workerPosition}>
          <h2>Роль</h2>
          <input
            name="specialty"
            type="text"
            placeholder="Введите Роль"
            value={formData?.specialty || ""}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            disabled={!isEditing}
            required
          />
          <div className={styles.divider}></div>
        </div>
      </div>
    </div>
  );
}
