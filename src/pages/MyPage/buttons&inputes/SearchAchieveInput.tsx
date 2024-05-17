import styles from "./buttons.module.scss"
//import searchIcon from "@/assets/search-icon.svg"

interface Props {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export function SearchAchieveInput({ searchQuery, setSearchQuery }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className={styles.searchInputContainer}>
       
    <input
      value={searchQuery}
      onChange={handleChange}
      placeholder="Найти по названию"
      type="text"
      className={styles.searchWorkersInput}
    />
    </div>
  );
}
