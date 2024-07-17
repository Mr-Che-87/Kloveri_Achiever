import styles from "./WorkerInitial.module.scss";
import defaultAvatar from "@/assets/defaultAvatar.png";  //заглушка если бэк ниалё
import iconMale from "@/assets/icon_male.png";
import iconFemale from "@/assets/icon_female.png";     

import { IUser } from "../../../../types/IUser";
import { ILinkData } from "../../../../types/ILinkData";


interface WorkerInitialProps {
  user: IUser;
  showEmail: boolean;  //отображение мейла
  avatarSize: "small" | "large"; 
  linkData:ILinkData | null;
}



export default function WorkerInitial({
  user,
  avatarSize,
  linkData
}: WorkerInitialProps) {
  if (!user) {
    return <div>Не можем найти данные с бэка - user data...</div>;
  }



  // Проверка на пустой url(ошибка404) без картинки:
  const imageUrl = user[(avatarSize === "small") ? "photo_small" : "photo_main"] || defaultAvatar;
  const imageExists = (url: string) => {
    const img = new Image();
    img.src = url;
    return img.complete && img.naturalHeight !== 0;
  };

  // Определяем иконку пола
  const genderIcon = user.sex === "female" ? iconFemale : user.sex === "male" ? iconMale : null;

  return (
    <div className={`${styles.workerInitial} ${avatarSize === "small" ? styles.small : styles.large}`}>
      <img
        className={styles.workerAvatar}
        src={imageExists(imageUrl) ? imageUrl : defaultAvatar}    // defaultAvatar - если url нет или он пустой
        alt="Avatar"
      />
      <div className={styles.workerContainer}>
        <div className={styles.workerName}>
          {`${user.first_name} ${user.last_name}` || "Загружаем имя..."}
        </div>
        {genderIcon && (
          <img className={styles.genderIcon} src={genderIcon} alt="пол" />
        )}
        <div className={styles.workerSpecialty}>
        {linkData ? linkData.specialty : "Должность не указана"}
        </div>
      </div>
    </div>
  );
}
