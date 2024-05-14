import styles from "./SearchInputWorkers.module.scss"

const SearchInputWorkers = () => {

    return(
        <div className={styles.searchInputContainer}>
                <input
                type="text"
                className={styles.searchWorkersInput}
                placeholder="Найти по имени"
                />
        </div>
    )
}

export default SearchInputWorkers;