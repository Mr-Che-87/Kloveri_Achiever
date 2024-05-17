import React from "react";
import styles from "./buttons.module.scss";
import editIcon from "@/assets/editIcon.svg";
import saveIcon from "@/assets/saveIcon.svg";

type ChangeWorkerInformationButtonProps = {
  isEditing: boolean;
  toggleEdit: () => void;
  handleSave: () => void; 
};

export const ChangeWorkerInformationButton: React.FC<
  ChangeWorkerInformationButtonProps
> = ({ isEditing, toggleEdit, handleSave }) => {
  return (
    <button
      className={styles.ChangeWorkerInformationButton}
      onClick={() => (isEditing ? handleSave() : toggleEdit())} // Вызываем handleSave, если isEditing true, иначе toggleEdit
    >
      {isEditing ? (
        <img src={saveIcon} alt="Сохранить" />
      ) : (
        <img src={editIcon} alt="Изменить" />
      )}
    </button>
  );
};
