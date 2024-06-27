import { useParams, useNavigate } from "react-router-dom";
import styles from "./buttons.module.scss";
import deliteBanIcon from "@/assets/deliteBanIcon.svg";
import { fetchDeleteUser } from "../../../../api/apiService";
import { IUser } from "../../../../types/IUser";

interface DeleteBanWorkerButtonProps {
  setUserData: React.Dispatch<React.SetStateAction<IUser | null>>;
}

export function DeleteBanWorkerButton({ setUserData }: DeleteBanWorkerButtonProps) {
  const { profile_id } = useParams();
  const organizationId = localStorage.getItem("organization_id");
  const navigate = useNavigate();

  const handleDeleteClick = () => {
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
      <img src={deliteBanIcon} alt="" />
      Удалить аккаунт
    </button>
  );
}