import { SetStateAction, useState } from "react";
import styles from "./ChangePassword.module.scss"; // предполагаем, что есть стили

function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleCurrentPasswordChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setCurrentPassword(e.target.value);
  };

  const handleNewPasswordChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setNewPassword(e.target.value);
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // здесь будет логика для отправки запроса на смену пароля - ЕЩЁ НЕ ГОТОВО!!!!
    console.log("Смена пароля:", { currentPassword, newPassword });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.changePasswordForm}>
      <div>
        <label>
          Текущий пароль:
          <input
            type={showPassword ? "text" : "password"}
            value={currentPassword}
            onChange={handleCurrentPasswordChange}
            required
          />
          <span
            className={styles.passwordCurrentToggle}
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? "🙈" : "👁️"}
          </span>
        </label>
      </div>
      <div>
        <label>
          Новый пароль:
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Минимум 6 символов"
            value={newPassword}
            onChange={handleNewPasswordChange}
            required
          />
          <span
            className={styles.passwordNewToggle}
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? "🙈" : "👁️"}
          </span>
        </label>
      </div>

      <div className={styles.changePasswordButton} >
        <button type="submit">Сменить пароль</button>
      </div>
    </form>
  );
}

export default ChangePassword;
