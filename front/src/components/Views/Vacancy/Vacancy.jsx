import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../../UI/Card/Card';
import Search from '../../UI/Search/Search';
import styles from './style.module.css';

function Vacancy() {
  const user = JSON.parse(localStorage.getItem('user'));
  const token = JSON.parse(localStorage.getItem('token'));

  const [vacancies, setVacancies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [response, setResponse] = useState([]);
  const [searchName, setSearchName] = useState('')
  const [searchSalary, setSearchSalary] = useState(0)
  const [isActiveAdvancedSearch] = useState(false)

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
        await axios.post(`/response`, postData, {
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
          }
        });
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  }

  useEffect(() => {
    axios
      .get(`/vacancy?limit=30`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      .then((res) => {
        setVacancies(res.data);
      })
      .catch((error) => console.log(error));

    axios.get(`favorite/user/${user.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
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


  const searchItems = (searchValue) => {
    setSearchName(searchValue)
    if (searchValue.length === 0) {
      axios
      .get(`/vacancy?limit=30`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      .then((res) => {
        setVacancies(res.data);
      })
      .catch((error) => console.log(error));
    }
    if (searchValue.length > 3) {
      axios
    .get(`/vacancy/search/${searchValue}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    .then((res) => {
      setVacancies(res.data);
    })
    .catch((error) => console.log(error));
    }

  };

  const searchAdvanced = (searchValue) => {
    setSearchSalary(searchValue)
    if (searchValue.length === 0) {
      axios
      .get(`/vacancy?limit=30`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      .then((res) => {
        setVacancies(res.data);
      })
      .catch((error) => console.log(error));
    }
    if (searchValue.length > 3) {
      axios
    .get(`/vacancy/search/advanced/${searchValue}/${searchName}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    .then((res) => {
      setVacancies(res.data);
    })
    .catch((error) => console.log(error));
    }

  };

  const toggleFavorite = async (id) => {
    try {
      const isFavorited = favorites.includes(id);
      if (isFavorited) {
        setFavorites(favorites.filter((favId) => favId !== id));
        await axios.delete(`/favorite/user/${user.id}/vacancy/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
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
            Authorization: `Bearer ${token}`,
          }
        });
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  

  return (
    <div>
      <div className={styles.content}>
        <Search
          placeholder={'Поиск работы в Великом Новгороде'}
          searchItems={searchItems}
          isActiveAdvancedSearch={true}
          searchAdvanced={searchAdvanced}
        />
        {vacancies.length
        ? <>
        {vacancies.map((vacancy) => (
          <Card
            key={vacancy.id}
            id={vacancy.id}
            position={vacancy.title}
            salary={vacancy.salary}
            body={vacancy.description.slice(0,300)+'...'}
            footer={vacancy.company}
            button={response.includes(vacancy.id) ? 'Отказаться' : 'Откликнуться'}
            buttonVisible={true}
            HandleClick={HandleClick}
            isResponse={response.includes(vacancy.id)}
            page={'vacancy'}
            toggleFavorite={toggleFavorite}
            isFavorite={favorites.includes(vacancy.id)}
            isActiveFavorite={true}
          />
        ))}
        </>
        : <div>Вакансий не найдено</div>
        }
        
      </div>
    </div>
  );
}

export default Vacancy;
