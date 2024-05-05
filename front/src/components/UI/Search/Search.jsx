import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import styles from './style.module.css'

function Search({placeholder, searchItems, searchAdvanced, isActiveAdvancedSearch}) {

    
    return (
      <>
      <div className={styles.content}>
        <input onChange={(e) => searchItems(e.target.value)} className={styles.input} placeholder={placeholder} type="text" />
        <FontAwesomeIcon onClick={searchItems} className={styles.icon} icon={faMagnifyingGlass}></FontAwesomeIcon>
        
        
      </div>
      <div className={styles.advanced}>
      {isActiveAdvancedSearch
      ? <><input onChange={(e) => searchAdvanced(e.target.value)} className={styles.input} placeholder={'Зарплата от тыс. р.'} type="number" />
      <input onChange={(e) => searchAdvanced(e.target.value)} className={styles.input} placeholder={'Ключевые слова'} type="text" /></>
      : <></>
      }
      </div>
      </>
    );
}



export default Search