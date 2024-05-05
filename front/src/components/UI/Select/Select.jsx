
import styles from "./style.module.css";


function Select({company, value, name, handleInputChange}) {
    

    return (
        <div>
            <select id="123" className={styles.select} value={value} onChange={(e) => handleInputChange(e)} name={name}>
            <option value="" >Выберите компанию</option>
            {
            company.map((companyItem) => (
          <option key={companyItem.id} value={companyItem.title} company-id={companyItem.id} user-id={companyItem.userId}>{companyItem.title}</option>
        ))}
            </select>
        </div>
    )
}

export default Select