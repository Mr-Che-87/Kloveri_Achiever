import React, { useState, useEffect, FormEvent  } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { IUser } from "../../../../types/IUser";
import styles from "./WorkerData.module.scss";
import { ChangeWorkerInformationButton } from "../buttons&inputes/ChangeWorkerInformationButton";
//import { mockUserData, IUser } from "../../../../mocks/usersData"; //старая мок-заглушка


import axios from "axios";
import { fetchUpdateUser } from "../../../../api/apiService";  //api

interface WorkerDataProps {
  isEditing: boolean;
  toggleEdit: () => void;
  userData: IUser | null;
  profile_id?: string;
  //updateUserData: (updatedUserData: IUser) => void;
}

export default function WorkerData({
  isEditing,
  toggleEdit,
  userData,
  profile_id,
  //updateUserData,
}: WorkerDataProps) {
  
  const [formData, setFormData] = useState<IUser | null>(null);    //внутренний state данных юзера

  useEffect(() => {
    if (userData) {
      setFormData({ ...userData });
    }
  }, [userData]);


  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!profile_id) {
      console.error('profile_id is undefined');
      return;
    }
  
  const workerData = new FormData();
  workerData.append("first_name", formData?.first_name || ""); // Исправление ошибки с first_name
  workerData.append("last_name", formData?.last_name || "");
  workerData.append("middle_name", formData?.middle_name || "");
  workerData.append("birth_date", formData?.birth_date || "");
  workerData.append("sex", formData?.sex || "");
  workerData.append("phone", formData?.phone || "");
  workerData.append("email", formData?.email || "");
  workerData.append("photo_main", formData?.photo_main || "");
  workerData.append("photo_small", formData?.photo_small || "");
  workerData.append("proffesion", formData?.other_info?.proffesion || "");
  workerData.append("start_work", formData?.other_info?.start_work || "");
  
  try {
    const response = await fetchUpdateUser(profile_id, workerData);
    console.log(response.data);
    
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error( "Ошибка при отправке данных формы:", error.response?.data);
    } else {
      console.error("Неизвестная ошибка при отправке данных формы:", error);
    }
  }
  }
  
  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    handleSubmit(e); // Вызываем handleSubmit без аргументов
  };

  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Вызов функции handleChange");
    const { name, value } = event.target;
       console.log("Изменённые данные до отправки на сервер:", event.target.value);
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

  const handleDateChange = (date: Date | null, fieldName: string) => {
    setFormData((currentFormData) => ({
      ...currentFormData,
      [fieldName]: date ? date.toISOString().split("T")[0] : "",
    }));
  };


  /*
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
*/

  //сохранение через Enter:
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    console.log("Нажата клавиша:", event.key);
    if (event.key === "Enter" && isEditing) {
      console.log("Обработка сохранения через Enter");
      event.preventDefault();
      //handleSubmit(userData);
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
     <form onSubmit={handleFormSubmit}> 
      <div className={styles.workerDataTitle}>
        <h1>Информация</h1>
        <ChangeWorkerInformationButton
          isEditing={isEditing}
          toggleEdit={toggleEdit}    //или   {handleSave}
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
          <h2>Телефон</h2>
          <input
            name="phone"
            type="text"
            placeholder="Введите телефон"
            value={formData.phone || ""}  
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            disabled={!isEditing}
          />
          <div className={styles.divider}></div>
        </div>

        <div className={styles.workerStartdate}>
          <h2>Дата начала работы</h2>
          <DatePicker
            selected={parseDateForPicker(formData?.other_info?.start_work)}
            onChange={(date) => handleDateChange(date, "start_work")}  
            value={formData?.other_info?.start_work || ""}
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
            value={formData?.other_info?.proffesion || ""}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            disabled={!isEditing}
            required
          />
          <div className={styles.divider}></div>
        </div>
      </div>
      </form>
    </div>
  );
}
