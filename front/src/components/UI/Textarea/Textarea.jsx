
import styles from "./style.module.css";


function Textarea({placeholder, value, name, handleInputChange}) {
    

    return (
        <div>
            <textarea className={styles.textarea} placeholder={placeholder} value={value} onChange={(e) => handleInputChange(e)} name={name} cols="30" rows="10"></textarea>
        </div>
    )
}

export default Textarea