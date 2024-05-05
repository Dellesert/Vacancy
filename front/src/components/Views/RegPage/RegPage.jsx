import styles from './style.module.css';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Auth() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [userName, setUserName] = useState('')
  const [error, setError] = useState(false)
  function onFormSubmit(e) {
    e.preventDefault();
    if (name === "" || password === "") {
      console.log("Ошибка: Все поля должны быть заполнены!");
      setError(true);
      return; 
    }

    const postData = {
      name: name,
      password: password,
      userName: userName
    };

    axios
      .post(`auth/signup`, postData, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
        }
      })
      .then((response) => {
        console.log("Данные успешно отправлены на сервер:", response.data);
        setName('')
        setPassword('')
        navigate("/login");
      })
      .catch((error) => {
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 2000);
        console.log(error, "Ошибка авторизации");
      });



   
  }
  return (
    <div className={styles.main}>
      <div className={styles.card}>
        <h1 className={styles.title}>Регистрация</h1>
        <form className={styles.form} onSubmit={onFormSubmit}>
          <div>
          <p className={styles.inputName}>Имя пользователя</p>
            <input style={error ? { borderColor: '#f89999' } : {}} value={userName} onChange={(e) => setUserName(e.target.value)} className={styles.input} type="text" placeholder="ФИО" />
            <p className={styles.inputName}>Логин</p>
            <input style={error ? { borderColor: '#f89999' } : {}} value={name} onChange={(e) => setName(e.target.value)} className={styles.input} type="text" placeholder="Придумайте логин" />
            <p className={styles.inputName}>Пароль</p>
            <input style={error ? { borderColor: '#f89999' } : {}} value={password} onChange={(e) => setPassword(e.target.value)} className={styles.input} type="password" placeholder="Придумайте пароль" />
          </div>
          <NavLink to={'/login'}>
            <div className={styles.reg}>Уже есть аккаунт?</div>

          </NavLink>
          <button type="submit" onClick={onFormSubmit} className={styles.btn}>Регистрация</button>
        </form>

      </div>

    </div>
  )
}

export default Auth