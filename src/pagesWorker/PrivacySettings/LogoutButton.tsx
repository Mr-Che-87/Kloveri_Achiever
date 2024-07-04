<<<<<<< HEAD
import styles from "./LogoutButton.module.scss";
=======
import styles from "./LogoutButton.module.scss"
>>>>>>> dev3

function LogoutButton() {
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login"; // перенаправляем на страницу логина
  };

<<<<<<< HEAD
  return (
    <button className={styles.logoutButton} onClick={handleLogout}>
      Выйти
    </button>
  );
=======
  return <button className={styles.logoutButton} onClick={handleLogout}>Выйти</button>;
>>>>>>> dev3
}

export default LogoutButton;
