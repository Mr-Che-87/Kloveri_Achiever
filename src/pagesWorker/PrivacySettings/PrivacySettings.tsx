import styles from "./PrivacySettings.module.scss";
import mockPrivacySettingsContent2 from "@/assets/mock-PrivacySettings-content2.png"

export default function PrivacySettings() {

    return (      
    <div>
        <p>Тут будут настройки приватности: <u>смена пароля</u>, например - <strong>у всех пользователей</strong>
        </p>
        <br />
        <p>И дополнительные настройки: <u>фоновая тема всего приложения</u>, например - <strong>у кадровички</strong>
        </p>
        <img  className={styles.mockPrivacySettingsContent}  src={mockPrivacySettingsContent2} />
    </div>
    )
}