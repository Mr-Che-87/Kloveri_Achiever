import { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./WorkerData.module.scss";
import { ChangeWorkerInformationButton } from "../buttons&inputes/ChangeWorkerInformationButton";

import { IUser } from "../../../types/IUser";
import { fetchUpdateUser } from "../../../api/apiService";  //api
//import { mockUserData, IUser } from "../../../../mocks/usersData"; //старая мок-заглушка


interface WorkerDataProps {
  isEditing: boolean;
  toggleEdit: () => void;
  userData: IUser | null;
}

export default function WorkerData({
  isEditing,
  toggleEdit,
  userData,
}: WorkerDataProps) {
  
  const [formData, setFormData] = useState<IUser | null>(null);    //внутренний state данных юзера

  useEffect(() => {
    if (userData) {
      setFormData({ ...userData });
    }
  }, [userData]);

  
  //РУЧКИ ИЗМЕНЕНИЯ И ВАЛИДАЦИИ ИНПУТОВ:
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


  //PATCH:
  const handleSave = () => {
    console.log("Вызов функции handleSave");
    console.log("Сохранённые данные до отправки на сервер:", formData);
    toggleEdit();
    if (formData !== null && formData.profile_id) { 
      fetchUpdateUser(formData.profile_id, formData)
        .then((response) => {
          console.log("Данные юзера успешно обновлены:", response.data);
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

// const handleProffesionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//   const  

// }


  if (!formData) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.workerData}>
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
          <input
            name="start_work"
            type="text"
            value={  formData?.other_info?.start_work || ""}
            readOnly
          />
          
          <div className={styles.divider}></div>
        </div>

        <div className={styles.workerPosition}>
          <h2>Роль</h2>
          <input
            name="proffesion"
            type="text"
            placeholder="Введите Роль"
            value={formData?.other_info?.proffesion || ""}
            readOnly
            required
          />
          <div className={styles.divider}></div>
        </div>
      </div>
    </div>
  );
}
