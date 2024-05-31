import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.scss";
import WelcomeImg from "@/assets/Welcome-img.png"



const Login: React.FC = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"admin" | "worker" | "">("");
  const [loginError, setLoginError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleLogin = () => {
    if (role === "admin") {
      navigate("/admin");
    } else if (role === "worker") {
      navigate("/worker");
    }
  };

  const handleReset = () => {
    setLogin("");
    setPassword("");
    setRole("");
    setLoginError("");
    setPasswordError("");
  };

  const validateEmail = (email: string) => {
    //валидация емейла типа string@string.string и только латиница: 
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; 
    return re.test(String(email).toLowerCase());
  };

 
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogin(e.target.value);
  };

  const handleEmailBlur = () => {
    if (!validateEmail(login)) {
      setLoginError("Адрес почты некорректен!");
    } else {
      setLoginError("");
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handlePasswordBlur = () => {
    if (password.length < 6) {
      setPasswordError("Ваш пароль слишком короткий!");
    } else {
      setPasswordError("");
    }
  };

  const isFormValid = login && password && role && !loginError && !passwordError;

  return (
    <div className={styles.authorizationContainer}>
      <h1>Добро пожаловать в Ачивер!</h1>
      <img className={styles.welcomeImg} src={WelcomeImg}/>
      <div>
        <label>Введите логин:</label>
        <input
          type="text"
          placeholder="Это ваш адрес корпоративной почты"
          value={login}
          onChange={handleEmailChange}
          onBlur={handleEmailBlur}
        />
        {loginError && <span className={styles.errorMessage}>{loginError}</span>}
      </div>
      <div>
        <label>Введите пароль:</label>
        <div className={styles.passwordContainer}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Минимум 6 символов"
            value={password}
            onChange={handlePasswordChange}
            onBlur={handlePasswordBlur}
          />
          <span
            className={styles.passwordToggle}
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>
        {passwordError && <span className={styles.errorMessage}>{passwordError}</span>}
      </div>
      <div>
        <label>Ваша роль:</label>
        <div>
        <label className={styles.labelRole} htmlFor="admin">Администратор</label>
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
        <label className={styles.labelRole} htmlFor="worker">Работник</label>
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
      <div>
        <button
          onClick={handleLogin}
          disabled={!isFormValid}
          className={isFormValid ? "" : "disabled"}
        >
          Войти
        </button>
        <button onClick={handleReset}>Отмена</button>
      </div>
    </div>
  );
};

export default Login;
