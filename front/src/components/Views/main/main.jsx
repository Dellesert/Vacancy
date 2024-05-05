import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../../UI/Card/Card';

const Main = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const token = JSON.parse(localStorage.getItem('token'));


  const [vacancies, setVacancies] = useState([]);
  const [resumes, setResumes] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [response, setResponse] = useState([]);

   const HandleClick = async (id) => {
    try {
      const isResponse = response.includes(id);
      if (isResponse) {
        setResponse(response.filter((resId) => resId !== id));
        await axios.delete(`/response/user/${user.id}/vacancy/${id}`);
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
      .get(`/vacancy?limit=3`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      .then((res) => {
        setVacancies(res.data);
      })
      .catch((error) => console.log(error));

    axios
      .get(`/resume?limit=3`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }})
      .then((res) => {
        setResumes(res.data);
      })
      .catch((error) => console.log(error));


      axios.get(`/favorite/user/${user.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }})
        .then((res) => {
          const favoriteIds = res.data.map(favorite => favorite.vacancyId);
          setFavorites(favoriteIds);
        })
        .catch((error) => console.log(error));

    axios.get(`response/user/${user.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }})
      .then((res) => {
        const responseIds = res.data.map(response => response.vacancyId);
        setResponse(responseIds);
      })
      .catch((error) => console.log(error));
  }, []);

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


  return (
    <div>
      <div className='content'>
        {
          vacancies.length
          ? <>
          <h3>Последние добавленные вакансии</h3>
          {vacancies.map((vacancy) => (
          <Card
            key={vacancy.id}
            id={vacancy.id}
            position={vacancy.title}
            salary={vacancy.salary}
            body={vacancy.description.slice(0,300)+'...'}
            footer={vacancy.company.title}
            button={response.includes(vacancy.id) ? 'Откликнуться' : 'Отказаться'}
            HandleClick={HandleClick}
            isResponse={response.includes(vacancy.id)}
            page={'vacancy'}
            toggleFavorite={toggleFavorite}
            isFavorite={favorites.includes(vacancy.id)}
            isActiveFavorite={true}
          />
        ))}
          </>
          : <div><h4>Вакансий пока нет</h4></div>
        }
        
       
        { resumes.length
        ? <>
         <h3>Последние добавленные резюме</h3>
         {resumes.map((resume) => (
          <Card
            key={resume.id}
            id={resume.id}
            position={resume.title}
            salary={resume.salary}
            body={resume.description.slice(0,300)+'...'}
            footer={''}
            button={'Пригласить'}
            page={'resume'}
            HandleClick={() => console.log('click')}
            isResponse={true}
            isActiveFavorite={false}
          />
        ))}
        </>
        : <div><h4>Резюме пока нет</h4></div>

        }
       
      </div>
    </div>
  );
};

export default Main;
