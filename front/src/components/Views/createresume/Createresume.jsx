
import styles from './style.module.css'
import Input from '../../UI/Input/Input';
import Textarea from '../../UI/Textarea/Textarea';
import { useState } from 'react';
import axios from 'axios';


function Createresume() {
  const user = JSON.parse(localStorage.getItem('user'));

  const [state, setState] = useState({
    position: '',
    salary: '',
    description: '',
  });


  const handleInputChange = (event) => {
    const { name, value} = event.target;
    setState((prevProps) => ({
      ...prevProps,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (state.position === "" || state.salary === "" || state.description === "") {
      console.log("Ошибка: Все поля должны быть заполнены!");
      return; 
    }

    const postData = {
      title: state.position,
      salary: state.salary,
      description: state.description,
      userId: user.id
    };

    axios
      .post(`/resume`, postData, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
        }
      })
      .then((response) => {
        console.log("Данные успешно отправлены на сервер:", response.data);
        setState({ position: "", salary: "", description: ""});
      })
      .catch((error) => console.log(error));
  };
    
    return (
      <div className={styles.main}>
      <div className={styles.cards}>
        <div className={styles.card}>
          <div className={styles.content}>
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



export default Createresume
