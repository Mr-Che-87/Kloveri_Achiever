import styles from "./LogoutButton.module.scss"

function LogoutButton() {
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    window.location.href = "/login"; // перенаправляем на страницу логина
  };

  return <button className={styles.logoutButton} onClick={handleLogout}>Выйти</button>;
}

export default LogoutButton;
