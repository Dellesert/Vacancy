import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import styles from './style.module.css'
import axios from "axios";
import Card from "../../UI/Card/Card";
import Sidebar from "../../UI/Sidebar/Sidebar";

const Invitation = () => {
    const user = JSON.parse(localStorage.getItem('user'));

    const [vacancies, setVacancies] = useState([]);
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        axios
          .get(`/favorite/user/${user.id}`, {
            headers: {
              Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
            }
          })
          .then((res) => {
            setVacancies(res.data);
          })
          .catch((error) => console.log(error));
    
        if (user) {
          axios.get(`/favorite/user/${user.id}`, {
            headers: {
              Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
            }
          })
            .then((res) => {
              const favoriteIds = res.data.map(favorite => favorite.vacancyId);
              setFavorites(favoriteIds);
            })
            .catch((error) => console.log(error));
        }
      }, []);
    
      const toggleFavorite = async (id) => {
        try {
          const isFavorited = favorites.includes(id);
          if (isFavorited) {
            setFavorites(favorites.filter((favId) => favId !== id));
            await axios.delete(`/favorite/user/${user.id}/vacancy/${id}`, {
              headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
              }
            });
          } else {
            const postData = {
              vacancyId: id,
              userId: user.id
            };
            setFavorites([...favorites, id]);

            await axios.post(`/favorite`, postData, {
              headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
              }
            });
          }
        } catch (error) {
          console.error('Error toggling favorite:', error);
        }
      };

    return (
        <div className={styles.main}>
            <Sidebar></Sidebar>
            <div className={styles.content}>
            {vacancies.map((vacancy) => (
          <Card
            key={vacancy.vacancy.id}
            id={vacancy.vacancy.id}
            position={vacancy.vacancy.title}
            salary={vacancy.vacancy.salary}
            body={vacancy.vacancy.description}
            footer={vacancy.vacancy.company ? vacancy.vacancy.company.title : "Unknown Company" }
            button={'Откликнуться'}
            page={'vacancy'}
            toggleFavorite={(id) => toggleFavorite(id, 'vacancy')}
            isFavorite={favorites.includes(vacancy.vacancy.id)}
            isActiveFavorite={true}
          />
        ))}

      </div>
        </div>
    );
}

export default Invitation;
