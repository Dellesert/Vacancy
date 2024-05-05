import axios from 'axios';

import { useEffect, useState } from 'react';
import Card from '../../UI/Card/Card';
import Search from '../../UI/Search/Search';
import styles from './style.module.css'


function Company() {

  const [companies, setCompanies] = useState([])

  useEffect(() => {
    axios
      .get(`/company`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
        }
      })
      .then((res) => {
        setCompanies(res.data)
      })
      .catch((error) => console.log(error));
  }, []);

  
  const searchItems = (searchValue) => {
    if (searchValue.length === 0) {
      axios
      .get(`/company`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
        }
      })
      .then((res) => {
        setCompanies(res.data)
      })
      .catch((error) => console.log(error));
    }
    if (searchValue.length > 3) {
      axios
    .get(`/company/search/${searchValue}`, {
      headers: {
        Authorization: `Bearer ${ JSON.parse(localStorage.getItem('token'))}`,
      }
    })
    .then((res) => {
      setCompanies(res.data);
    })
    .catch((error) => console.log(error));
    }
  }
  
    
    return (
      <div>
        <div className={styles.content}>
        <Search placeholder={'Поиск компаний в Великом Новгороде'} searchItems={searchItems}  />
        {companies.length ? <>{
        companies.map((company)=> (
          <Card key={company.id} id={company.id} position={company.title} salary={''} body={company.description} footer={''} button={'Посмотреть'} page={'company'}/>
        )
      
      )}</>
        :<h4>Компании не найдены</h4>}
        
        
        </div>
        
      </div>
    );
}



export default Company
