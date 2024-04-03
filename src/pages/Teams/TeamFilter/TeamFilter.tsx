import { useState } from "react";
import styles from "./TeamFilter.module.scss";

// Типы пропсов для TeamFilter
interface TeamFilterProps {
  setFilter: (filter: string) => void; // Определяем setFilter как функцию, принимающую строку
}

const TeamFilter: React.FC<TeamFilterProps> = ({ setFilter }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("Все");

  const filters = ["Все", "Команды", "Сотрудники", "Специальные"];

  const handleFilterClick = (filter: string) => {
    setSelectedFilter(filter);
    setFilter(filter);
    setIsOpen(false);
  };

  return (
    <div className={styles.teamFilter}>
      <button
        className={styles.teamFilterButton}
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedFilter}{" "}
        <span className={styles.arrow}>{isOpen ? "▲" : "▼"}</span>
      </button>
      {isOpen && (
        <ul className={styles.teamFilterList}>
          {filters.map((filter) => (
            <li
              key={filter}
              className={styles.teamFilterItem}
              onClick={() => handleFilterClick(filter)}
            >
              {filter}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TeamFilter;
