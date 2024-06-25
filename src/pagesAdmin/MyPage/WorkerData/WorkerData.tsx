/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./WorkerData.module.scss";
import { ChangeWorkerInformationButton } from "../buttons&inputes/ChangeWorkerInformationButton";
import defaultAvatar from "@/assets/defaultAvatar.png";
import { IUser } from "../../../types/IUser";
import { fetchUpdateLink, fetchUpdateUser } from "../../../api/apiService"; //api
//import { mockUserData, IUser } from "../../../../mocks/usersData"; //старая мок-заглушка
import { format, parse } from "date-fns";
import DatePicker from "react-datepicker";

interface WorkerDataProps {
  isEditing: boolean;
  showEmail: boolean; //отображение мейла
  toggleEdit: () => void;
  userData: IUser | null;
  avatarSize: "small" | "large";
  onPhotoUpdate: (newPhotoUrl: string) => void;
}

interface IOtherFromData {
  link_id: any;
  specialty: string;
  start_work_date: string;
}

export default function WorkerData({
  isEditing,
  toggleEdit,
  userData,
  showEmail,
  avatarSize,
  onPhotoUpdate,
}: WorkerDataProps) {
  const [formData, setFormData] = useState<IUser | null>({
    first_name: "",
    last_name: "",
    middle_name: "",
    phone: "",
    birth_date: "",
    login: "",
  }); //внутренний state данных юзера
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const linkId = localStorage.getItem("linkId");
  const [otherFormData, setOtherFormData] = useState<IOtherFromData>({
    link_id: linkId,
    specialty: "",
    start_work_date: "",
  });

  useEffect(() => {
    if (userData) {
      setFormData({ ...userData });
      setImageUrl(userData.photo_main || defaultAvatar);
      setOtherFormData((prevOtherFormData) => ({
        ...prevOtherFormData,
        specialty: userData.specialty || "",
        start_work_date: userData.start_work_date || "",
      }));
    }
  }, [userData]);



  //РУЧКИ ИЗМЕНЕНИЯ И ВАЛИДАЦИИ ИНПУТОВ:
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

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file: File | undefined = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImageUrl(reader.result as string);
      };
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (["first_name", "middle_name", "last_name", "email"].includes(name)) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    } else {
      setOtherFormData((prevOtherFormData) => ({
        ...prevOtherFormData,
        [name]: value,
      }));
    }
  };

  //PATCH:
  const handleSave = () => {
    console.log("Вызов функции handleSave");
    console.log("Сохранённые данные до отправки на сервер:", formData);
    toggleEdit();
    if (formData !== null && formData.profile_id) {
      const formDataToSend = new FormData();
      formDataToSend.append("profile_id", formData.profile_id);
      formDataToSend.append("first_name", formData.first_name ?? "");
      formDataToSend.append("last_name", formData.last_name ?? "");
      formDataToSend.append("middle_name", formData.middle_name ?? "");
      formDataToSend.append("birth_date", formData.birth_date ?? "");
      formDataToSend.append("phone", formData.phone ?? "");
      formDataToSend.append("email", formData.email ?? "");
      if (imageFile) {
        formDataToSend.append("photo_main", imageFile);
        formDataToSend.append("photo_small", imageFile);
      }

      fetchUpdateUser(formData.profile_id, formDataToSend)
        .then((response) => {
          console.log("Данные юзера успешно обновлены:", response.data);
          setImageUrl(response.data.photo_main || defaultAvatar);
          if (onPhotoUpdate) {
            onPhotoUpdate(response.data.photo_main || defaultAvatar);
          }
          
        })
        .catch((error) => {
          console.error("Ошибка при обновлении данных пользователя:", error);
        });

        const otherFormDataToSend = new FormData();
        const formattedStartDate = otherFormData.start_work_date
          ? format(
              parse(otherFormData.start_work_date, "yyyy-MM-dd", new Date()),
              "yyyy-MM-dd"
            )
          : "";

        otherFormDataToSend.append("start_work_date", formattedStartDate);
        otherFormDataToSend.append("specialty", otherFormData.specialty ?? "");
        fetchUpdateLink(otherFormData.link_id,  otherFormDataToSend)
          .then((linkResponse) => {
            console.log(
              "Link данные обновлены успешно:",
              linkResponse.data
            );
          })
          .catch((error) => {
            console.error("Ошибка обновление данных:", error);
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

  const handleDateChange = (date: Date | null, fieldName: string) => {
    setFormData((currentFormData) => ({
      ...currentFormData,
      [fieldName]: date ? date.toISOString().split("T")[0] : "",
    }));
  };

  const handleStartWork = (date: Date | null, fieldName: string) => {
    setOtherFormData((currentFormData) => ({
      ...currentFormData,
      [fieldName]: date ? date.toISOString().split("T")[0] : "",
    }));
  };

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
      <div className={styles.workerInitial}>
        <div className={`${styles.avatarWrapper} ${styles[avatarSize]}`}>
          <img
            className={`${styles.workerAvatar} ${styles[avatarSize]}`}
            src={imageUrl ? imageUrl : defaultAvatar}
            alt="Avatar"
          />
          {isEditing && (
            <>
              <label htmlFor="changeAvatar">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  id="changeAvatar"
                  style={{ display: "none" }}
                />
                <div className={styles.editIcon}>
                  <p>
                    Изменить <br /> изображение
                  </p>
                </div>
              </label>
            </>
          )}
        </div>
        <div>
          <div className={styles.workerName}>
            {`${formData.first_name} ${formData.last_name}` ||
              "Загружаем имя..."}
          </div>
          {showEmail && (
            <div className={styles.workerMail}>
              {formData.email || "Загружаем email..."}
            </div>
          )}
        </div>
      </div>
      <div className={styles.divider}></div>
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
            readOnly={!isEditing}
            onChange={handleInputChange}
          />
          <div className={styles.divider}></div>
        </div>
        <div className={styles.workerFullname}>
          <h2>Имя</h2>
          <input
            name="first_name"
            type="text"
            placeholder="Введите имя"
            value={formData.first_name || "" &&  formData.middle_name || "" && formData.last_name || ""}
            readOnly={!isEditing}
            onChange={handleInputChange}
          />
          <h2>Отчество</h2>
          <input
            name="middle_name"
            type="text"
            placeholder="Введите отчество"
            value={formData.middle_name || ""}
            readOnly={!isEditing}
            onChange={handleInputChange}
          />
          <h2>Фамилия</h2>
          <input
            name="last_name"
            type="text"
            placeholder="Введите фамилию"
            value={formData.last_name || ""}
            readOnly={!isEditing}
            onChange={handleInputChange}
          />
          <div className={styles.divider}></div>
        </div>
        <div className={styles.workerBirthday}>
          <h2>Дата рождения</h2>
          <DatePicker
            placeholderText="Выберите дату"
            selected={parseDateForPicker(formData.birth_date)}
            onChange={(date) => handleDateChange(date, "birth_date")}
            value={formData.birth_date || ""}
            dateFormat="yyyy-MM-dd"
            readOnly={!isEditing}
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
            onChange={handlePhoneChange}
            onKeyDown={handleKeyDown}
            disabled={!isEditing}
          />
          <div className={styles.divider}></div>
        </div>
        <div className={styles.workerStartdate}>
          <h2>Дата начала работы</h2>
          <DatePicker
            placeholderText="Выберете дату"
            selected={parseDateForPicker(otherFormData.start_work_date)}
            onChange={(date) => handleStartWork(date, "start_work_date")}
            dateFormat="yyyy-MM-dd"
            readOnly={!isEditing}
          />
    
          <div className={styles.divider}></div>
        </div>
        <div className={styles.workerPosition}>
          <h2>Роль</h2>
          <input
            name="specialty"
            type="text"
            placeholder="Введите Роль"
            value={otherFormData.specialty || ""}
            readOnly={!isEditing}
            onChange={handleInputChange}
          />
          <div className={styles.divider}></div>
        </div>
      </div>
    </div>
  );
}
