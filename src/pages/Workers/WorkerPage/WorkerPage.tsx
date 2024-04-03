import "./WokerPage.scss";

import WorkerInitial from "./WorkerInitial/WorkerInitial";
import { ChangeWorkerButton } from "./buttons/ChangeWorkerButton";
import { LinkWorkerButton } from "./buttons/LinkWorkerButton";
import { BanWorkerButton } from "./buttons/BanWorkerButton";
import { DeleteWorkerButton } from "./buttons/DeleteWorkerButton";
import WorkerData from "./WorkerData/WorkerData";
import WorkerAchivements from "./WorkerAchivements/WorkerAchivements";

export default function WorkerPage() {
  return (
    <div className="worker-page">
      <header className="worker-header">
        <div className="worker-initial">
        <WorkerInitial showEmail={true} /> {/* Передаём проп showEmail со значением true */}
        </div>
        <div className="header-nav-menu">
          <nav className="worker-nav-menu">
            <ul>
              <li><ChangeWorkerButton /></li>
              <li><LinkWorkerButton /></li>
              <li><BanWorkerButton /></li>
              <li><DeleteWorkerButton /></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="worker-main">
        <div className="worker-data">
          <WorkerData />
        </div>
        <div className="worker-achievements">
          <WorkerAchivements />
        </div>
      </main>
    </div>
  );
}
