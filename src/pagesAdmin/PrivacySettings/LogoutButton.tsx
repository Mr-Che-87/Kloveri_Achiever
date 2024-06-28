function LogoutButton() {
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    window.location.href = "/login"; // перенаправляем на страницу логина
  };

  return <button onClick={handleLogout}>Выйти</button>;
}

export default LogoutButton;
