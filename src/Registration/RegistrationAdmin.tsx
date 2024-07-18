import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./Registration.module.scss";

const RegistrationAdmin: React.FC = () => {
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
      login,
      password,
      first_name: firstName,
      last_name: lastName,
      phone,
      email,
      start_work_date: formattedDate,
      rank: 1, // Устанавливаем ранг для администратора
    };

    console.log("Данные, отправляемые на сервер:", requestData);

    try {
      const response = await fetch(
        "https://api.achiever.skroy.ru/registrations/?organization_id=642dc1e1-162d-4cb5-a3d1-7f4fcbcb5389",
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
        } else if (
          responseData.error &&
          typeof responseData.error === "object"
        ) {
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
    setLogin("");
    setPassword("");
    setFirstName("");
    setLastName("");
    setPhone("");
    setEmail("");
    setValidationErrors({});
<<<<<<< HEAD
=======
  };

  const handleReturnLogin = () => {
    navigate("/admin-panel/login");
>>>>>>> dev1
  };

  return (
    <div className={styles.registrationContainer}>
      <ToastContainer />
      <h1>Регистрация администратора</h1>
<<<<<<< HEAD
      <div>
=======
      {/*
      <div>
        <label>ID Организации:  642dc1e1-162d-4cb5-a3d1-7f4fcbcb5389</label>  
        <input
          type="text"
          placeholder="642dc1e1-162d-4cb5-a3d1-7f4fcbcb5389"
          value={organizationId}
          onChange={(e) => setOrganizationId(e.target.value)}
        />
      </div>
*/}
<div>
>>>>>>> dev1
        <label>Логин:</label>
        <input
          type="text"
          value={login}
          placeholder="Это ваш адрес корпоративной почты"
          onChange={(e) => setLogin(e.target.value)}
        />
        {validationErrors.login && (
          <span className={styles.errorMessage}>{validationErrors.login}</span>
        )}
      </div>
      <div className={styles.passwordContainer}>
<<<<<<< HEAD
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
=======
          <label>Пароль:</label>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Минимум 6 символов"
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
>>>>>>> dev1
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
<<<<<<< HEAD
      <div>
        <button onClick={handleRegistration}>Регистрация</button>
        <button onClick={handleReset}>Сброс</button>
=======
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
      <div className={styles.вuttonsGroup}>
        <div>
          <button className={styles.registrationButton} 
                  onClick={handleRegistration}>
            Регистрация
          </button>
          <button className={styles.resetButton}
                  onClick={handleReset}>
            Сброс
          </button>
        </div>
        <div className={styles.cancelButtonContainer}>
          <button className={styles.cancelButton}
                  onClick={handleReturnLogin} 
                   >
            Отмена
        </button>
        </div>
>>>>>>> dev1
      </div>
    </div>
  );
};

export default RegistrationAdmin;
