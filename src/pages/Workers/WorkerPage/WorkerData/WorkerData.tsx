import "./WorkerData.scss";

export default function WorkerData() {
    return (
        <div>
        <h1>Информация</h1>
          <div className="worker-information">
            
            <div className="worker-login">
              <h2>Логин</h2>
              <input placeholder="...ioann_mikh@company.am"/>
            </div>
            
            <div className="worker-fullname">
              <h2>Имя</h2>
              <input placeholder="...Михайлов Иван Сергеевич"/>
            </div>

            <div className="worker-birthday">
              <h2>Дата рождения</h2>
              <input placeholder="...10.10.1987"/>
            </div>

            <div className="worker-number">
              <h2>Табельный номер</h2>
              <input placeholder="...228"/>
            </div>

            <div className="worker-startdate">
              <h2>Дата начала работы</h2>
              <input placeholder="...01.01.2024"/>
            </div>

            <div className="worker-position">
              <h2>Роль</h2>
              <input placeholder="...DevOps"/>
            </div>
          </div>
        </div>
            
    )


}