import { useState } from "react";
import styles from "./WorkerData.module.scss";
import { ChangeWorkerInformationButton } from "../buttons/ChangeWorkerInformationButton";

interface WorkerDataProps {
  isEditing: boolean;
  toggleEdit: () => void; // Добавленный пропс для функции переключения
}

export default function WorkerData({ isEditing, toggleEdit }: WorkerDataProps) {
  const [formData, setFormData] = useState({
    login: "",
    fullName: "",
    birthday: "",
    number: "",
    startDate: "",
    position: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
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
            name="login"
            type="email"
            placeholder="Введите Логин"
            value={formData.login}
            onChange={handleChange}
            disabled={!isEditing} // инпут активен только в режиме редактирования
            required
          />
        </div>

        <div className={styles.workerFullname}>
          <h2>Имя</h2>
          <input
            name="name"
            placeholder="Введите ФИО"
            value={formData.fullName}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>

        <div className={styles.workerBirthday}>
          <h2>Дата рождения</h2>
          <input
            name="birthday"
            type="text"
            placeholder="Введите Дату рождения"
            value={formData.birthday}
            onChange={handleChange}
            disabled={!isEditing}
            pattern="\d{2}.\d{2}.\d{4}"
          />
        </div>

        <div className={styles.workerNumber}>
          <h2>Табельный номер</h2>
          <input
            name="number"
            type="text"
            placeholder="Введите Табельный номер"
            value={formData.number}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>

        <div className={styles.workerStartdate}>
          <h2>Дата начала работы</h2>
          <input
            name="startDate"
            placeholder="Введите Дату начала работы"
            value={formData.number}
            onChange={handleChange}
            disabled={!isEditing}
            pattern="\d{2}.\d{2}.\d{4}"
          />
        </div>

        <div className={styles.workerPosition}>
          <h2>Роль</h2>
          <input
            name="position"
            type="text"
            placeholder="Введите Роль"
            value={formData.number}
            onChange={handleChange}
            disabled={!isEditing}
            required
          />
        </div>
      </div>
      <div className={styles.teams}>
        <h1>Команды</h1>
      </div>
    </div>
  );
}
