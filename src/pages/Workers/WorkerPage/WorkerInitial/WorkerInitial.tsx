import "./WorkerInitial.scss";
import WorkerAvatar from "../../../../assets/Worker-Avatar.png";

export default function WorkerInitial({ showEmail }:any) {
    return (
        <div className="worker-initial">
            <img src={WorkerAvatar} alt="Avatar" />
            <div>
                <div className="worker-name">...Иван Михайлов</div>
                <div className={showEmail ? "worker-mail" : "worker-mail hidden" }>...ioann_mikh@company.am</div>
                {/* Применяем класс "hidden" только если showEmail === false */}
            </div>
        </div>
    );
}
