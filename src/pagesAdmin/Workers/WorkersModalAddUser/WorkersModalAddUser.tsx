/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from "react";
import { IUser } from "../../../types/IUser";
import iconPlus from "../../../assets/bigAdd.svg"
import WorkerModalTag from "./WorkerModalTag/WorkerModalTag";
import DatePicker from "react-datepicker";
import styles from "./WorkersModalAddUser.module.scss";
import axios from "axios";


interface WorkerModalAddUserProps {
  user?: IUser;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClose: () => void;
  onAddContact: (user: IUser) => void;
  userData?: IUser | null;
}

function WorkersModalAddUser({
  onClose,
  onAddContact,
  userData,
}: WorkerModalAddUserProps) {
  const organizationId = localStorage.getItem("organization_id") || "";
  console.log(organizationId, "organizationId")
  const [formData, setFormData] = useState<IUser>({
    organization_id: organizationId,
    login: "",
    first_name: "",
    last_name: "",
    middle_name: "",
    birth_date: "",
    phone: "",
    email: "",
    photo_main: "",
    photo_small: "",
    specialty: "",
    start_work_date: "",
    password: ""
  } as IUser);
  // const [avatar, setAvatar] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});
  const [showPassword, setShowPassword] = useState(false);



  useEffect(() => {
    if (userData) {
      setFormData(userData);
    }
  }, [userData]);

  const validateForm = () => {
    const errors: {[key: string] : string} ={}

    if(!formData.login) errors.login = "Логин обязательно";
    if(!formData.email) errors.email = "Email обязательно";
    if(!formData.first_name) errors.first_name = "Имя обязательно";
    if(!formData.last_name) errors.last_name = "Фамилия обязательно";
    if(!formData.password) errors.password = "Пароль обязательно";
    if(!formData.birth_date) errors.birth_date = "Дата рождения обязательно";
    if(!formData.start_work_date) errors.start_work_date = "Дата начала работы обязательно";
    if(!formData.specialty) errors.specialty = "Роль обязательно";
    if(!formData.phone) errors.phone = "Номер телефона обязательно";

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  }



  const handleAddContact = () => {


    const userDataString = localStorage.getItem("userData");
    let organizationId = "";
    if(userDataString){
      try{
        const userData = JSON.parse(userDataString);

        organizationId = userData.organization_id
      } catch(error){
        console.error("Ошибка при парсинге данных userData из localStorage:", error);
      }
    }else {
      console.error("Данные userData не найдены в localStorage");
    }

    if(!validateForm()){
      console.log("Validation failed");
      return
    }

    const jsonData = {
      organization_id: organizationId,
      first_name: formData.first_name ,
      last_name: formData.last_name ,
      middle_name: formData.middle_name ?? "",
      phone: formData.phone ?? "",
      email: formData.email ?? "",
      photo_main: formData.photo_main ?? "",
      photo_small: formData.photo_small ?? "",
      login: formData.login ?? "",
      specialty: formData.specialty ?? "",
      password: formData.password ?? "",
      start_work_date: formData.start_work_date ?? "",
      birth_date: formData.birth_date ?? "",
    };

    console.log("jsonData", jsonData)
    const options = {
      params: {
        organization_id: organizationId,
      },
    };

    axios.post("https://api.achiever.skroy.ru/registrations/",jsonData, options)

      .then((response) => {
        const newContact = {
          ...response.data,
          first_name:formData.first_name,
          last_name:formData.last_name,
        }
        console.log("Пользователь создан успешно:", newContact);
        onAddContact(newContact);
        onClose();

     
      })
      .catch((error) => {
        console.log("Ошибка при создании пользователя:", error.response.data);
      });
      
  };

  const handleUltils = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      specialty: tags.join(),
    }));

    console.log(tags.join(), "tagsJOIN");
  };

  // const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file: File | undefined = event.target.files?.[0];
  //   console.log(file, "file");
  //   if (file) {
  //     const url = URL.createObjectURL(file);
  //     setAvatar(url);

  //     setFormData((prevFormData) => ({
  //       ...prevFormData,
  //       photo_main: file,
  //       photo_small: file,
  //     }));
  //   }
  // };

  const handleLogin = (event: React.ChangeEvent<HTMLInputElement>) => {
    const login = event.target.value;
    const email = event.target.value;
    setFormData((prevCurrentFormData) => ({
      ...prevCurrentFormData,
      login: login,
      email: email,
    }));
  };

  // const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const email = event.target.value;
  //   setFormData((prevCurrentFormData) => ({
  //     ...prevCurrentFormData,
  //     email: email,
  //   }));
  // }

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
    setFormData((prevInfo) => ({
      ...prevInfo,
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

  const handleCloseModal = useCallback(() => {
    onClose()
  }, [onClose])

  useEffect(() => {
    document.addEventListener("keydown", (event) => {
      if(event.key === "Escape"){
        onClose();
      }
    });
    return() => {
      document.removeEventListener("keydown", (event) => {
        if(event.key === "Escape") {
          handleCloseModal()
        }
      })
    }
  })


  return (
    <div className={styles.workerModalAddUser}>
      <div className={styles.WorkersModalAddUserContent}>
      <button onClick={onClose} className={styles.closeButton}>
          &times;
          </button>
        <div className={styles.title}>
          <img src={iconPlus} alt="" />
          <p>Добавить сотрудника</p>
        </div>

        <div className={styles.header}>
          {/* <div className={styles.avatarUser}>
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
          </div> */}
          <div className={styles.workerLoginAdd}>
            <h2 className={styles.description__title}>Логин</h2>
          
            <input
              name="login"
              type="login"
              placeholder="login@company.ru"
              value={formData ? formData.login  : ""}
              onChange={handleLogin}
            />
            {validationErrors.login && (
              <span className={styles.errorMessages}>{validationErrors.login}</span>
            )}
          </div>
          {/* <div className={styles.workerEmailAdd}>
            <h2 className={styles.description__title}>Емайл</h2>
            <input
              name="email"
              type="email"
              placeholder="Введите Email"
              value={formData ? formData.email  : ""}
              onChange={handleLogin}
            />
              {validationErrors.email && (
              <span className={styles.errorMessages}>{validationErrors.email}</span>
            )}
          </div> */}
        </div>

        {/* <div className={styles.checkbox__link}>
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
        </div> */}
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
                {validationErrors.first_name && (
              <span className={styles.errorMessages}>{validationErrors.first_name}</span>
            )}
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
                {validationErrors.last_name && (
              <span className={styles.errorMessages}>{validationErrors.last_name}</span>
            )}
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
                {validationErrors.birth_date && (
              <span className={styles.errorMessages}>{validationErrors.birth_date}</span>
            )}
            </div>
          </div>
          <div className={styles.formFilling__rightContent}>
            <div className={styles.workerStartdateAdd}>
              <h2 className={styles.description__title}>Дата начала работы</h2>
              <DatePicker
                className={styles.workersModalAddUser__input}
                placeholderText="Выберете дату"
                selected={parseDateForPicker(formData.start_work_date)}
                onChange={(date) => handleStartWork(date, "start_work_date")}
                dateFormat="yyyy-MM-dd"
              />
                {validationErrors.start_work_date && (
              <span className={styles.errorMessages}>{validationErrors.start_work_date}</span>
            )}
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
                {validationErrors.phone && (
              <span className={styles.errorMessages}>{validationErrors.phone}</span>
            )}
            </div>

            <div className={styles.workerPassword}>
              <h2 className={styles.description__title}>Пароль</h2>

              <input
                className={styles.workersModalAddUser__input}
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="*****"
                value={formData ? formData?.password : ""}
                onChange={handleWorkerPasswordAdd}
              />
                    <span
            className={styles.passwordToggle}
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? "🙈" : "👁️"}
          </span>
                {validationErrors.password && (
              <span className={styles.errorMessages}>{validationErrors.password}</span>
            )}
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
                {validationErrors.specialty && (
              <span className={styles.errorMessages}>{validationErrors.specialty}</span>
            )}
              <WorkerModalTag setTags={setTags} tags={tags} removeTag={[]} />
            </div>
          </div>
        </div>

        <div className={styles.btnGroups}>
          <button className={styles.btn__close} onClick={handleCloseModal}>
            Отменить
          </button>
          <button
            className={styles.btn__add}
            onClick={() => {
              handleUltils();
              handleAddContact();
            }}
          >
           Сохранить
          </button>
        </div>
      </div>
    </div>
  );
}
export default WorkersModalAddUser;
