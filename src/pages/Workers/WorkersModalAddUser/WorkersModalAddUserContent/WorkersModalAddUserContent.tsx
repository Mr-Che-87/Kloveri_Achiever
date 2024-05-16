import React, { useEffect, useState } from "react";
import { IUser } from "../../../../types/IUser";
import styles from "./WorkersModalAddUserContent.module.scss";
import defaultAvatar from "../../../../assets/defaultAvatar.png";
import { fetchUpdateUser } from "../../../../api/apiService";
import { DatePicker } from "@mui/lab";

interface WorkersModalAddUserContentProps {
  isEditing: boolean;
  toggleEdit: () => void;
  userData: IUser | null;
}

export default function WorkersModalAddUserContent({
  isEditing,
  toggleEdit,
  userData,
}: WorkersModalAddUserContentProps) {
  const [formData, setFormData] = useState<IUser | null>(null); //внутренний state данных юзера

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
    const [firstName, middleName, lastName] = fullName.split(" ");
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

  return (
    <div className={styles.WorkersModalAddUserContent}>
      <div className={styles.header}>
        <div className={styles.avatarUser}>
          <img src={defaultAvatar} alt="" />
        </div>
        <div className={styles.workerLogin}>
          <h2>Логин</h2>
          <input
            name="email"
            type="email"
            placeholder="Введите Логин"
            value={""}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            required
          />
          <div className={styles.divider}></div>
        </div>
      </div>
      <div className={styles.checkbox__link}>
        <form action="checkbox__link">
          <input type="checkbox" name="checkbox__link" id="checkbox__link" />
          <label htmlFor="checkbox">
            <p>Отправить ссылку для авторизации</p>
          </label>
        </form>
        <div className={styles.workerName}>
          <h2>Имя</h2>
          <input
            name="firstName"
            type="text"
            placeholder="Введите Имя"
            value={""}
            onChange={handleFullNameChange}
            onKeyDown={handleKeyDown}
          />
          <div className={styles.divider}></div>
        </div>
        <div className={styles.workerName}>
          <h2>Фамилия</h2>
          <input
            name="secondName"
            type="text"
            placeholder="Введите Фамилию"
            value={""}
            onChange={handleFullNameChange}
            onKeyDown={handleKeyDown}
          />
          <div className={styles.divider}></div>
        </div>
        <div className={styles.workerName}>
          <h2>Отчество</h2>
          <input
            name="patronymic"
            type="text"
            placeholder="Введите Отчество"
            value={""}
            onChange={handleFullNameChange}
            onKeyDown={handleKeyDown}
          />
          <div className={styles.divider}></div>
        </div>

        <div className={styles.workerStartdate}>
          <h2>Дата Рождения</h2>
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
      </div>
    </div>
  );
}
