import axios from 'axios';
import { useEffect, useState } from 'react';
import Card from '../../UI/Card/Card';
import Search from '../../UI/Search/Search';
import styles from './style.module.css'


function Resume() {

  const [resumes, setResumes] = useState([])

  useEffect(() => {
    axios
      .get(`/resume?limit=30`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
        }
      })
      .then((res) => {
        setResumes(res.data)
      })
      .catch((error) => console.log(error));
  }, []);


  const searchItems = (searchValue) => {
    if (searchValue.length === 0) {
      axios
      .get(`/resume?limit=30`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
        }
      })
      .then((res) => {
        setResumes(res.data)
      })
      .catch((error) => console.log(error));
    }
    if (searchValue.length > 3) {
      axios
    .get(`/resume/search/${searchValue}`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
      }
    })
    .then((res) => {
      setResumes(res.data);
    })
    .catch((error) => console.log(error));
    }}

  return (
    <>
      
          <div>
            <div className={styles.content}>
              <Search placeholder={'Поиск работы в Великом Новгороде'} searchItems={searchItems} />
              {resumes.length
              ?  <>
              { 
                resumes.map((resume) => (
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
                )

                )}
              </>
              : <div className={styles.nofound}>
             <h4>Резюме не найдены</h4>
            </div>
            }
            </div>

          </div>
        
    </>


  );
}



export default Resume
