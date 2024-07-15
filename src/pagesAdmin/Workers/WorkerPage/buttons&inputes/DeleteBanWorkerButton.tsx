import { useParams, useNavigate } from "react-router-dom";
import styles from "./buttons.module.scss";
// import deliteBanIcon from "@/assets/deliteBanIcon.svg";
import { fetchDeleteUser } from "../../../../api/apiService";
import { IUser } from "../../../../types/IUser";

interface DeleteBanWorkerButtonProps {
  setUserData: React.Dispatch<React.SetStateAction<IUser | null>>;
}

export function DeleteBanWorkerButton({ setUserData }: DeleteBanWorkerButtonProps) {
  const { profile_id } = useParams();
  const navigate = useNavigate();

  const handleDeleteClick = () => {
    const userDataString = localStorage.getItem("userData");
    let organizationId = "";
    if(userDataString){
      try{
        const userData = JSON.parse(userDataString);
        organizationId = userData.organization_id
      } catch(error){
        console.error("Ошибка при парсинге данных userData из localStorage:", error)
      }
    }else{
      console.log("Данные userData не найдены в localStorage")
    }
    if (profile_id && organizationId) {
      if (window.confirm("Вы уверены, что хотите удалить?")) {
        fetchDeleteUser(profile_id, organizationId)
          .then((response) => {
            console.log("Пользователь удален:", response);
            navigate("/admin-panel/workers");
            setUserData(null); // Обновляем состояние данных пользователя после удаления
          })
          .catch((error) => {
            console.error("Ошибка при удалении пользователя:", error);
          });
      }
    }
  };

  return (
    <button className={styles.deleteBanWorkerButton} onClick={handleDeleteClick}>
      {/* <img src={deliteBanIcon} alt="" /> */}
      Удалить аккаунт
    </button>
  );
}