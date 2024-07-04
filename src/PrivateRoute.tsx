import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const isAuth = localStorage.getItem('profileId'); // проверка наличия profileId в localStorage

  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

<<<<<<< HEAD
export default PrivateRoute;
=======
export default PrivateRoute;
>>>>>>> dev3
