import React, { useState } from "react";
import styles from "./WorkersModalAddUser.module.scss";
import { IUser } from "../../../types/IUser";
import WorkersModalAddUserContent from "./WorkersModalAddUserContent/WorkersModalAddUserContent";

interface WorkerModalAddUserProps {
  user: IUser | undefined;
  showEmail: boolean; //отображение мейла
  avatarSize: "small" | "large"; //отображение размера фотки
  //photoType: "photo_small" | "photo_main";  //отображение размера фотки
}

export default function WorkersModalAddUser({
  user,
  showEmail,
  avatarSize,
}: WorkerModalAddUserProps) {
  const [userData, setUserData] = useState<IUser | null>(null);
  
  return (
    <div className={styles.workerModalAddUser}>
      <div className={styles.workerModalAddUser__content}>
        <div className={styles.title}>
          <p>Добавить сотрудника</p>
        </div>
            <WorkersModalAddUserContent
            
            />
     
      </div>
    </div>
  );
}
