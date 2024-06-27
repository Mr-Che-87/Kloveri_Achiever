/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { IUser } from "../../../types/IUser";

import iconClose from "../../../assets/iconCross.svg";
import iconCheack from "../../../assets/IconCheck.svg";
import WorkerModalTag from "./WorkerModalTag/WorkerModalTag";
import DatePicker from "react-datepicker";
import defaultAvatar from "../../../assets/defaultAvatar.png";
import styles from "./WorkersModalAddUser.module.scss";
import axios from "axios";

interface WorkerModalAddUserProps {
  user: IUser | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClose: () => void;
  onAddContact: (user: IUser) => void;
  userData?: IUser | null;
}

// interface IOtherInfoProps{
//   link_id: string | undefined,
//   organization_id: string | undefined,
//   specialty: string | undefined,
//   start_work_date: string | undefined,
// }


function WorkersModalAddUser({
  onClose,
  onAddContact,
  userData,
}: WorkerModalAddUserProps) {
  const organizationId = localStorage.getItem("organization_id")
  const [formData, setFormData] = useState<IUser>({
    organization_id: organizationId || "",
    login: "",
    first_name: "",
    last_name: "",
    middle_name: "",
    birth_date: "",
    phone: "",
    email: "",
    photo_main: "",
    photo_small: "",
    // specialty: "",
    // start_work_date: "",
    password: ""
  } as IUser);
  const [avatar, setAvatar] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  // const linkId = localStorage.getItem("linkId")

//  const [otherInfo, setOtherInfo] = useState<IOtherInfoProps>({
//     link_id: linkId || "",
//    organization_id: organizationId || "",
//    specialty: "",
//    start_work_date: "",
//  })
 

  useEffect(() => {
    console.log(formData, "sss");
  }, [formData]);

  useEffect(() => {
    if (userData) {
      setFormData(userData);
    }
  }, [userData]);

  const handleAddContact = () => {


   

    const formDataToSend = new FormData();
    formDataToSend.append("first_name", formData.first_name?? "");
    formDataToSend.append("last_name", formData.last_name?? "");
    formDataToSend.append("middle_name", formData.middle_name ?? "");
    formDataToSend.append("phone", formData.phone?? "");
    formDataToSend.append("email", formData.email?? "");
    formDataToSend.append("photo_main", formData.photo_main);
    formDataToSend.append("photo_small", formData.photo_small ?? "");
    formDataToSend.append("login",formData.login?? "" );
    formDataToSend.append("specialty ", formData.specialty?? "");
    formDataToSend.append("organization_id", formData.organization_id?? "");
    formDataToSend.append("password", formData.password?? "");
    // formDataToSend.append("start_work_date", formData.start_work_date?? "");

    if (formData) {
      console.log(formData, "formData");
  

      // Отправляем запрос на создание нового пользователя
      axios
        .post(`https://reg.achiever.skroy.ru/registrations/`, formDataToSend, {
          headers: {
            "Content-Type": "multipart/form-data",
             
          },
        })
        .then((response) => {
          const newContact = response.data;
          console.log("Пользователь создан успешно:", newContact);
          // Добавляем пользователя в список контактов
          onAddContact(newContact);

          onClose();
          onClose();
        })
        .catch((error) => {
          console.log("Ошибка при создании пользователя:", error);
        });
    }
  };

  // const handleAddOtherInfo = async () => {
  //   const formDataToSend  = new FormData();
  //   formDataToSend.append("start_work_date: ", otherInfo.start_work_date?? "");
  //   formDataToSend.append("specialty: ", otherInfo.specialty?? "");
  //   formDataToSend.append("organization_id", otherInfo.organization_id?? "");
  //   formDataToSend.append("link_id", otherInfo.link_id?? "");

  //   try{
  //   const response = await  axios.post(`https://reg.achiever.skroy.ru/link/`, formDataToSend);
  //   console.log("Данные успешно отправлены:", response.data);
  //   } catch(error){
  //     console.error("Ошибка при отправке дынных:", error)
  //   }
  // }



  const handleUltils = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      specialty: tags.join(),
    }));

    console.log(tags.join(), "tagsJOIN");
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file: File | undefined = event.target.files?.[0];
    console.log(file, "file");
    if (file) {
      const url = URL.createObjectURL(file);
      setAvatar(url);

      setFormData((prevFormData) => ({
        ...prevFormData,
        photo_main: file,
        photo_small: file,
      }));
    }
  };

  

  const handleLogin = (event: React.ChangeEvent<HTMLInputElement>) => {
    const email = event.target.value;
    setFormData((prevCurrentFormData) => ({
      ...prevCurrentFormData,
      email: email,
      login: email,

    }));
  };

  const handleFirstName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const firstName = event.target.value;
    setFormData((prevCurrentFormData) => ({
      ...prevCurrentFormData,
      first_name: firstName,
    }));
  };

  const handleSecondName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const secondName = event.target.value;
    setFormData((prevCurrentFormData) => ({
      ...prevCurrentFormData,
      last_name: secondName,
    }));
  };

  const handleMiddleName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const middleName = event.target.value;
    setFormData((prevCurrentFormData) => ({
      ...prevCurrentFormData,
      middle_name: middleName,
    }));
  };

  // const handleStartWork = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setOtherInfo((prevInfo) => ({
  //     ...prevInfo,
  //     start_work_date: event.target.value,
  //   }));
  // };

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
    setInputValue(inputValue);
    setFormData((prevFormData) => ({
      ...prevFormData,
      specialty: inputValue,
    }));
  };

  const handleTag = (inputValue: string) => {
    console.log("tags", tags, "inputValue", inputValue);

    if (inputValue) {
      if (!tags.includes(inputValue)) {
        setTags((prev) => [...prev, inputValue]);
      }
    }
  };

  useEffect(() => {
    handleUltils();
  }, [tags]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleTag(event.currentTarget.value.trim());
      setFormData((prevFormData) => ({
        ...prevFormData,
        specialty: inputValue,
      }));
    
    
    }
  };

  const handleWorkerPasswordAdd = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const workerPasswordAdd = event.target.value;
    setFormData((prevCurrentFormData) => ({
      ...prevCurrentFormData,
      password: workerPasswordAdd,
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
                style={{ display: "none" }}
                onChange={handleAvatarChange}
              />

              <img
                className={styles.avatarUser}
                src={avatar ? avatar : defaultAvatar}
                // src={avatar }
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
              value={formData ? formData.email  : ""}
              onChange={handleLogin}
            />
          </div>
        </div>

        <div className={styles.checkbox__link}>
          <form action="checkbox_modal">
            <label htmlFor="checkbox_modal">
              <input
                type="checkbox"
                name="checkbox_modal"
                id="checkbox_modal"
              />
              <p>Отправить ссылку для авторизации</p>
            </label>
          </form>
        </div>
        <div className={styles.formFilling}>
          <div className={styles.formFilling__rightContent}>
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
            {/* <div className={styles.workerStartdateAdd}>
              <h2 className={styles.description__title}>Дата начала работы</h2>
              <DatePicker
                className={styles.workersModalAddUser__input}
                placeholderText="Выберете дату"
                selected={parseDateForPicker(otherInfo.start_work_date)}
                onChange={(date) => handleStartWork(date, "start_work_date")}
                dateFormat="yyyy-MM-dd"
              />
            </div> */}

            <div className={styles.workerPhone}>
              <h2 className={styles.description__title}>Номер телефона</h2>
              <input
                className={styles.workersModalAddUser__input}
                name="phone"
                type="phone"
                placeholder="Введите номер "
                value={formData ? formData.phone : ""}
                autoComplete="off"
                onChange={handlePhoneChange}
              />
            </div>

            <div className={styles.workerPassword}>
              <h2 className={styles.description__title}>Пароль</h2>

              <input
                className={styles.workersModalAddUser__input}
                type="password"
                name="password"
                placeholder="Введите пароль"
                value={formData ? formData?.password : ""}
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
                value={formData ? formData.specialty : ""}
                onChange={handleWorkerPositionAdd}
                onKeyDown={handleKeyDown}
              />

              <WorkerModalTag setTags={setTags} tags={tags} removeTag={[]} />
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
              handleUltils();
              handleAddContact();
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
export default WorkersModalAddUser;
