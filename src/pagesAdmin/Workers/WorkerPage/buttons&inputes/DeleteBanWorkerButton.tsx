<<<<<<< HEAD
import { useParams } from "react-router-dom";
=======
import { useParams, useNavigate } from "react-router-dom";
>>>>>>> dev3
import styles from "./buttons.module.scss";
import deliteBanIcon from "@/assets/deliteBanIcon.svg";
import { fetchDeleteUser } from "../../../../api/apiService";
import { IUser } from "../../../../types/IUser";

interface DeleteBanWorkerButtonProps {
  setUserData: React.Dispatch<React.SetStateAction<IUser | null>>;
}

<<<<<<< HEAD


export function DeleteBanWorkerButton() {
  const {profile_id} = useParams();
  const organizationId = localStorage.getItem("organization_id"); // получить organizationId из хранилища

=======
export function DeleteBanWorkerButton({ setUserData }: DeleteBanWorkerButtonProps) {
  const { profile_id } = useParams();
  const organizationId = localStorage.getItem("organization_id");
  const navigate = useNavigate();
>>>>>>> dev3

  const handleDeleteClick = () => {
    if (profile_id && organizationId) {
      if (window.confirm("Вы уверены, что хотите удалить?")) {
        fetchDeleteUser(profile_id, organizationId)
<<<<<<< HEAD
          .then((response) =>{
            console.log("Пользователь удален:", response)
            window.location.href = "/admin/workers"
          })
          .catch((error)=>{
            console.error("Ошибка при удалении пользователя:", error)
=======
          .then((response) => {
            console.log("Пользователь удален:", response);
            navigate("/admin-panel/workers");
            setUserData(null); // Обновляем состояние данных пользователя после удаления
>>>>>>> dev3
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