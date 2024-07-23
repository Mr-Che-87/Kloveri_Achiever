import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.scss";
import WelcomeImg from "@/assets/Welcome-img.png";

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
        throw new Error(`Ошибка при входе: ${response.statusText}`);
      }

      const data = await response.json();

      console.log("response data:", data);

      // Сохраняем данные пользователя в локальное хранилище
      localStorage.setItem("userData", JSON.stringify(data));
      localStorage.setItem("profileId", data.profile_id);
      localStorage.setItem("link_weight", data.link_weight.toString());

      console.log("Navigating to appropriate page");
      if (data.link_weight >= 1) {
        navigate("/admin-panel", { state: { profileId: data.profile_id } });
      } else {
        navigate("/my-page", { state: { profileId: data.profile_id } });
      }
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Неизвестная ошибка";
      console.error("Login error:", errorMessage);
      setApiError(`Ошибка при входе: ${errorMessage}`);
    }
  };

  const handleReset = () => {
    setLogin("");
    setPassword("");
    setLoginError("");
    setPasswordError("");
    setApiError("");
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogin(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleRegister = () => {
    navigate("/admin-panel/registrations");
  };

  const isFormValid = login && password;

  return (
    <div className={styles.authorizationContainer}>
      <h1>Администратор, добро пожаловать в Ачивер!</h1>
      <img className={styles.welcomeImg} src={WelcomeImg} alt="Welcome" />
      <div>
        <label>Введите логин:</label>
        <input
          type="text"
          placeholder="Это ваш адрес корпоративной почты"
          value={login}
          onChange={handleEmailChange}
        />
        {loginError && (
          <span className={styles.errorMessage}>{loginError}</span>
        )}
      </div>
      <div>
        <label>Введите пароль:</label>
        <div className={styles.passwordContainer}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Минимум 6 символов"
            value={password}
            onChange={handlePasswordChange}
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
      <div>
        <button
          onClick={handleLogin}
          disabled={!isFormValid}
          className={isFormValid ? "" : "disabled"}
        >
          Войти
        </button>
        <button onClick={handleReset}>Отмена</button>
        <button onClick={handleRegister}>Регистрация</button>
      </div>
      {apiError && <span className={styles.errorMessage}>{apiError}</span>}
    </div>
  );
};

export default LoginAdmin;
