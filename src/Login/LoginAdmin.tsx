import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.scss";
import WelcomeAdminImg from "@/assets/Welcome-Admin-img.png";

const LoginAdmin: React.FC = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [apiError, setApiError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    console.log("handleLogin called");
    console.log("login:", login);
    console.log("password:", password);

    try {
      const response = await fetch("https://api.achiever.skroy.ru/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ login, password }),
      });

      console.log("response status:", response.status);

      if (!response.ok) {
        throw new Error(`Ошибка при входе ${response.statusText}`);
      }

      const data = await response.json();

      console.log("response data:", data);

      // Сохраняем токен авторизации в локальное хранилище
      localStorage.setItem("userData", JSON.stringify(data));
      localStorage.setItem("profileId", data.profile_id);
      localStorage.setItem("linkId", data.link_id);
      localStorage.setItem("rank", data.rank); // Сохраняем ранг
      console.log("Admin rank saved:", data.rank);

      console.log("Navigating to admin page");
      navigate("/admin-panel/my-page", {
        state: { profileId: data.profile_id },
      });
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Неизвестная ошибка";
      console.error("Login error:", errorMessage);
      setApiError(`${errorMessage}`);
    }
  };

  const handleReset = () => {
    setLogin("");
    setPassword("");
    setLoginError("");
    setPasswordError("");
    setApiError("");
  };

<<<<<<< HEAD
=======
  // Валидация email и пароля
  const validateEmail = (email: string) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };
 

>>>>>>> dev1
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogin(e.target.value);
  };

<<<<<<< HEAD
=======
  const handleEmailBlur = () => {
    if (!validateEmail(login)) {
      setLoginError("Адрес почты некорректен!");
    } else {
      setLoginError("");
    }
   };

>>>>>>> dev1
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

<<<<<<< HEAD
=======
  const handlePasswordBlur = () => {
    if (password.length < 6) {
     setPasswordError("Ваш пароль слишком короткий!");
    } else {
      setPasswordError("");
    }
  };


>>>>>>> dev1
  const handleRegister = () => {
    navigate("/admin-panel/registrations");
  };

  const isFormValid = login && password;

  return (
    <div className={styles.authorizationContainer}>
      <h1>Администратор,<br />добро пожаловать в Achiever!</h1>
      <img className={styles.welcomeImg} src={WelcomeAdminImg} alt="Welcome" />
      <div className={styles.welcomeLogin}>
        <label>Введите логин:</label>
        <input
          type="text"
          placeholder="Это ваш адрес корпоративной почты"
          value={login}
          onChange={handleEmailChange}
<<<<<<< HEAD
=======
          onBlur={handleEmailBlur}
>>>>>>> dev1
        />
        {loginError && (
          <span className={styles.errorMessage}>{loginError}</span>
        )}
      </div>
      <div className={styles.welcomePassword}>
        <label>Введите пароль:</label>
        <div className={styles.passwordContainer}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Минимум 6 символов"
            value={password}
            onChange={handlePasswordChange}
<<<<<<< HEAD
=======
            onBlur={handlePasswordBlur}
>>>>>>> dev1
          />
          <span
            className={styles.passwordToggle}
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>
        {passwordError && (
          <span className={styles.errorMessage}>{passwordError}</span>
        )}
      </div>
<<<<<<< HEAD
      <div>
        <button
=======
      {/*
      <div>
        <label>Ваша роль:</label>
        <div>
          <label className={styles.labelRole} htmlFor="admin">
            Администратор
          </label>
          <input
            type="radio"
            id="admin"
            name="role"
            value="admin"
            checked={role === "admin"}
            onChange={() => setRole("admin")}
          />
        </div>
        <div>
          <label className={styles.labelRole} htmlFor="worker">
            Работник
          </label>
          <input
            type="radio"
            id="worker"
            name="role"
            value="worker"
            checked={role === "worker"}
            onChange={() => setRole("worker")}
          />
        </div>
      </div>
      */}
      <div className={styles.welcomeButtons}>
        <button className={styles.enterButton}
>>>>>>> dev1
          onClick={handleLogin}
          disabled={!isFormValid}
        >
          Войти
        </button>
        <button className={styles.cancelButton} 
                onClick={handleReset}>
          Отмена
        </button>
        </div>
        <div className={styles.registrationButtonContainer}>
        <button className={styles.registrationButton} 
                onClick={handleRegister}>
          Регистрация
        </button>
        </div>
      
      {apiError && <span className={styles.errorMessage}>{apiError}</span>}
    </div>
  );
};

export default LoginAdmin;
