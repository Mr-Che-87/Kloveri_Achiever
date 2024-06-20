import styles from "./WorkerInitial.module.scss";
import defaultAvatar from "@/assets/defaultAvatar.png";  //заглушка если бэк ниалё
// import iconMale from "@/assets/icon_male.png";
// import iconFemale from "@/assets/icon_female.png";     

import { IUser } from "../../../types/IUser";

interface WorkerInitialProps {
  user: IUser | undefined;
  showEmail: boolean;  //отображение мейла
  avatarSize: "small" | "large";    //отображение размера фотки
  //photoType: "photo_small" | "photo_main";  //отображение размера фотки
}


export default function WorkerInitial({
  user,
  showEmail,
  avatarSize,
}: WorkerInitialProps) {
  if (!user) {
    return <div>Не можем найти данные с бэка - user data...</div>;
  }


  //Проверка на пустой url(ошибка404) без картинки:
  const imageUrl = user[(avatarSize === "small") ? "photo_small" : "photo_main"] || defaultAvatar;
  const imageExists = (url:string) => { 
    const img = new Image(); 
    img.src = url; 
    return img.complete && img.naturalHeight !== 0; 
};  

 // Определяем иконку пола
//  const genderIcon = user.sex === "female" ? iconFemale : user.sex === "male" ? iconMale : null;

  return (
    <div className={`${styles.workerInitial} ${avatarSize === "small" ? styles.small : styles.large}`}>
      <img
        className={styles.workerAvatar}
        src={imageExists(imageUrl) ? imageUrl : defaultAvatar}    //defaultAvatar - если url нет или он пустой
        alt="Avatar"
      />
      <div>
        <div className={styles.workerName}>
          {`${user.first_name} ${user.last_name}` || "Загружаем имя..."}
          
        </div>
       
        
        {showEmail && (
          <div className={styles.workerMail}>
            {user.email || "Загружаем email..."}
          </div>
        )}
      </div>
      
    </div>
  );
}
