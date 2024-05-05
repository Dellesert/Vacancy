import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import styles from './style.module.css'
import axios from "axios";
import Card from "../../../UI/Card/Card";
import Sidebar from "../../../UI/Sidebar/Sidebar";

const MyResume = () => {
    const user = JSON.parse(localStorage.getItem('user'));

    const [resumes, setResumes] = useState([]);
    const [responses, setResponses] = useState([]);

    useEffect(() => {
        axios
          .get(`/resume/user/${user.id}`, {
            headers: {
              Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
            }
          })
          .then((res) => {
            setResumes(res.data);
            console.log(resumes)
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
        
      }

  
    return (
        <div className={styles.main}>
            <Sidebar></Sidebar>
            <div className={styles.content}>
            {resumes.map((resume) => (
              <Card
              key={resume.id}
              id={resume.id}
              position={resume.title}
              salary={resume.salary}
              body={resume.description}
              footer={''}
              button={'Удалить'}
              buttonVisible={true}
              isResponse={''}
              page={'vacancy/invitation'}
              toggleFavorite={''}
              isFavorite={''}
              isActiveFavorite={false}
            />

               
        ))}


      </div>
        </div>
    );
}

export default MyResume;
