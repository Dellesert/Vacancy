
import styles from './style.module.css'
import Input from '../../UI/Input/Input';
import Textarea from '../../UI/Textarea/Textarea';
import { useEffect, useState } from 'react';
import axios from 'axios';


function CreateCompany() {
  const [company, setCompany] = useState([])
  const user = JSON.parse(localStorage.getItem('user'));

  const [state, setState] = useState({
    title: "",
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
    if (state.title === "" || state.description === "") {
      console.log("Ошибка: Все поля должны быть заполнены!");
      return; 
    }

    const postData = {
      title: state.title,
      description: state.description,
      userId: user.id
    };

    axios
      .post(`/company`, postData, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
        }
      })
      .then((response) => {
        console.log("Данные успешно отправлены на сервер:", response.data);
        setState({ title: "", description: ""});
      })
      .catch((error) => console.log(error));
  };
    
    return (
      <div className={styles.main}>
      <div className={styles.cards}>
        <div className={styles.card}>
          <div className={styles.content}>
            <Input value={state.title} name='title' handleInputChange={handleInputChange} placeholder={'Название компании'}/>
            <Textarea value={state.description} name='description' handleInputChange={handleInputChange} placeholder={'Описание компании'}></Textarea>
            <div>
            <button onClick={handleSubmit} className={styles.button}>Создать</button>
            </div>
            
          </div>
        </div>
        </div>
      </div>
    );
}



export default CreateCompany
