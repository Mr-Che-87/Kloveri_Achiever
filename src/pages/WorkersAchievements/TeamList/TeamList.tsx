import { useState } from "react";
import TeamListItem from "../TeamListItem/TeamListItem";
import TeamFilter from "../TeamFilter/TeamFilter";
import "./TeamList.scss";

const TeamList = () => {
  const [filter, setFilter] = useState<string>("Все");
  const teams = [
    {
      id: 1,
      name: "Отдел smm",
      members: ["А. Галичкина", "С. Синицын", "К. Привхоценв"],
    },
  ];

  // Функция для фильтрации команд по выбранному фильтру
  const filteredTeams = teams.filter((team) => {
    if (filter === "Все") {
      return true;
    }
    return team.name === filter;
  });

  return (
    <div className="team-list">
      <TeamFilter setFilter={setFilter} />{" "}
      {filteredTeams.map((team) => (
        <TeamListItem key={team.id} name={team.name} members={team.members} />
      ))}
    </div>
  );
};

export default TeamList;
