import "./WokerPage.scss";

export default function WorkerPage() {
  return (
    <div className="worker-page">
      <header className="worker-page-header">
        <img src="../../../assets/Worker-Avatar.png" alt="Avatar" />
        <div className="header-information">
          <div className="name-worker">Иван Михайлов</div>
          <div className="email-worker">ioann_mikh@company.am</div>
        </div>
      </header>
      <main>
        <section className="add-worker-section"></section>
        <section className="edit-section">
          <div className="information-worker"></div>
          <div className="achievements-worker">
            <div className="achievements-worker-header"></div>
            <div className="achievements-worker-slider"></div>
          </div>
        </section>
      </main>
    </div>
  );
}
