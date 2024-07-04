import { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./WorkerData.module.scss";
import { ChangeWorkerInformationButton } from "../buttons&inputes/ChangeWorkerInformationButton";

import { IUser } from "../../../types/IUser";
<<<<<<< HEAD
import { fetchUpdateUser } from "../../../api/apiService";  //api
//import { mockUserData, IUser } from "../../../../mocks/usersData"; //старая мок-заглушка


interface WorkerDataProps {
  isEditing: boolean;
  toggleEdit: () => void;
  userData: IUser | null;
=======
import { fetchUpdateLink, fetchUpdateUser, fetchGetLink } from "../../../api/apiService";
import { format, parse } from "date-fns";
import DatePicker from "react-datepicker";
import { ILinkData } from "../../../types/ILinkData";

interface WorkerDataProps {
  isEditing: boolean;
  showEmail: boolean;
  toggleEdit: () => void;
  userData: IUser | null;
  avatarSize: "small" | "large";
  onPhotoUpdate: (newPhotoUrl: string) => void;
  linkData: ILinkData | null;
}

interface IOtherFormData {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  link_id: any;
  specialty: string;
  start_work_date: string;
>>>>>>> dev3
}

export default function WorkerData({
  isEditing,
  toggleEdit,
  userData,
<<<<<<< HEAD
}: WorkerDataProps) {
  
  const [formData, setFormData] = useState<IUser | null>(null);    //внутренний state данных юзера

  useEffect(() => {
    if (userData) {
      setFormData({ ...userData });
    }
  }, [userData]);

  
  //РУЧКИ ИЗМЕНЕНИЯ И ВАЛИДАЦИИ ИНПУТОВ:
    const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const sanitizedValue = inputValue.replace(/[^\d8]/g, ''); // Оставляем только "8"
=======
  showEmail,
  avatarSize,
  onPhotoUpdate,
  linkData,
}: WorkerDataProps) {
  const [formData, setFormData] = useState<IUser | null>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const linkId = localStorage.getItem("linkId");
  const organizationId = localStorage.getItem("organizationId");
  const [otherFormData, setOtherFormData] = useState<IOtherFormData>({
    link_id: linkId,
    specialty: "",
    start_work_date: "",
  });

  useEffect(() => {
    if (userData) {
      setFormData(userData);
      setImageUrl(userData.photo_main || defaultAvatar);
    }
  }, [userData]);




  
  useEffect(() => {
    if (linkId && organizationId) {
      const storedSpecialty = localStorage.getItem("specialty");
      const storedStartWorkDate = localStorage.getItem("start_work_date");
  
      if (storedSpecialty && storedStartWorkDate) {
        setOtherFormData({
          link_id: linkId,
          specialty: storedSpecialty,
          start_work_date: storedStartWorkDate,
        });
      } else {
        fetchGetLink(linkId, organizationId)
          .then((response) => {
            const data = response.data;
            setOtherFormData({
              link_id: data.link_id,
              specialty: data.specialty,
              start_work_date: data.start_work_date,
            });
  
            // Сохраняем полученные данные в localStorage
            localStorage.setItem("specialty", data.specialty);
            localStorage.setItem("start_work_date", data.start_work_date);
          })
          .catch((error) => {
            console.error("Ошибка при получении данных link:", error);
          });
      }
    }
  }, [linkId, organizationId]);

  useEffect(() => {
    if (linkData) {
      setOtherFormData({
        link_id: linkData.link_id,
        specialty: linkData.specialty,
        start_work_date: linkData.start_work_date,
      });
      localStorage.setItem("specialty", linkData.specialty);
      localStorage.setItem("start_work_date", linkData.start_work_date);
    }
  }, [linkData]);

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const sanitizedValue = inputValue.replace(/[^\d8]/g, "");
>>>>>>> dev3
    if (/^(\8)?\d{0,10}$/.test(sanitizedValue)) {
      setFormData((prevFormData) => ({
        ...prevFormData!,
        phone: sanitizedValue,
      }));
    }
  };

<<<<<<< HEAD
=======
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
    if (["first_name", "middle_name", "last_name"].includes(name)) {
      setFormData((prevFormData) => ({
        ...prevFormData!,
        [name]: value,
      }));
    } else {
     
      setOtherFormData((prevOtherFormData) => ({
        
        ...prevOtherFormData,
        [name]: value,
      }));
      
      localStorage.setItem(name, value); // Здесь сохраняется в localStorage
    }
  };
>>>>>>> dev3

  const handleSave = () => {
    toggleEdit();
    if (formData !== null && formData.profile_id) { 
      fetchUpdateUser(formData.profile_id, formData)
        .then((response) => {
<<<<<<< HEAD
          console.log("Данные юзера успешно обновлены:", response.data);
=======
          setFormData(response.data);
          setImageUrl(response.data.photo_main || defaultAvatar);
          if (onPhotoUpdate) {
            onPhotoUpdate(response.data.photo_main || defaultAvatar);
          }
>>>>>>> dev3
        })
        .catch((error) => {
          console.error("Ошибка при обновлении данных пользователя:", error);
        });
<<<<<<< HEAD
    }
  };
  //сохранение через Enter:
