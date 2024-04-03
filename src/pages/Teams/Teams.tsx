import TeamList from "./TeamList/TeamList";
import AddTeamButton from "./AddTeamButton/AddTeamButton";
import SearchTeamInput from "./SearchTeamInput/SearchTeamInput";
import styles from "./Teams.module.scss";

export default function Teams() {
  return (
    <div className={styles.teamsAchievements}>
      <header className={styles.teamsAchievementsHeader}>
        <h1>Команды</h1>
        <div className={styles.editTeams}>
          <AddTeamButton />
          <SearchTeamInput />
        </div>
      </header>
      <TeamList />
    </div>
  );
}
