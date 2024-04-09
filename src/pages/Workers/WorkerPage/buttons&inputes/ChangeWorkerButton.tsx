import React from "react";
import styles from "./buttons.module.scss";

type ChangeWorkerButtonProps = {
  isEditing: boolean;
  toggleEdit: () => void;
};

export const ChangeWorkerButton: React.FC<ChangeWorkerButtonProps> = ({
  isEditing,
  toggleEdit,
}) => {
  return (
    <button className={styles.ChangeWorkerButton} onClick={toggleEdit}>
      {isEditing ? "Сохранить" : "Изменить"}
    </button>
  );
};
