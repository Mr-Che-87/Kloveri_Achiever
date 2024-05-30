import styles from "./TeamListItem.module.scss";

interface TeamListItemProps {
  name: string;
  members: string[];
}

const TeamListItem: React.FC<TeamListItemProps> = ({ name, members }) => {
  return (
    <div className={styles.teamListItem}>
      <div className={styles.teamInfo}>
        <div className={styles.teamName}>{name}</div>
        <div className={styles.teamMembers}>{members.join(", ")}</div>
      </div>
      <div className={styles.teamEdit}>
        <button>⮕</button>
      </div>
    </div>
  );
};

export default TeamListItem;
