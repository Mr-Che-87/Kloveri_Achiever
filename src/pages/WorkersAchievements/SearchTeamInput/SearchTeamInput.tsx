import "./SearchTeamInput.scss";
//import SearchIcon from "../../assets/search-icon.svg";

const SearchTeamInput = () => {
  return (
    <div className="search-input-container">
      <input
        type="text"
        className="search-team-input"
        placeholder="Найти по имени или названию"
      />
    </div>
  );
};

export default SearchTeamInput;
