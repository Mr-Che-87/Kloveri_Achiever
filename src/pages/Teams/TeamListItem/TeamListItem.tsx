import "./TeamListItem.scss";

interface TeamListItemProps {
  name: string;
  members: string[];
}

const TeamListItem: React.FC<TeamListItemProps> = ({ name, members }) => {
  return (
    <div className="team-list-item">
      <div className="team-info">
        <div className="team-name">{name}</div>
        <div className="team-members">{members.join(", ")}</div>
      </div>
      <div className="team-edit">
        <button>⮕</button>
      </div>
    </div>
  );
};

export default TeamListItem;
