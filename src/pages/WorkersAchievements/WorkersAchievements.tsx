import TeamList from "./TeamList/TeamList";
import AddTeamButton from "./AddTeamButton/AddTeamButton";
import SearchTeamInput from "./SearchTeamInput/SearchTeamInput";
import "./WorkersAchievements.module.scss";

export default function WorkersAchievements() {
  return (
    <div className="workers-achievements">
      <header className="workers-achievements-header">
        <h1>Команды</h1>
        <AddTeamButton />
        <SearchTeamInput />
      </header>
      <TeamList />
    </div>
  );
}
