import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import styles from './style.module.css'
import axios from "axios";
import Card from "../../../UI/Card/Card";
import Sidebar from "../../../UI/Sidebar/Sidebar";

const MyVacancy = () => {
    const user = JSON.parse(localStorage.getItem('user'));

    const [vacancies, setVacancies] = useState([]);
    const [responses, setResponses] = useState([]);

    useEffect(() => {
        axios
          .get(`/vacancy/user/${user.id}`, {
            headers: {
              Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
            }
          })
          .then((res) => {
            setVacancies(res.data);
            console.log(vacancies)
          })
          .catch((error) => console.log(error));
      }, []);

      useEffect(() => {
        axios
          .get(`/response/user/${14}`, {
            headers: {
              Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
            }
          })
          .then((res) => {
            setResponses(res.data);
            console.log(responses)
          })
          .catch((error) => console.log(error));
      }, []);

      const HandleClick = async (id) => {
        axios
          .delete(`/vacancy/${id}`, {
            headers: {
              Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
            }
          })
          .then((res) => {
            setVacancies(res.data);
            console.log(vacancies)
          })
          .catch((error) => console.log(error));
        console.log(id)
      }

  
    return (
        <div className={styles.main}>
            <Sidebar></Sidebar>
            <div className={styles.content}>
            {vacancies.map((vacancy) => (
              <Card
              key={vacancy.id}
              id={vacancy.id}
              position={vacancy.title}
              salary={vacancy.salary}
              body={vacancy.description}
              footer={vacancy.company}
              button={'Удалить'}
              HandleClick={HandleClick}
              buttonVisible={true}
              isResponse={''}
              page={'vacancy/responses'}
              toggleFavorite={''}
              isFavorite={''}
              isActiveFavorite={false}
            />

               
        ))}


      </div>
        </div>
    );
}

export default MyVacancy;
