import React, { useEffect, useState } from "react";
import { IUser } from "../../../../types/IUser";
import styles from "./WorkersModalAddUserContent.module.scss";
import defaultAvatar from "../../../../assets/defaultAvatar.png";
import { fetchUpdateUser } from "../../../../api/apiService";
import iconClose from "../../../../assets/iconCross.svg";
import iconCheack from "../../../../assets/IconCheck.svg";

interface WorkersModalAddUserContentProps {
  isEditing: boolean;
  toggleEdit: () => void;
  userData: IUser | null;
  onClose: boolean;
}

export default function WorkersModalAddUserContent({
  isEditing,
 onClose,
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

  // const handleDateChange = (date: Date | null, fieldName: string) => {
  //   setFormData((currentFormData) => ({
  //     ...currentFormData,
  //     [fieldName]: date ? date.toISOString().split("T")[0] : "",
  //   }));
  // };

  //PATCH:
  const handleSave = () => {
    console.log("Вызов функции handleSave");
    console.log("Сохранённые данные до отправки на сервер:", formData);
   
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

 

  return (
    <div className={styles.WorkersModalAddUserContent}>
      <div className={styles.header}>
        <div className={styles.avatarUser}>
          <label >
                    <input
                    type="file"
                    name="uploadFile"
                    id="buttonFile"
                    accept="image/*"
                    style={{display:"none"}}
                  />
                  <img src={defaultAvatar} alt="" />
          </label>
                  
          
        </div>
        <div className={styles.workerLoginAdd}>
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
        </div>
      </div>
      <div className={styles.checkbox__link}>
        <form action="checkbox__link">
          <input type="checkbox" name="checkbox__link" id="checkbox__link" />
          <label htmlFor="checkbox">
            <p>Отправить ссылку для авторизации</p>
          </label>
        </form>
      </div>

      <div className={styles.formFilling}>
        <div className={styles.formFilling__leftContent}>
          <div className={styles.workerNameAdd}>
            <h2>Имя</h2>
            <input
              name="firstName"
              type="text"
              placeholder="Введите Имя"
              value={""}
              onChange={handleFullNameChange}
              onKeyDown={handleKeyDown}
            />
          </div>

          <div className={styles.workerSecondNameAdd}>
            <h2>Фамилия</h2>
            <input
              name="secondName"
              type="text"
              placeholder="Введите Фамилию"
              value={""}
              onChange={handleFullNameChange}
              onKeyDown={handleKeyDown}
            />
          </div>

          <div className={styles.workerPatronymiAdd}>
            <h2>Отчество</h2>
            <input
              name="patronymic"
              type="text"
              placeholder="Введите Отчество"
              value={""}
              onChange={handleFullNameChange}
              onKeyDown={handleKeyDown}
            />
          </div>

          <div className={styles.workerBirthdayAdd}>
            <h2>Дата Рождения</h2>
         <input
         name="birthday"
         value={""}
         type="date"
         onChange={handleFullNameChange}
         onKeyDown={handleKeyDown}
          />
          </div>
        </div>
        <div className={styles.formFilling__rightContent}>
          <div className={styles.workerStartdateAdd}>
            <h2>Дата начала работы</h2>
            <input 
            name="birthday"
            value={""}
            type="date"
            onChange={handleFullNameChange}
            onKeyDown={handleKeyDown}
            />
          </div>

          <div className={styles.workerServiceNumber}>
            <h2>Табельный номер</h2>
            <input
              name="patronymic"
              type="text"
              placeholder="Введите табельный номер"
              value={""}
              onChange={handleFullNameChange}
              onKeyDown={handleKeyDown}
            />
          </div>

          <div className={styles.workerPositionAdd}>
            <h2>Роль</h2>
            <input
              name="proffesion"
              type="text"
              placeholder="Введите Роль"
              value={formData?.other_info?.proffesion || ""}
              onChange={(e) => {
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
              required
            />
          </div>
        </div>
      </div>

      <div className={styles.btnGroups}>
              <button className={styles.btn__close} onClick={onClose} >
                <img src={iconClose} alt="" />
                Отменить
              </button>
              <button className={styles.btn__add}>
                <img src={iconCheack} alt="" />
                Добавить
              </button>
            </div>
    </div>
  );
}
