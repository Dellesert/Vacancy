import styles from './style.module.css';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Auth() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState(false)
  function onFormSubmit(e) {
    e.preventDefault();
    const PostData = {name: name, password: password}
    axios
      .post(`auth/login`, PostData)
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          localStorage.setItem("token", JSON.stringify(res.data.access_token));
          axios.get(`auth/profile`, {
            headers: {
              Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
            }})
          .then((res) => {
            console.log(res.data)
            localStorage.setItem("user", JSON.stringify(res.data));
          })
          console.log(JSON.parse(localStorage.getItem('token')))
          localStorage.setItem("authenticated", "true");
          navigate("/");
        } else {
          setError(true);
          console.log(error, "Ошибка авторизации");
        }
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
        <h1 className={styles.title}>Вход</h1>
        <form className={styles.form} onSubmit={onFormSubmit}>
          <div>
            <p className={styles.inputName}>Логин</p>
            <input style={error ? { borderColor: '#f89999' } : {}} value={name} onChange={(e) => setName(e.target.value)} className={styles.input} type="text" placeholder="Ваш логин" />
            <p className={styles.inputName}>Пароль</p>
            <input style={error ? { borderColor: '#f89999' } : {}} value={password} onChange={(e) => setPassword(e.target.value)} className={styles.input} type="password" placeholder="Ваш пароль" />
          </div>
          <NavLink to={'/regpage'}>
            <div className={styles.reg}>Регистрация</div>

          </NavLink>
          <button type="submit" onClick={onFormSubmit} className={styles.btn}>Вход</button>
        </form>

      </div>

    </div>
  )
}

export default Auth