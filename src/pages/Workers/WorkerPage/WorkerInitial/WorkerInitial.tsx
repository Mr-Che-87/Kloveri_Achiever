import styles from "./WorkerInitial.module.scss";
import WorkerAvatar from "../../../../assets/Worker-Avatar.png";  //заглушка на резерв
import { IUser } from "../../../../types/IUser";

interface WorkerInitialProps {
  user: IUser | undefined;
  showEmail: boolean;  //отображение мейла
  photoType: "photo_small" | "photo_main";  //отображение размера фотки
}

export default function WorkerInitial({
  user,
  showEmail,
  photoType
}: WorkerInitialProps) {
  if (!user) {
    return <div>Не можем найти данные с бэка - user data...</div>;
  }

  //Проверка на пустой url(ошибка404) без картинки:
  const imageUrl = user[photoType] || WorkerAvatar;
  const imageExists = (url:string) => { 
    const img = new Image(); 
    img.src = url; 
    return img.complete && img.naturalHeight !== 0; 
};  

  return (
    <div className={styles.workerInitial}>
      <img
        className={styles.workerAvatar}
        src={imageExists(imageUrl) ? imageUrl : WorkerAvatar}    //WorkerAvatar - фотка из заглушки(если url нет или он пустой)
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
