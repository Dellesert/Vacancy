
import styles from "./style.module.css";


function Input({placeholder, value, name, handleInputChange}) {
    
    return (
        <div>
            <input className={styles.input} placeholder={placeholder} value={value} onChange={(e) => handleInputChange(e)} name={name} type="text" />
        </div>
    )
}

export default Input