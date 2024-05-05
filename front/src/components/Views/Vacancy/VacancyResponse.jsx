import { NavLink, useParams } from "react-router-dom";
import styles from './style.module.css'
import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../UI/Sidebar/Sidebar";

const VacancyResponse = () => {
    const { id } = useParams();
    const [response, setResponse] = useState(null);

    useEffect(() => {
        axios.get(`/response/vacancy/${id}`, {
            headers: {
              Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
            }
          })
            .then((res) => {
                setResponse(res.data);
            })
            .catch((error) => console.log(error));
    }, [id]);

    return (
        <div className={styles.main}>
          
            {response ? (
                <div className={styles.content}>
                  <h3>Отклики на вакансию</h3>
                  <div className={styles.card}>
                  {response.map((item, index) => (
                        <div className={styles.row} key={item.id}>
                          <p className={styles.text}>{index+1}</p>
                          <NavLink className={styles.text} to={``}>{item.user.userName}</NavLink>
                          <button className={styles.button}>Посмотреть резюме</button>
                            <button className={styles.button}>Пригласить</button>
                        </div>
                    ))}
                  </div>
                    
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default VacancyResponse;
