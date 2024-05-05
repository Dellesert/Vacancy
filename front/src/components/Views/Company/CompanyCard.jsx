
import { useParams } from "react-router-dom";
import Card from "../../UI/Card/Card";
import styles from './style.module.css'
import { useEffect, useState } from "react";
import axios from "axios";
import Vacancy from "../Vacancy/Vacancy";



const CompanyCard = () => {
    const [company, setCompany] = useState('')
    const { id } = useParams();

    useEffect(() => {
        axios
          .get(`/company/${id}`, {
            headers: {
              Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
            }
          })
          .then((res) => {
            setCompany(res.data)
            console.log(res.data)
          })
          .catch((error) => console.log(error));
      }, [id]);


        return (
            <div className={styles.content}>
                {
                    company 
                    ? <><Card id={company.id} position={company.title} salary={''} body={company.description } footer={''} page={'company'} button={'Откликнуться'}/></>
                    : <div>Нет компаний</div>

                }
            </div>
        );
};

export default CompanyCard;