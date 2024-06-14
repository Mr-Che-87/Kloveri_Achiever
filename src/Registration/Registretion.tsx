import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./Registration.module.scss";

const Registration: React.FC = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [roleType, setRoleType] = useState<"employee" | "director">("employee");
  const [organizationId, setOrganizationId] = useState(
    "642dc1e1-162d-4cb5-a3d1-7f4fcbcb5389"
  );
  const [specialty, setSpecialty] = useState("");
  const [startWorkDate, setStartWorkDate] = useState("");
  const [apiError, setApiError] = useState("");

  const navigate = useNavigate();

  const handleRegistration = async () => {
    console.log("Начало регистрации");

    const requestData = {
      login,
      password,
      first_name: firstName,
      last_name: lastName,
      phone,
      email,
      role_type: roleType,
      organization_id: organizationId,
      specialty: specialty || "Не указано",
      start_work_date: startWorkDate || "2024-01-01", // Пример значения по умолчанию
    };

    console.log("Данные, отправляемые на сервер:", requestData);

    try {
      const response = await fetch(
        "https://reg.achiever.skroy.ru/registrations/",
        {
          method: "POST",
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
            "X-CSRFTOKEN":
              "HI3PHmVuGIv728VhA83CgUsqNCyVW3X2MypJbE2X9kqJ5CWqLa15dVtnNWUnNOr1",
          },
          body: JSON.stringify(requestData),
        }
      );

      const responseData = await response.json();
      console.log("Ответ сервера:", responseData);

      if (!response.ok) {
        if (responseData.error && typeof responseData.error === "object") {
          const validationErrors = Object.keys(responseData.error)
            .map((key) => `${key}: ${responseData.error[key].join(", ")}`)
            .join("; ");
          throw new Error(validationErrors);
        } else {
          throw new Error("Неизвестная ошибка");
        }
      }

      toast.success(
        "Регистрация успешна! Перенаправление на страницу входа..."
      );
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Неизвестная ошибка";
      console.error("Ошибка регистрации:", errorMessage);
      if (
        errorMessage.includes("специальность") ||
        errorMessage.includes("start_work_date")
      ) {
        setApiError(errorMessage);
        toast.error(`Ошибка валидации: ${errorMessage}`);
      } else {
        toast.success("Профиль создан, перенаправление на страницу входа...");
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      }
    }
  };

  const handleReset = () => {
    setLogin("");
    setPassword("");
    setFirstName("");
    setLastName("");
    setPhone("");
    setEmail("");
    setRoleType("employee");
    setOrganizationId("642dc1e1-162d-4cb5-a3d1-7f4fcbcb5389");
    setSpecialty("");
    setStartWorkDate("");
    setApiError("");
  };

  return (
    <div className={styles.registrationContainer}>
      <ToastContainer />
      <h1>Регистрация</h1>
      <div>
        <label>Логин:</label>
        <input
          type="text"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />
      </div>
      <div>
        <label>Пароль:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <label>Имя:</label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div>
        <label>Фамилия:</label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div>
        <label>Телефон:</label>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label>Тип роли:</label>
        <select
          value={roleType}
          onChange={(e) =>
            setRoleType(e.target.value as "employee" | "director")
          }
        >
          <option value="employee">Работник</option>
          <option value="director">Директор</option>
        </select>
      </div>
      <div>
        <label>ID организации:</label>
        <input
          type="text"
          value={organizationId}
          onChange={(e) => setOrganizationId(e.target.value)}
        />
      </div>
      <div>
        <label>Специальность:</label>
        <input
          type="text"
          value={specialty}
          onChange={(e) => setSpecialty(e.target.value)}
        />
      </div>
      <div>
        <label>Дата начала работы:</label>
        <input
          type="text"
          value={startWorkDate}
          onChange={(e) => setStartWorkDate(e.target.value)}
        />
      </div>
      <div>
        <button onClick={handleRegistration}>Регистрация</button>
        <button onClick={handleReset}>Сброс</button>
      </div>
      {apiError && <span className={styles.errorMessage}>{apiError}</span>}
    </div>
  );
};

export default Registration;
