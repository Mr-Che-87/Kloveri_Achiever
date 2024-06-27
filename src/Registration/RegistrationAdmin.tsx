import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./Registration.module.scss";

const RegistrationAdmin: React.FC = () => {
//const [roleType, setRoleType] = useState<"employee" | "director">("employee");
  const [organizationId, setOrganizationId] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const currentDate = new Date(Date.now());
  const formattedDate = currentDate.toISOString().split("T")[0];
    const [validationErrors, setValidationErrors] = useState<{
    [key: string]: string;
  }>({});


  const navigate = useNavigate();

  const validateFields = () => {
    const errors: { [key: string]: string } = {};

    if (!login) errors.login = "Логин обязателен.";
    if (password.length < 6)
      errors.password = "Пароль должен содержать минимум 6 символов.";
    if (!firstName) errors.firstName = "Имя обязательно.";
    if (!lastName) errors.lastName = "Фамилия обязательна.";
    const phonePattern = /^[\d+()\- ]+$/;
    if (!phone || !phonePattern.test(phone))
      errors.phone = "Некорректный номер телефона.";
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailPattern.test(email))
      errors.email = "Некорректный email.";
    

    setValidationErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleRegistration = async () => {
    if (!validateFields()) {
      return;
    }

    console.log("Начало регистрации");
    
    const requestData = {
      //role_type: roleType,
      organization_id: organizationId,    //"642dc1e1-162d-4cb5-a3d1-7f4fcbcb5389",
      login,
      password,
      first_name: firstName,
      last_name: lastName,
      phone,
      email,
      start_work_date: formattedDate,
    };

    console.log("Данные, отправляемые на сервер:", requestData);

    try {
      const response = await fetch(
        "https://reg.achiever.skroy.ru/registrations/",   //на будущее(веса): - https://reg.achiever.skroy.ru/registrations/?link_weigth=1&organization_id={organizationId}
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
        if (responseData.error && typeof responseData.error === "string") {
          throw new Error(responseData.error);
        } else if (responseData.error && typeof responseData.error === "object") {
          const errorObject: { [key: string]: string[] } = responseData.error;
          const validationErrors = Object.entries(errorObject)
           .map(([key, values]) => `${key}: ${values.join(", ")}`)
           .join("; ");
          throw new Error(validationErrors);
        } else if (responseData.detail) {
          throw new Error(responseData.detail);
        } else {
          throw new Error(
            "Неизвестная ошибка: " + JSON.stringify(responseData)
          );
        }
      } 
      localStorage.setItem("organization_id", responseData.organization_id);

      // Профиль создан, независимо от возможных ошибок
      toast.success(
        "Регистрация успешна! Перенаправление на страницу входа..."
      );
      setTimeout(() => {
        navigate("/admin-panel/login");
      }, 3000);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Неизвестная ошибка";
      console.error("Ошибка регистрации:", errorMessage);

      if (
        errorMessage.includes("login") ||
        errorMessage.includes("password") ||
        errorMessage.includes("first_name") ||
        errorMessage.includes("last_name") ||
        errorMessage.includes("phone") ||
        errorMessage.includes("email")
      ) {
        toast.error(`Ошибка регистрации: ${errorMessage}`);
      } else {
        toast.success(
          "Регистрация успешна! Перенаправление на страницу входа..."
        );
        setTimeout(() => {
          navigate("/admin-panel/login");
        }, 3000);
      }
    }
  };

  const handleReset = () => {
    //setRoleType("employee");
    setOrganizationId("642dc1e1-162d-4cb5-a3d1-7f4fcbcb5389");
    setLogin("");
    setPassword("");
    setFirstName("");
    setLastName("");
    setPhone("");
    setEmail("");
    setValidationErrors({});
    
  };

  return (
    <div className={styles.registrationContainer}>
      <ToastContainer />
      <h1>Регистрация администратора</h1>
      <div>
        <label>ID Организации:  642dc1e1-162d-4cb5-a3d1-7f4fcbcb5389</label>  
        <input
          type="text"
          placeholder="642dc1e1-162d-4cb5-a3d1-7f4fcbcb5389"
          value={organizationId}
          onChange={(e) => setOrganizationId(e.target.value)}
        />
      </div>
      <div>
        <label>Логин:</label>
        <input
          type="text"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />
        {validationErrors.login && (
          <span className={styles.errorMessage}>{validationErrors.login}</span>
        )}
      </div>
      <div className={styles.passwordContainer}>
        <label>Пароль:</label>
        <input
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <span
            className={styles.passwordToggle}
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? "🙈" : "👁️"}
          </span>
        {validationErrors.password && (
          <span className={styles.errorMessage}>
            {validationErrors.password}
          </span>
        )}
      </div>
      <div>
        <label>Имя:</label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        {validationErrors.firstName && (
          <span className={styles.errorMessage}>
            {validationErrors.firstName}
          </span>
        )}
      </div>
      <div>
        <label>Фамилия:</label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        {validationErrors.lastName && (
          <span className={styles.errorMessage}>
            {validationErrors.lastName}
          </span>
        )}
      </div>
      <div>
        <label>Телефон:</label>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        {validationErrors.phone && (
          <span className={styles.errorMessage}>{validationErrors.phone}</span>
        )}
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {validationErrors.email && (
          <span className={styles.errorMessage}>{validationErrors.email}</span>
        )}
      </div>
      {/*
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
      */}
      <div>
        <button onClick={handleRegistration}>Регистрация</button>
        <button onClick={handleReset}>Сброс</button>
      </div>
    </div>
  );
};

export default RegistrationAdmin;