=======

      const otherFormDataToSend = new FormData();
      const formattedStartDate = otherFormData.start_work_date
        ? format(
            parse(otherFormData.start_work_date, "yyyy-MM-dd", new Date()),
            "yyyy-MM-dd"
          )
        : "";

      otherFormDataToSend.append("start_work_date", formattedStartDate);
      otherFormDataToSend.append("specialty", otherFormData.specialty ?? "");

      fetchUpdateLink(otherFormData.link_id, otherFormDataToSend)
        .then((linkResponse) => {
          console.log("Link данные обновлены успешно:", linkResponse.data);
        })
        .catch((error) => {
          console.error("Ошибка обновление данных:", error);
        });
    }
  };

>>>>>>> dev3
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && isEditing) {
      event.preventDefault();
      handleSave();
    }
  };
<<<<<<< HEAD

// const handleProffesionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//   const  

// }

=======
  
  const handleDateChange = (date: Date | null, fieldName: string) => {
    if (!date) {
      setFormData((currentFormData) => ({
        ...currentFormData!,
        [fieldName]: "",
      }));
    } else {
      setFormData((currentFormData) => ({
        ...currentFormData!,
        [fieldName]: date.toISOString().split("T")[0],
      }));
    }
  };

  const handleStartWork = (date: Date | null, fieldName: string) => {
    if (!date) {
      setOtherFormData((currentFormData) => ({
        ...currentFormData,
        [fieldName]: "",
      }));
      localStorage.setItem(fieldName, "");
    } else {
      setOtherFormData((currentFormData) => ({
        ...currentFormData,
        [fieldName]: date.toISOString().split("T")[0],
      }));
      localStorage.setItem(fieldName, date.toISOString().split("T")[0]);
    }
  };
  const parseDateForPicker = (dateStr?: string): Date | null => {
    if (!dateStr) {
      return null;
    }
    const date = new Date(dateStr);
    return date instanceof Date && !isNaN(date.getTime()) ? date : null;
  };
>>>>>>> dev3

  if (!formData) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className={styles.workerData}>
<<<<<<< HEAD
=======
      <div className={styles.workerInitial}>
        <div className={`${styles.avatarWrapper} ${styles[avatarSize]}`}>
          <img
            className={`${styles.workerAvatar} ${styles[avatarSize]}`}
            src={imageUrl? imageUrl : defaultAvatar}
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

>>>>>>> dev3
      <div className={styles.workerDataTitle}>
        <h1>Личные данные</h1>
        <ChangeWorkerInformationButton
<<<<<<< HEAD
          isEditing={isEditing}
          toggleEdit={toggleEdit} 
          handleSave={handleSave}   
=======
        isEditing={isEditing}
          toggleEdit={toggleEdit}
          handleSave={handleSave}
>>>>>>> dev3
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
            required
          />
<<<<<<< HEAD
          <div className={styles.divider}></div>
        </div>

        <div className={styles.workerFullname}>
          <h2>Имя</h2>
          <input
            name="full-name"
            type="text"
            placeholder="Введите ФИО"
            value={`${formData.first_name || ""} ${formData.middle_name || ""} ${formData.last_name || ""}`}
            readOnly
          />
          <div className={styles.divider}></div>
        </div>

        <div className={styles.workerBirthday}>
          <h2>Дата рождения</h2>
                 
          <input
            name="birth_date"
            type="text"
            value={  formData.birth_date || ""}
            readOnly
          />
          <div className={styles.divider}></div>
=======
  
>>>>>>> dev3
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
        </div>
<<<<<<< HEAD
        
=======

        <div className={styles.workerFirstName}>
          <h2>Имя</h2>
          <input
            name="first_name"
            type="text"
            placeholder="Введите имя"
            value={formData.first_name || ""}
            readOnly={!isEditing}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.workerMiddleName}>
            <h2>Отчество</h2>
          <input
            name="middle_name"
            type="text"
            placeholder="Введите отчество"
            value={formData.middle_name || ""}
            readOnly={!isEditing}
            onChange={handleInputChange}
          />
          </div>
            <div className={styles.workerLastName}>
            <h2>Фамилия</h2>
          <input
            name="last_name"
            type="text"
            placeholder="Введите фамилию"
            value={formData.last_name || ""}
            readOnly={!isEditing}
            onChange={handleInputChange}
          />
          </div>

          <div className={styles.workerPosition}>
          <h2>Роль</h2>
          <input
            name="specialty"
            type="text"
            placeholder="Введите Роль"
            value={otherFormData.specialty}
            readOnly={!isEditing}
            onChange={handleInputChange}
          />
        </div>

        <div className={styles.workerBirthday}>
          <h2>Дата рождения</h2>
          <DatePicker
            placeholderText="Выберите дату"
            selected={parseDateForPicker(formData.birth_date)}
            onChange={(date) => handleDateChange(date, "birth_date")}
            dateFormat="yyyy-MM-dd"
            readOnly={!isEditing}
          />
        </div>
    

>>>>>>> dev3
        <div className={styles.workerStartdate}>
          <h2>Дата начала работы</h2>
          <input
            name="start_work"
            type="text"
            value={  formData?.start_work_date || ""}
            readOnly
          />
<<<<<<< HEAD
          
          <div className={styles.divider}></div>
        </div>

        <div className={styles.workerPosition}>
          <h2>Роль</h2>
          <input
            name="specialty"
            type="text"
            placeholder="Введите Роль"
            value={formData?.specialty || ""}
            readOnly
            required
          />
          <div className={styles.divider}></div>
        </div>
=======
        </div>

    

>>>>>>> dev3
      </div>
    </div>
  );
}

