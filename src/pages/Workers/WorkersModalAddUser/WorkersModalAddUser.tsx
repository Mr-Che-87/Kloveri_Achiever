import React, { useEffect, useState } from "react";
import styles from "./WorkersModalAddUser.module.scss";
import { IUser } from "../../../types/IUser";
import { fetchPostUser } from "../../../api/apiService";
import defaultAvatar from "../../../assets/defaultAvatar.png";
import iconClose from "../../../assets/iconCross.svg";
import iconCheack from "../../../assets/IconCheck.svg";
import WorkerModalTag from "./WorkerModalTag/WorkerModalTag";
import DatePicker from "react-datepicker";
import axios from "axios";

interface WorkerModalAddUserProps {
  user: IUser | undefined;
  showEmail: boolean; //отображение мейла
  avatarSize: "small" | "large"; //отображение размера фотки
  onClose: any;
  onAddContact: (user: IUser) => void;
  userData?: IUser | null;
  onAddedUser: (user: IUser) => void;
}

export default function WorkersModalAddUser({
  onClose,
  onAddContact,
  userData,
}: WorkerModalAddUserProps) {
  const [formData, setFormData] = useState<IUser>({} as IUser);
  const [tags, setTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("")

  useEffect(() => {
    if (userData) {
      setFormData(userData);
    }
  }, [userData]);

  const handleAddContact = () => {
    console.log("formData", formData);
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


  // const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files?.[0];
  //   if(file){
  //     const formData = new FormData();
  //     formData.append("photo", file);
      
  //     axios.post('/media/imag/', formData)
  //     .then(response => {
  //       const imageUrl = response.data.url;
  //       setFormData((currentFormData) => ({
  //         ...currentFormData,
  //         photo_main:imageUrl,
  //         photo_small:imageUrl,
  //       }))
  //     })
  //     .catch(error => {
  //       console.error(error)
  //     })
  //   }
  // }
  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setFormData((currentFormData) => ({
        ...currentFormData,
        photo_small: url,
        photo_main: url,
      }));
    }
  };

  // const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files?.[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     console.log("FileReader");
  //     reader.onload = (event) => {
  //       setFormData((currentFormData) => ({
  //         ...currentFormData,
       
  //         photo_small: event.target?.result as string,
  //         photo_main: event.target?.result as string,
  //         // photo_main:
  //         //   "https://i.pinimg.com/564x/d0/71/a4/d071a4b903ae8678c26a1628511c41ad.jpg",
  //         // photo_small:
  //         //   "https://i.pinimg.com/564x/d0/71/a4/d071a4b903ae8678c26a1628511c41ad.jpg",
  //       }));
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

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

  const handleDateChange = (date: Date | null, fieldName: string) => {
    setFormData((currentFormData) => ({
      ...currentFormData,
      [fieldName]: date ? date.toISOString().split("T")[0] : "",
    }));
  };

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const sanitizedValue = inputValue.replace(/[^\d8]/g, ""); // Оставляем только "8"
    if (/^(\8)?\d{0,10}$/.test(sanitizedValue)) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        phone: sanitizedValue,
      }));
    }
  };

  const handleWorkerPositionAdd = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputValue = event.target.value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      other_info: {
        ...prevFormData.other_info,
        profession: inputValue,
      },
    }));
  };

  const handleTag = (inputValue: string) => {
    if (inputValue) {
      if (!tags.includes(inputValue)) {
        setTags([...tags, inputValue]);
      }
      handleWorkerPositionAdd({ target: { name: "proffesion", value: "" } });
      
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleTag(event.currentTarget.value.trim());
    }
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    handleTag(event.target.value.trim());
  };

  const handleWorkerPasswordAdd = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const workerPasswordAdd = event.target.value;
    setFormData((currentFormData) => ({
      ...currentFormData,
      other_info: {
        password_work: workerPasswordAdd,
      },
    }));
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
    <div className={styles.workerModalAddUser}>
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
              <h2 className={styles.description__title}>Логин</h2>
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
            <form action="checkbox_modal">
              <label htmlFor="checkbox_modal">
                 <input type="checkbox" name="checkbox_modal" id="checkbox_modal" />
                <p>Отправить ссылку для авторизации</p>
              </label>
            </form>
          </div>
          <div className={styles.formFilling}>
            <div className={styles.formFilling__leftContent}>
              <div className={styles.workerNameAdd}>
                <h2 className={styles.description__title}>Имя</h2>
                <input
                  className={styles.workersModalAddUser__input}
                  name="firstName"
                  type="text"
                  placeholder="Введите Имя"
                  value={formData ? formData.first_name : ""}
                  onChange={handleFirstName}
                />
              </div>

              <div className={styles.workerSecondNameAdd}>
                <h2 className={styles.description__title}>Фамилия</h2>
                <input
                  className={styles.workersModalAddUser__input}
                  name="secondName"
                  type="text"
                  placeholder="Введите Фамилию"
                  value={formData ? formData.last_name : ""}
                  onChange={handleSecondName}
                />
              </div>

              <div className={styles.workerPatronymiAdd}>
                <h2 className={styles.description__title}>Отчество</h2>
                <input
                  className={styles.workersModalAddUser__input}
                  name="patronymic"
                  type="text"
                  placeholder="Введите Отчество"
                  value={formData ? formData.middle_name : ""}
                  onChange={handleMiddleName}
                />
              </div>

              <div className={styles.workerBirthdayAdd}>
                <h2 className={styles.description__title}>Дата Рождения</h2>
                <DatePicker
                  className={styles.workersModalAddUser__input}
                  placeholderText="Выберите дату"
                  selected={parseDateForPicker(formData.birth_date)}
                  onChange={(date) => handleDateChange(date, "birth_date")}
                  value={formData.birth_date || ""}
                  dateFormat="yyyy-MM-dd"
                />
              </div>
            </div>
            <div className={styles.formFilling__rightContent}>
              <div className={styles.workerStartdateAdd}>
                <h2 className={styles.description__title}>
                  Дата начала работы
                </h2>
                <DatePicker
                  className={styles.workersModalAddUser__input}
                  placeholderText="Выберете дату"
                  selected={parseDateForPicker(
                    formData?.other_info?.start_work
                  )}
                  onChange={(date) =>
                    setFormData({
                      ...formData,
                      other_info: {
                        ...formData?.other_info,
                        start_work: date?.toISOString().split("T")[0] || "",
                      },
                    })
                  }
                  dateFormat="yyyy-MM-dd"
                />
              </div>

              <div className={styles.workerPhone}>
                <h2 className={styles.description__title}>Номер телефона</h2>
                <input
                  className={styles.workersModalAddUser__input}
                  name="phone"
                  type="text"
                  placeholder="Введите номер "
                  value={formData ? formData.phone : ""}
                  onChange={handlePhoneChange}
                />
              </div>
              <div className={styles.workerPassword}>
                <h2 className={styles.description__title}>Пароль</h2>
                <input
                  className={styles.workersModalAddUser__input}
                  type="text"
                  name="password"
                  placeholder="Введите пароль"
                  onChange={handleWorkerPasswordAdd}
                />
              </div>

              <div className={styles.workerPositionAdd}>
                <h2 className={styles.description__title}>Роль</h2>
                <input
                  className={styles.workersModalAddUser__input}
                  name="proffesion"
                  type="text"
                  placeholder="Введите Роль"
                  value={formData?.other_info?.profession || ""}
                  onChange={handleWorkerPositionAdd}
                  onKeyDown={handleKeyDown}
                  onBlur={handleBlur}
                />
                <button className={styles.btnAddTag} onClick={() => handleTag(inputValue)} >  + </button>
                <WorkerModalTag
                  setTags={setTags}
                  tags={tags}
                  formData={undefined}
                  removeTag={[]}
                />
              </div>
            </div>
          </div>

          <div className={styles.btnGroups}>
            <button className={styles.btn__close} onClick={onClose}>
              <img src={iconClose} alt="close" />
              Отменить
            </button>
            <button
              className={styles.btn__add}
              onClick={() => {
                handleAddContact();
                onClose();
              }}
            >
              <img src={iconCheack} alt="check" />
              Добавить
            </button>
          </div>
        </div>
      
    </div>
  );
}
