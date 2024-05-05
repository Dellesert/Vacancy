import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import styles from './style.module.css';
import Sidebar from "../../UI/Sidebar/Sidebar";
import axios from "axios";

const Profile = () => {
    const token = JSON.parse(localStorage.getItem('token'));
    const navigate = useNavigate();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    const [applicant, setApplicant] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editedApplicant, setEditedApplicant] = useState({});

    useEffect(() => {
        axios
            .get(`/users/${user.id}`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                }
              })
            .then((res) => {
                const data = res.data;
                if (Array.isArray(data)) {
                    setApplicant(data);
                } else if (typeof data === 'object') {
                    setApplicant([data]);
                } else {
                    setApplicant([]);
                }
                console.log(applicant)
            })
            .catch((error) => console.log(error));
    }, [user]);

    function logOut() {
        localStorage.removeItem('authenticated');
        localStorage.removeItem('token');
        setUser('');
        navigate("/Login");
    }

    const toggleEdit = () => {
        setIsEditing(!isEditing);
    }

    const handleInputChange = (e, key) => {
        // Создаем копию измененного applicant и обновляем состояние
        const updatedApplicant = { ...editedApplicant, [key]: e.target.value };
        setEditedApplicant(updatedApplicant);
    }

    const saveChanges = () => {
        // Проверяем, пустой ли массив applicant
        const isEmptyArray = applicant.length === 0;
    
        // Формируем данные для отправки на сервер
        const postData = {};
    
        // Добавляем все поля editedApplicant в postData
        postData.firstname = editedApplicant.firstname || '';
        postData.lastname = editedApplicant.lastname || '';
        postData.secondname = editedApplicant.secondname || '';
        postData.phone = editedApplicant.phone || '';
        postData.userId = user.id;
    
        if (isEmptyArray) {
            // Если массив пустой, отправляем POST запрос
            axios
                .post(`/applicant`, postData)
                .then((response) => {
                    console.log("Данные успешно добавлены на сервер:", response.data);
                    setIsEditing(false); // Выключаем режим редактирования после сохранения изменений
                })
                .catch((error) => console.log(error));
        } else {
            // Если массив не пустой, отправляем PATCH запрос
            const id = applicant[0].id; // Получаем id первого аппликанта в массиве
            console.log(postData)
            axios
                .patch(`/applicant/${id}`, postData)
                .then((response) => {
                    console.log("Данные успешно обновлены на сервере:", response.data);
                    setIsEditing(false); // Выключаем режим редактирования после сохранения изменений
                })
                .catch((error) => console.log(error));
        }
    }
    

    return (
        <div className={styles.main}>
            <Sidebar />
            <div className={styles.main}>
            <div className={styles.cards}>
                <div className={styles.card}>
                    <div className={styles.icons}>
                        <div><FontAwesomeIcon className={styles.icon} icon={faPenToSquare} /> </div>
                        <div> <FontAwesomeIcon className={styles.icon} onClick={logOut} icon={faRightFromBracket} /></div>


                    </div>
                    <div className={styles.content}>
    {applicant.map((item) => (
        <div key={item.id}> {/* Добавляем ключ для каждого элемента */}
            <div className={styles.title}>
                id: {item.id}
            </div>
            <div className={styles.title}>
                Имя: {item.userName}
            </div>
            <div className={styles.title}>
                Имя пользователя: {item.name} {/* Заменяем applicant.name на item.name */}
            </div>
            <div className={styles.description}>
                Роль: {item.isAdmin ? 'Администратор' : 'Пользователь'} {/* Заменяем applicant на item */}
            </div>
        </div>
    ))}
</div>


                </div>

            </div>

        </div>
        </div>
    );
}

export default Profile;
