import { useParams, useNavigate } from "react-router-dom";
import styles from "./buttons.module.scss";
import { fetchDeleteUser } from "../../../../api/apiService";
import { IUser } from "../../../../types/IUser";
import { useState } from "react";
import ConfirmModalDelete from "../ConfirmModalDelete/ConfirmModalDelete";

interface DeleteBanWorkerButtonProps {
  setUserData: React.Dispatch<React.SetStateAction<IUser | null>>;
}

export function DeleteBanWorkerButton({ setUserData }: DeleteBanWorkerButtonProps) {
  const { profile_id } = useParams();
  const navigate = useNavigate();
  const [showConfirmModal, setShowConfirmModal] = useState(false); // Add a state to track the modal visibility

  const handleDeleteClick = () => {
    setShowConfirmModal(true); // Show the modal when the button is clicked
  };

  const handleConfirm = () => {
    const userDataString = localStorage.getItem("userData");
    let organizationId = "";
    if (userDataString) {
      try {
        const userData = JSON.parse(userDataString);
        organizationId = userData.organization_id;
      } catch (error) {
        console.error("Ошибка при парсинге данных userData из localStorage:", error);
      }
    } else {
      console.log("Данные userData не найдены в localStorage");
    }
    if (profile_id && organizationId) {
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
    setShowConfirmModal(false); // Hide the modal after confirmation
  };

  const handleCancel = () => {
    setShowConfirmModal(false); // Hide the modal when canceled
  };

  return (
    <>
      <button className={styles.deleteBanWorkerButton} onClick={handleDeleteClick}>
        Удалить аккаунт
      </button>
      {showConfirmModal && (
        <ConfirmModalDelete
          message="Вы уверены, что хотите удалить?"
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </>
  );
}