import { useState } from "react";
import "./TeamFilter.scss";

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
    <div className="team-filter">
      <button className="team-filter-button" onClick={() => setIsOpen(!isOpen)}>
        {selectedFilter} <span className="arrow">{isOpen ? "▲" : "▼"}</span>
      </button>
      {isOpen && (
        <ul className="team-filter-list">
          {filters.map((filter) => (
            <li
              key={filter}
              className="team-filter-item"
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
