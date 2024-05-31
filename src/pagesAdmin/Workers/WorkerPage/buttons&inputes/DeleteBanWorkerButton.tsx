import { useParams } from "react-router-dom";
import styles from "./buttons.module.scss";
import deliteBanIcon from "@/assets/deliteBanIcon.svg";
import { fetchDeleteUser } from "../../../../api/apiService";

export function DeleteBanWorkerButton() {
  const {profile_id} = useParams();

  const handleDeleteClick = () =>{
    if(profile_id){
      if (window.confirm("Вы уверены, что хотите удалить?")) {
        fetchDeleteUser(profile_id)
          .then((response) =>{
            console.log("Пользователь удален:", response)
            window.location.href = "/workers"
          })
          .catch((error)=>{
            console.error("Ошибка при удалении пользователя:", error)
          })
      }
    }
  }
  return (
    <button className={styles.deleteBanWorkerButton} onClick={handleDeleteClick} >
      <img src={deliteBanIcon} alt="" />
      Удалить аккаунт
    </button>
  );
}
