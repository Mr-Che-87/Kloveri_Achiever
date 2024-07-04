import { SetStateAction, useState } from "react";
import styles from "./ChangePassword.module.scss"; // предполагаем, что есть стили

function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

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
    // здесь будет логика для отправки запроса на смену пароля
    console.log("Смена пароля:", { currentPassword, newPassword });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.changePasswordForm}>
      <div>
        <label>
          Текущий пароль:
          <input
            type="password"
            value={currentPassword}
            onChange={handleCurrentPasswordChange}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Новый пароль:
          <input
            type="password"
            value={newPassword}
            onChange={handleNewPasswordChange}
            required
          />
        </label>
      </div>
      <button type="submit">Сменить пароль</button>
    </form>
  );
}

export default ChangePassword;
