import { useState, useEffect } from "react";
import { IUser } from "../../../../types/IUser";
//непонятки  с датой  //import { format } from 'date-fns';
import styles from "./WorkerData.module.scss";
import { ChangeWorkerInformationButton } from "../buttons&inputes/ChangeWorkerInformationButton";
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
  const [formData, setFormData] = useState<IUser | null>(null);

  useEffect(() => {
    if (userData) {
      setFormData(userData);
    }
  }, [userData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (formData) {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSave = () => {
    console.log("Сохраненные данные:", formData);
    toggleEdit();
    //как будет сервак:  POST-запрос user  -  2) изменяет данные существующего юзера 
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSave();
    }
  };

  if (!formData) {
    return <div>Loading...</div>; // Или другой индикатор загрузки
  }

  //непонятки с датой:
  //const formattedBirthday: string = format(new Date(formData.birthday), 'dd.MM.yyyy');
  //const formattedRegistrationday: string = format(new Date(formData.registration_day), 'dd.MM.yyyy');

  return (
    <div className={styles.workerData}>
      <div className={styles.workerDataTitle}>
        <h1>Информация</h1>
        <ChangeWorkerInformationButton
          isEditing={isEditing}
          toggleEdit={toggleEdit}
        />
      </div>
      <div className={styles.workerInformation}>
        {/* Для каждого инпута используем значение из состояния и обработчик изменений */}
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
        </div>

        <div className={styles.workerFullname}>
          <h2>Имя</h2>
          <input
            name="fullname"
            type="text"
            placeholder="Введите ФИО"
            value={formData.fullname || ""}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            disabled={!isEditing}
          />
        </div>

        <div className={styles.workerBirthday}>
          <h2>Дата рождения</h2>
          <input
            name="birthday"
            type="text"
            placeholder="Введите Дату рождения"
            value={formData.birthday || ""} //непонятки с датой //value={formattedBirthday}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            disabled={!isEditing}
            //непонятки с датой //pattern="\d{2}.\d{2}.\d{4}"
          />
        </div>

        <div className={styles.workerNumber}>
          <h2> Табельный номер</h2>
          <input
            name="number"
            type="text"
            placeholder="Введите Табельный номер"
            value={formData.number || ""}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            disabled={!isEditing}
          />
        </div>

        <div className={styles.workerStartdate}>
          <h2>Дата начала работы</h2>
          <input
            name="registration_day"
            type="text"
            placeholder="Введите Дату начала работы"
            value={formData.registration_day || ""} //непонятки с датой //value={formattedRegistrationday}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            disabled={!isEditing}
            //непонятки с датой  //pattern="\d{2}.\d{2}.\d{4}"
          />
        </div>

        <div className={styles.workerPosition}>
          <h2>Роль</h2>
          <input
            name="proffesion"
            type="text"
            placeholder="Введите Роль"
            value={formData.proffesion || ""}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            disabled={!isEditing}
            required
          />
        </div>
      </div>
    </div>
  );
}
