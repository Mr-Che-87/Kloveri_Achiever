import TeamListItem from "../TeamListItem/TeamListItem";
import "./TeamList.module.scss";

const TeamList = () => {
  const teams = [
    {
      id: 1,
      name: "Отдел smm",
      members: ["А. Галичкина", "С. Синицын", "К. Привхоценв"],
    },
  ];

  return (
    <div className="team-list">
      {teams.map((team) => (
        <TeamListItem key={team.id} name={team.name} members={team.members} />
      ))}
    </div>
  );
};
export default TeamList;
