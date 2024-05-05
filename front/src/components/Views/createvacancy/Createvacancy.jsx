
import styles from './style.module.css'
import Input from '../../UI/Input/Input';
import Textarea from '../../UI/Textarea/Textarea';
import Select from '../../UI/Select/Select';
import { useEffect, useState } from 'react';
import axios from 'axios';


function Createvacancy() {
  const [company, setCompany] = useState([])
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  const [state, setState] = useState({
    company: '',
    position: "",
    salary: "",
    description: ''
  });

  useEffect(() => {
    axios
      .get(`/company/user/${user.id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
        }
      })
      .then((res) => {
        setCompany(res.data)
      })
      .catch((error) => console.log(error));
  }, []);


  const handleSelectChange = (event) => {
    const { name, value} = event.target;
    const companyId = event.target.options[event.target.selectedIndex].getAttribute("company-id");
    const userId = event.target.options[event.target.selectedIndex].getAttribute("user-id");
    setState((prevProps) => ({
      ...prevProps,
      [name]: value,
      companyId: companyId,
      userId: userId
    }));
  };

  const handleInputChange = (event) => {
    const { name, value} = event.target;
    setState((prevProps) => ({
      ...prevProps,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (state.position === "" || state.salary === "" || state.company === "" || state.description === "") {
      console.log("Ошибка: Все поля должны быть заполнены!");
      return; 
    }

    const postData = {
      title: state.position,
      salary: state.salary,
      description: state.description,
      companyId: state.companyId,
      userId: state.userId
    };

    axios
      .post(`/vacancy`, postData, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
        }
      })
      .then((response) => {
        console.log("Данные успешно отправлены на сервер:", response.data);
        setState({ position: "", salary: "", company: "", description: ""});
      })
      .catch((error) => console.log(error));
  };
    
    return (
      <div className={styles.main}>
      <div className={styles.cards}>
        <div className={styles.card}>
          <div className={styles.content}>
            <Select company={company} value={state.company} name='company' handleInputChange={handleSelectChange} placeholder={'Компания'}></Select>
            <Input value={state.position} name='position' handleInputChange={handleInputChange} placeholder={'Должность'}/>
            <Input value={state.salary} name='salary' handleInputChange={handleInputChange}  placeholder={'Зарплата'}/>
            <Textarea value={state.description} name='description' handleInputChange={handleInputChange} placeholder={'Описание'}></Textarea>
            <div>
            <button onClick={handleSubmit} className={styles.button}>Создать</button>
            </div>
            
          </div>
        </div>
        </div>
      </div>
    );
}



export default Createvacancy
