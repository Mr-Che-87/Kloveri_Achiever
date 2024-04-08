import { useState, useEffect } from "react";
import { format } from 'date-fns'; 
import styles from "./WorkerData.module.scss";
import { ChangeWorkerInformationButton } from "../buttons/ChangeWorkerInformationButton";
import { mockUserData, IUser } from "../../../../mocks/usersData";
interface WorkerDataProps {
  isEditing: boolean;
  toggleEdit: () => void;
}

export default function WorkerData({ isEditing, toggleEdit }: WorkerDataProps) {
  // Инициализируем formData начальными значениями из mockUserData
  const [formData, setFormData] = useState<IUser>(mockUserData);

  // Загрузка начальных данных при монтировании компонента
  useEffect(() => {
    setFormData(mockUserData);
  }, []);

  // Обновляем обработчик изменений
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Обратите внимание, что некоторые поля в вашей форме могут иметь разные имена в mock данных. Необходимо их синхронизировать.
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Функция для "сохранения" данных (в данном случае просто вывод в консоль)
  const handleSave = () => {
    // В реальном приложении здесь отправка данных на сервер
    console.log("Сохраненные данные:", formData);
    toggleEdit(); // Закрываем редактирование после сохранения
  };

  // При нажатии Enter "сохраняем" данные
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSave();
    }
  };
  
  const formattedBirthday: string = format(new Date(formData.birthday), 'dd.MM.yyyy');
  const formattedRegistrationday: string = format(new Date(formData.registration_day), 'dd.MM.yyyy');
 

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
            value={formData.email}
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
            value={formData.fullname}
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
            value={formattedBirthday}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
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
            onKeyDown={handleKeyDown}
            disabled={!isEditing}
          />
        </div>

        <div className={styles.workerStartdate}>
          <h2>Дата начала работы</h2>
          <input
            name="registration_day"
            placeholder="Введите Дату начала работы"
            value={formattedRegistrationday}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            disabled={!isEditing}
            pattern="\d{2}.\d{2}.\d{4}"
          />
        </div>

        <div className={styles.workerPosition}>
          <h2>Роль</h2>
          <input
            name="profession"
            type="text"
            placeholder="Введите Роль"
            value={formData.profession}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
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
