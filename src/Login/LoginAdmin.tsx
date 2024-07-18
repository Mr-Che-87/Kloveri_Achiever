import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.scss";
import WelcomeImg from "@/assets/Welcome-img.png";

const LoginAdmin: React.FC = () => {
//const [role, setRole] = useState<"admin" | "worker" | "">("");
//const [organizationId, setOrganizationId] = useState<string | null>(null);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [apiError, setApiError] = useState("");
  const [profileId, setProfileId] = useState<string | null>(null)

  const navigate = useNavigate();

  const handleLogin = async () => {
    console.log("handleLogin called");
    console.log("login:", login);
    console.log("password:", password);

    try {
      //const organizationId = localStorage.getItem("organization_id");
      //if(!organizationId){
      //  throw new Error( "Organization ID is not found");
      //}
      const response = await fetch("https://api.achiever.skroy.ru/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          //"ORGANIZATION-ID": organizationId,
        },
        body: JSON.stringify({ login, password }),
      });

      console.log("response status:", response.status);

      if (!response.ok) {
        throw new Error(`Ошибка при входе: ${response.statusText}`);
      }

      const data = await response.json();

      console.log("response data:", data);

      // Сохраняем токен авторизации в локальное хранилище
      localStorage.setItem("userData", JSON.stringify(data))
      localStorage.setItem("profileId", data.profile_id);
      localStorage.setItem("linkId", data.link_id);
      
     //Сохраняем organization_id
     // setOrganizationId(data.organization_id);
      
      // Сохраняем profile_id
      setProfileId(data.profile_id)

      console.log("Navigating to admin page");
      navigate("/admin-panel/my-page",{state: {profileId: data.profile_id}});
      {/*
      // Временная логика перенаправления на основе данных
      if (data.profile_id && role === "admin") {
        console.log("Navigating to admin page");
        navigate("/admin-panel",{state: {profileId: data.profile_id}});
      } else if (data.profile_id && role === "worker") {
        console.log("Navigating to worker page");
        navigate("/worker", { state: { profileId: data.profile_id}});
      }
      */}
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Неизвестная ошибка";
      console.error("Login error:", errorMessage);
      setApiError(`Ошибка при входе: ${errorMessage}`);
    }
  };


 

  // useEffect(() => {
  //   const fetchData = async () => {
  //     //if (!organizationId) return;

  //     try {
  //       const response = await fetch(
  //         "https://api.achiever.skroy.ru/profiles/",
  //         // {
  //         //   headers: {
  //         //     "ORGANIZATION-ID": organizationId,
  //         //   },
  //         // }
  //       );

  //       if (!response.ok) {
  //         throw new Error(
  //           `Ошибка при получении данных: ${response.statusText}`
  //         );
  //       }

  //       const data = await response.json();
  //       console.log("Fetched data:", data);
  //     } catch (error: unknown) {
  //       const errorMessage =
  //         error instanceof Error ? error.message : "Неизвестная ошибка";
  //       console.error("Fetch data error:", errorMessage);
  //     }
  //   };

  //   fetchData();
  // }, [organizationId, profileId]);  

  const handleReset = () => {
  //setRole("");
  //setOrganizationId(null);
    setLogin("");
    setPassword("");
    setLoginError("");
    setPasswordError("");
    setApiError("");
  };

  // Валидация email и пароля
  // const validateEmail = (email: string) => {
  //   const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  //   return re.test(String(email).toLowerCase());
  // };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogin(e.target.value);
  };

  // const handleEmailBlur = () => {
  //   if (!validateEmail(login)) {
  //     setLoginError("Адрес почты некорректен!");
  //   } else {
  //     setLoginError("");
  //   }
  // };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  // const handlePasswordBlur = () => {
  //   if (password.length < 6) {
  //     setPasswordError("Ваш пароль слишком короткий!");
  //   } else {
  //     setPasswordError("");
  //   }
  // };

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
          // onBlur={handleEmailBlur}
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
            // onBlur={handlePasswordBlur}
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
      <div>
        <button
          onClick={handleLogin}
          disabled={!isFormValid}
          className={isFormValid ? "" : "disabled"}
        >
          Войти
        </button>
        <button onClick={handleReset}>Отмена</button>
        <button onClick={handleRegister}>Регистрация</button>{" "}
      </div>
      {apiError && <span className={styles.errorMessage}>{apiError}</span>}
    </div>
  );
};

export default LoginAdmin;
