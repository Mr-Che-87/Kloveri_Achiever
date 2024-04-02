import TeamList from "./TeamList/TeamList";
import AddTeamButton from "./AddTeamButton/AddTeamButton";
import SearchTeamInput from "./SearchTeamInput/SearchTeamInput";
import "./Teams.scss";

export default function Teams() {
  return (
    <div className="teams-achievements">
      <header className="teams-achievements-header">
        <h1>Команды</h1>
        <div className="edit-teams">
          <AddTeamButton />
          <SearchTeamInput />
        </div>
      </header>
      <TeamList />
    </div>
  );
}
