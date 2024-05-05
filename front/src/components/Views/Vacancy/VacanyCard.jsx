
import { useParams } from "react-router-dom";
import Card from "../../UI/Card/Card";
import styles from './style.module.css'
import { useEffect, useState } from "react";
import axios from "axios";



const VacancyCard = () => {
    const user = JSON.parse(localStorage.getItem('user'));

    const [vacancy, setVacancy] = useState('')
    const { id } = useParams();

  const [favorites, setFavorites] = useState([]);
  const [response, setResponse] = useState([]);

   const HandleClick = async (id) => {
    try {
      const isResponse = response.includes(id);
      if (isResponse) {
        setResponse(response.filter((resId) => resId !== id));
        await axios.delete(`/response/user/${user.id}/vacancy/${id}`, {
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
          }
        });
      } else {
        const postData = {
          vacancyId: id,
          userId: user.id
        };
        setResponse([...response, id]);
        await axios.post(`/response`, postData);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  }

  useEffect(() => {
    axios
      .get(`/vacancy/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
        }
      })
      .then((res) => {
        setVacancy(res.data);
      })
      .catch((error) => console.log(error));

    axios.get(`favorite/user/${user.id}`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
      }
    })
      .then((res) => {
        const favoriteIds = res.data.map(favorite => favorite.vacancyId);
        setFavorites(favoriteIds);
      })
      .catch((error) => console.log(error));

      axios.get(`response/user/${user.id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
        }
      })
      .then((res) => {
        const responseIds = res.data.map(response => response.vacancyId);
        setResponse(responseIds);
      })
      .catch((error) => console.log(error));
  }, [user.id]);

  const [searchInput, setSearchInput] = useState('');

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
  };

  const toggleFavorite = async (id) => {
    try {
      const isFavorited = favorites.includes(id);
      if (isFavorited) {
        setFavorites(favorites.filter((favId) => favId !== id));
        await axios.delete(`/favorite/user/${user.id}/vacancy/${id}`);
      } else {
        const postData = {
          vacancyId: id,
          userId: user.id
        };
        setFavorites([...favorites, id]);
        await axios.post(`/favorite`, postData);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };
    
    useEffect(() => {
        axios
          .get(`/vacancy/${id}`, {
            headers: {
              Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
            }
          })
          .then((res) => {
            setVacancy(res.data)
          })
          .catch((error) => console.log(error));
      }, [id]);


        return (
            <div className={styles.content}>
                {
                    vacancy 
                    ? <Card
                    key={vacancy.id}
                    id={vacancy.id}
                    position={vacancy.title}
                    salary={vacancy.salary}
                    body={vacancy.description}
                    footer={vacancy.company}
                    button={response.includes(vacancy.id) ? 'Отказаться' : 'Откликнуться'}
                    HandleClick={HandleClick}
                    isResponse={response.includes(vacancy.id)}
                    page={'vacancy'}
                    toggleFavorite={toggleFavorite}
                    isFavorite={favorites.includes(vacancy.id)}
                    isActiveFavorite={true}
                  />
                    : <div>Нет вакансий</div>

                }
            </div>
        );
};

export default VacancyCard;