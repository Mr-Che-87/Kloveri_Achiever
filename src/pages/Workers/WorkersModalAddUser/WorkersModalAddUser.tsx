import React, { useEffect, useState } from "react";
import styles from "./WorkersModalAddUser.module.scss";
import { IUser } from "../../../types/IUser";
import { fetchPostUser } from "../../../api/apiService";
import defaultAvatar from "../../../assets/defaultAvatar.png";
import iconClose from "../../../assets/iconCross.svg";
import iconCheack from "../../../assets/IconCheck.svg";

interface WorkerModalAddUserProps {
  user: IUser | undefined;
  showEmail: boolean; //отображение мейла
  avatarSize: "small" | "large"; //отображение размера фотки
  onClose: boolean;
  onAddContact: (user: IUser) => void;
  userData?: IUser | null;
  onAddedUser: (user: IUser) => void;
}

export default function WorkersModalAddUser({
  onClose,
  onAddContact,
  userData,
  onAddedUser,
}: WorkerModalAddUserProps) {

  const [formData, setFormData] = useState<IUser>({} as IUser);

useEffect(() => {
  if(userData){
    setFormData(userData)
  }
}, [userData])

  const handleAddContact = () => {
    console.log("formData",formData)
    if (formData) {
      // Отправляем запрос на создание нового пользователя
      fetchPostUser(formData)
        .then((response) => {
          console.log("Пользователь создан успешно:", response.data);

          // Добавляем пользователя в список контактов
          onAddContact(formData);
          
        })
        .catch((error) => {
          console.log("Ошибка при создании пользователя:", error);
        });
    }
  };


  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      console.log("FileReader")
      reader.onload = (event) => {
        
        setFormData((currentFormData) => ({
          ...currentFormData,
          photo_small: event.target?.result as string,
          photo_main: event.target?.result as string,
          // photo_main: "https://i.pinimg.com/564x/d0/71/a4/d071a4b903ae8678c26a1628511c41ad.jpg",
          // photo_small: "https://i.pinimg.com/564x/d0/71/a4/d071a4b903ae8678c26a1628511c41ad.jpg",
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogin = (event: React.ChangeEvent<HTMLInputElement>) => {
    const email = event.target.value;
    setFormData((currentFormData) => ({
      ...currentFormData,
      email: email,
      sex: "male",
    }));
  };

  const handleFirstName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const firstName = event.target.value;
    setFormData((currentFormData) => ({
      ...currentFormData,
      first_name: firstName,
    }));
  };

  const handleSecondName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const secondName = event.target.value;
    setFormData((currentFormData) => ({
      ...currentFormData,
      last_name: secondName,
    }));
  };

  const handleMiddleName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const middleName = event.target.value;
    setFormData((currentFormData) => ({
      ...currentFormData,
      middle_name: middleName,
    }));
  };

  const handleBirthDay = (event: React.ChangeEvent<HTMLInputElement>) => {
    const birthDay = event.target.value;
    setFormData((currentFormData) => ({
      ...currentFormData,
      birth_date: birthDay,
    }));
  };

  const handleStartWorking = (event: React.ChangeEvent<HTMLInputElement>) => {
    const startWorking = event.target.value;
    setFormData((currentFormData) => ({
      ...currentFormData,
      other_info: {
        start_work: startWorking,
      },
    }));
  };

  const handlePhone = (event: React.ChangeEvent<HTMLInputElement>) => {
    const phone = event.target.value;
    setFormData((currentFormData) => ({
      ...currentFormData,
      phone: phone,
    }));
  };

  const handleWorkerPositionAdd = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const workerPositionAdd = event.target.value;
    setFormData((currentFormData) => ({
      ...currentFormData,
      other_info: {
        proffesion: workerPositionAdd,
      },
    }));
  };

  return (
    <div className={styles.workerModalAddUser}>
      <div className={styles.workerModalAddUser__content}>
        <div className={styles.WorkersModalAddUserContent}>
<div className={styles.title}>
          <p>Добавить сотрудника</p>
        </div>

          <div className={styles.header}>
            <div className={styles.avatarUser}>
              <label>
                <input
                  type="file"
                  name="uploadFile"
                  id="buttonFile"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleAvatarChange}
                />
                <img
                  className={styles.avatarUser}
                  src={formData?.photo_small || defaultAvatar}
                  alt="avatar"
                />
              </label>
            </div>
            <div className={styles.workerLoginAdd}>
              <h2>Логин</h2>
              <input
                name="email"
                type="email"
                placeholder="Введите Логин"
                value={formData ? formData.email : ""}
                onChange={handleLogin}
              />
            </div>
          </div>
          <div className={styles.checkbox__link}>
            <form action="checkbox__link">
              <input
                type="checkbox"
                name="checkbox__link"
                id="checkbox__link"
              />
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
                  value={formData ? formData.first_name : ""}
                  onChange={handleFirstName}
                />
              </div>

              <div className={styles.workerSecondNameAdd}>
                <h2>Фамилия</h2>
                <input
                  name="secondName"
                  type="text"
                  placeholder="Введите Фамилию"
                  value={formData ? formData.last_name : ""}
                  onChange={handleSecondName}
                />
              </div>

              <div className={styles.workerPatronymiAdd}>
                <h2>Отчество</h2>
                <input
                  name="patronymic"
                  type="text"
                  placeholder="Введите Отчество"
                  value={formData ? formData.middle_name : ""}
                  onChange={handleMiddleName}
                />
              </div>

              <div className={styles.workerBirthdayAdd}>
                <h2>Дата Рождения</h2>
                <input
                  name="birthday"
                  value={formData ? formData.birth_date : ""}
                  type="date"
                  onChange={handleBirthDay}
                />
              </div>
            </div>
            <div className={styles.formFilling__rightContent}>
              <div className={styles.workerStartdateAdd}>
                <h2>Дата начала работы</h2>
                <input
                  name="startWorking"
                  value={formData ? formData.other_info?.start_work : ""}
                  type="date"
                  onChange={handleStartWorking}
                />
              </div>

              <div className={styles.workerServiceNumber}>
                <h2>Номер телефона</h2>
                <input
                  name="phone"
                  type="text"
                  placeholder="Введите табельный номер"
                  value={formData ? formData.phone : ""}
                  onChange={handlePhone}
                />
              </div>

              <div className={styles.workerPositionAdd}>
                <h2>Роль</h2>
                <input
                  name="proffesion"
                  type="text"
                  placeholder="Введите Роль"
                  value={formData?.other_info?.proffesion || ""}
                  onChange={handleWorkerPositionAdd}
                />
              </div>
              <div className={styles.workerPassword}>
                <h2>Пароль</h2>
                <input type="text"
                name="password"
                placeholder="Введите пароль"
                
                />
              </div>
            </div>
          </div>

          <div className={styles.btnGroups}>
            <button className={styles.btn__close} onClick={onClose}>
              <img src={iconClose} alt="" />
              Отменить
            </button>
            <button className={styles.btn__add}  onClick={handleAddContact}>
              <img src={iconCheack} alt="" />
              Добавить
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
