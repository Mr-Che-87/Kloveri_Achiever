import React, { useEffect, useState } from "react";
import { IUser } from "../../../types/IUser";
import { fetchPostUser } from "../../../api/apiService";
import defaultAvatar from "../../../assets/defaultAvatar.png";
import iconClose from "../../../assets/iconCross.svg";
import iconCheack from "../../../assets/IconCheck.svg";
import WorkerModalTag from "./WorkerModalTag/WorkerModalTag";
import DatePicker from "react-datepicker";
import axios from "axios";
import styles from "./WorkersModalAddUser.module.scss";

interface WorkerModalAddUserProps {
  user: IUser | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClose: () => void;
  onAddContact: (user: IUser) => void;
  userData?: IUser | null;
  
}

interface IOtherStateInfo {
  profession: string;

  start_work: string;
  password_work: string;
}

function WorkersModalAddUser({
 
  onClose,
  onAddContact,
  userData,
}: WorkerModalAddUserProps) {
  const [formData, setFormData] = useState<IUser>({
    first_name:"",
    last_name:"",
    middle_name:"",
    birth_date:"",
    sex:"",               
    phone:"", 
    email:"",    
    photo_main:"" ,        
    photo_small:"" ,
  } as IUser);
 
  const [tags, setTags] = useState<string[]>([]);
  const [inputValue] = useState("");
  const [otherState, setOtherState] = useState<IOtherStateInfo>({
    profession: "",
    start_work: "",
    password_work: "",
  });
 

  useEffect(() => {
    console.log(otherState, "sss");
  }, [otherState]);

  useEffect(() => {
    if (userData) {
      setFormData(userData);
    }
  }, [userData]);

  const handleAddContact = () => {
    if (
      !formData.email ||
      !formData.first_name ||
      !formData.last_name ||
      !formData.phone ||
      !formData.photo_main
    ) {
      alert(
        "Пожалуйста, заполните все поля, добавьте фото"
      );
      return;
    }

    
    console.log(otherState, "otherState");

    if (formData) {
      console.log(formData, "formData");
      const newOtherState = formData;
      newOtherState.other_info = otherState;
      console.log(newOtherState, "newOtherState");
      // Отправляем запрос на создание нового пользователя
      fetchPostUser(formData)
        .then((response) => {
            

          console.log("Пользователь создан успешно:", response.data);
          const newContact = response.data;



          console.log(newContact,"newContact")
           
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

  
  const handleUltils = () => {
    setOtherState((prevFormData) => ({
      ...prevFormData,
      profession: tags.join(),
    }));

    console.log(tags.join(), "tagsJOIN");
  };


  // const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    
  //   const file: File | undefined = event.target.files?.[0];
  //    console.log(file, "file")
  //   if(!file) return;
  //   const newAvatar =  URL.createObjectURL(file) as string;
  //   setFormData((prevCurrentFormData) => ({
  //     ...prevCurrentFormData,
  //     photo_main: file ? newAvatar : defaultAvatar , 
  //     photo_small: file ? newAvatar  : defaultAvatar,
  //     // photo_main: file ? "https://i.pinimg.com/564x/30/4f/43/304f439199723f21270a440ffc0cb3a7.jpg" : defaultAvatar,
  //     // photo_small: file ? "https://i.pinimg.com/564x/30/4f/43/304f439199723f21270a440ffc0cb3a7.jpg" : defaultAvatar,
  //   }));
   
  //   console.log( newAvatar, "newAvatar")
  // };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file: File | undefined = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("photo_main", file);
    formData.append("photo_small", file);

    axios.post(`https://reg.achiever.skroy.ru/avatar-images/`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      const newAvatar = response.data.url;
      setFormData((prevCurrentFormData) => ({
        ...prevCurrentFormData,
        photo_main: newAvatar,
        photo_small: newAvatar,
      }));
    }).catch((error) => {
      console.error("Ошибка при загрузке изображения", error);
    });
  };


  const handleLogin = (event: React.ChangeEvent<HTMLInputElement>) => {
    const email = event.target.value;
    setFormData((prevCurrentFormData) => ({
      ...prevCurrentFormData,
      email: email,
      sex: "male",
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

  const handleStartWork = (date: Date | null, fieldName: string) => {
    setOtherState((prevFormData) => ({
      ...prevFormData,

      [fieldName]: date ? date.toISOString().split("T")[0] : "",
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

    setOtherState((prevFormData) => ({
      ...prevFormData,
      profession: inputValue,
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tags]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleTag(event.currentTarget.value.trim());
      setOtherState((prevFormData) => ({
        ...prevFormData,
        profession: inputValue,
      }));
    }
  };

  const handleWorkerPasswordAdd = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const workerPasswordAdd = event.target.value;
    setOtherState((prevCurrentFormData) => ({
      ...prevCurrentFormData,
      password_work: workerPasswordAdd,
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
            <div className={styles.workerStartdateAdd}>
              <h2 className={styles.description__title}>Дата начала работы</h2>
              <DatePicker
                className={styles.workersModalAddUser__input}
                placeholderText="Выберете дату"
                selected={parseDateForPicker(otherState.start_work)}
                onChange={(date) => handleStartWork(date, "start_work")}
                dateFormat="yyyy-MM-dd"
              />
            </div>

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
                value={formData ? formData.other_info?.password_work : ""}
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
                value={formData ? formData?.other_info?.proffesion : ""}
                onChange={handleWorkerPositionAdd}
                onKeyDown={handleKeyDown}
              />
          
              <WorkerModalTag
                setTags={setTags}
                tags={tags}
               
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
