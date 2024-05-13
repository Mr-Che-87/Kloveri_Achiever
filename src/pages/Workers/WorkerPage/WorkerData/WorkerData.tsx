import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { IUser } from "../../../../types/IUser";
import styles from "./WorkerData.module.scss";
import { ChangeWorkerInformationButton } from "../buttons&inputes/ChangeWorkerInformationButton";
//import { mockUserData, IUser } from "../../../../mocks/usersData"; //старая мок-заглушка

import {
  fetchUpdateUser, 
  //как будет реестр:  POST-запрос user  -  2) изменяет данные существующего юзера 
} from "../../../../api/apiService";  //api

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
  const [formData, setFormData] = useState<IUser | null>(null);

  useEffect(() => {
    if (userData) {
      setFormData({ ...userData });
    }
  }, [userData]);


  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((currentFormData) => ({
      ...currentFormData,
      [name]: value,
    }));
  };

  const handleFullNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fullName = event.target.value;
    const [firstName, middleName, lastName] = fullName.split(' ');
    setFormData((currentFormData) => ({
      ...currentFormData,
      first_name: firstName,
      middle_name: middleName,
      last_name: lastName,
    }));
  };

  const handleDateChange = (date: Date | null, fieldName: keyof IUser) => {
    setFormData((currentFormData) => ({
      ...currentFormData,
      [fieldName]: date ? date.toISOString().split("T")[0] : "",
    }));
  };


  //сохранение через Enter:
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && isEditing) {
      event.preventDefault();
      handleSave();
    }
  };

//общее сохранение:
  const handleSave = () => {
    console.log("Сохранённые данные:", formData);
    toggleEdit();
    //PATCH-Обновление данных существующего пользователя:
    if (formData !== null && formData.profile_id) { //добавляем дополнительную проверку на formData !== null
      fetchUpdateUser(formData.profile_id, formData)
        .then((response) => {
          console.log("Данные юзера успешно обновлены:", response.data);
        })
        .catch((error) => {
          console.error("Ошибка при обновлении данных пользователя:", error);
        });
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
      <div className={styles.workerDataTitle}>
        <h1>Информация</h1>
        <ChangeWorkerInformationButton
          isEditing={isEditing}
          toggleEdit={toggleEdit}
        />
      </div>
      <div className={styles.workerInformation}>
        <div className={styles.workerLogin}>
          <h2>Логин</h2>
          <input
            name="contact_email"
            type="email"
            placeholder="Введите Логин"
            value={formData.contact_email?.[0]?.value || ""}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            disabled={!isEditing}
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
            onChange={handleFullNameChange}
            onKeyDown={handleKeyDown}
            disabled={!isEditing}
          />
          <div className={styles.divider}></div>
        </div>

        <div className={styles.workerBirthday}>
          <h2>Дата рождения</h2>
          <DatePicker
            selected={parseDateForPicker(formData.birth_date)}
            onChange={(date) => handleDateChange(date, "birth_date")}
            value={formData.birth_date || ""}
            dateFormat="yyyy-MM-dd"
            disabled={!isEditing}
          />
          <div className={styles.divider}></div>
        </div>

        <div className={styles.workerNumber}>
          <h2> Табельный номер</h2>
          <input
            name="tabel-number"
            type="text"
            placeholder="Введите Табельный номер"
            value={formData.project_id || ""}  //ЗАГЛУШКА, ибо "number" - НЕТ ПОЛЯ В РЕЕСТРЕ
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            disabled={!isEditing}
          />
          <div className={styles.divider}></div>
        </div>

        <div className={styles.workerStartdate}>
          <h2>Дата начала работы</h2>
          <DatePicker
            selected={parseDateForPicker(formData.birth_date)}
            onChange={(date) => handleDateChange(date, "birth_date")}  //ЗАГЛУШКА, ибо "registration_day" - НЕТ ПОЛЯ В РЕЕСТРЕ
            value={formData.birth_date || ""}
            dateFormat="yyyy-MM-dd"
            disabled={!isEditing}
          />
          <div className={styles.divider}></div>
        </div>

        <div className={styles.workerPosition}>
          <h2>Роль</h2>
          <input
            name="proffesion"
            type="text"
            placeholder="Введите Роль"
            value={formData?.project_info?.other_info?.proffesion || ""}
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
