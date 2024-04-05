import React from "react";
import styles from "./buttons.module.scss";

type ChangeWorkerInformationButtonProps = {
  isEditing: boolean;
  toggleEdit: () => void;
};

export const ChangeWorkerInformationButton: React.FC<
  ChangeWorkerInformationButtonProps
> = ({ isEditing, toggleEdit }) => {
  return (
    <button
      className={styles.ChangeWorkerInformationButton}
      onClick={toggleEdit}
    >
      {isEditing ? "Сохранить" : "Изменить"}
    </button>
  );
};
