import React from "react";
import styles from "./SearchInputWorkers.module.scss"

interface SearchInputWorkersProps {
    isSearchName: string;
    setIsSearchName: (name: string) => void;
  }


const SearchInputWorkers: React.FC<SearchInputWorkersProps> = ({
    isSearchName,
     setIsSearchName
    }) => {
   
   
    
    return(
        <div className={styles.searchInputContainer}>
                <input
                value={isSearchName}
                onChange={(e) => setIsSearchName(e.target.value)}  
                className={styles.searchWorkersInput}
                placeholder="Найти по имени"
                />
        </div>
    )
}

export default SearchInputWorkers;