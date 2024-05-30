import { useState } from "react";
import styles from "./SearchInputWorkers.module.scss"

const SearchInputWorkers = ({isSearchName, setIsSearchName}) => {
   
   
    
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