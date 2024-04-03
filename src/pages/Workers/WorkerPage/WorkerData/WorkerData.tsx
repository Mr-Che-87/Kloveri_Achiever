import styles from "./WorkerData.module.scss";

export default function WorkerData() {
  return (
    <div>
      <h1>Информация</h1>
      <div className={styles.workerInformation}>
        <div className={styles.workerLogin}>
          <h2>Логин</h2>
          <input placeholder="...ioann_mikh@company.am" />
        </div>

        <div className={styles.workerFullname}>
          <h2>Имя</h2>
          <input placeholder="...Михайлов Иван Сергеевич" />
        </div>

        <div className={styles.workerBirthday}>
          <h2>Дата рождения</h2>
          <input placeholder="...10.10.1987" />
        </div>

        <div className={styles.workerNumber}>
          <h2>Табельный номер</h2>
          <input placeholder="...228" />
        </div>

        <div className={styles.workerStartdate}>
          <h2>Дата начала работы</h2>
          <input placeholder="...01.01.2024" />
        </div>

        <div className={styles.workerPosition}>
          <h2>Роль</h2>
          <input placeholder="...DevOps" />
        </div>
      </div>
    </div>
  );
}
