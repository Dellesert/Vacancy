import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import styles from './style.module.css'
import axios from "axios";
import Card from "../../../UI/Card/Card";
import Sidebar from "../../../UI/Sidebar/Sidebar";

const MyCompany = () => {
    const user = JSON.parse(localStorage.getItem('user'));

    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        axios
          .get(`/company/user/${user.id}`, {
            headers: {
              Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
            }
          })
          .then((res) => {
            setCompanies(res.data);
            console.log(companies)
          })
          .catch((error) => console.log(error));
      }, []);



      const HandleClick = async (id) => {
        axios
          .delete(`/company/${id}`, {
            headers: {
              Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
            }
          })
          .then((res) => {
            setCompanies(res.data);
            console.log(companies)
          })
          .catch((error) => console.log(error));
        console.log(id)
      }

  
    return (
        <div className={styles.main}>
            <Sidebar></Sidebar>
            <div className={styles.content}>
            {companies.map((company) => (
              <Card
              key={company.id}
              id={company.id}
              position={company.title}
              salary={''}
              body={company.description}
              footer={''}
              button={'Удалить'}
              buttonVisible={true}
              isResponse={''}
              page={''}
              toggleFavorite={''}
              isFavorite={''}
              isActiveFavorite={false}
              HandleClick={HandleClick}
            />

               
        ))}


      </div>
        </div>
    );
}

export default MyCompany;
