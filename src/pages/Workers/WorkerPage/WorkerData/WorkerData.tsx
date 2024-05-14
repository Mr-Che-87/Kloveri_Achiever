import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./WorkerData.module.scss";
import { ChangeWorkerInformationButton } from "../buttons&inputes/ChangeWorkerInformationButton";

import { IUser } from "../../../../types/IUser";
import { fetchUpdateUser } from "../../../../api/apiService";  //api
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

  
  //РУЧКИ ИЗМЕНЕНИЯ ИНПУТОВ:
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Вызов функции handleChange");
    const { name, value } = event.target;
       console.log("Изменённые данные до отправки на сервер:", event.target.value);
    setFormData((currentFormData) => ({
      ...(currentFormData ?? {}),
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
            selected={parseDateForPicker(formData.birthday)}
            onChange={(date) => handleDateChange(date, "birthday")}
            value={formData.birthday || ""}
            dateFormat="yyyy-MM-dd"
            disabled={!isEditing}
            onKeyDown={handleKeyDown} 
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
            onChange={(date) => setFormData({
                ...formData,
                other_info: {
                 ...formData?.other_info,
                 start_work: date?.toISOString().split("T")[0] || "",
                },
            })}
            dateFormat="yyyy-MM-dd"
            disabled={!isEditing}
            onKeyDown={handleKeyDown}
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
            onChange={e => {
              const value = e.target.value;
              setFormData((prevFormData) => ({
                ...prevFormData,
                other_info: {
                  ...prevFormData?.other_info,
                  proffesion: value,
                },
              }));
            }}
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
