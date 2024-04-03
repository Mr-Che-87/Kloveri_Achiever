import styles from "./SearchTeamInput.module.scss";
//import SearchIcon from "../../assets/search-icon.svg";

const SearchTeamInput = () => {
  return (
    <div className={styles.searchInputContainer}>
      <input
        type="text"
        className="search-team-input"
        placeholder="Найти по имени или названию"
      />
    </div>
  );
};

export default SearchTeamInput;
