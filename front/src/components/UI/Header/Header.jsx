
import { Outlet, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import styles from "./style.module.css";
import { useState } from 'react';

function Header({ ButtonText }) {
    const navButtons = [
        { name: 'Главная', active: true, link: '/' },
        { name: 'Вакансии', active: false, link: '/Vacancy' },
        { name: 'Резюме', active: false, link: '/Resume' },
        { name: 'Компании', active: false, link: '/Company' }

    ]

    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const user = JSON.parse(localStorage.getItem('user'));


    return (


        <div>
            <Outlet />
            <div className={styles.header}>
                <div className={styles.navButtons}>
                    {
                        navButtons.map((navButton) => (
                            <NavLink className={({ isActive }) =>
                                isActive ? styles.active : undefined
                            }
                                key={navButton.link} to={navButton.link}>
                                <button className={styles.navButton}>
                                    <span className={styles.navText}>{navButton.name}</span>
                                </button>
                            </NavLink>
                        ))
                    }
                    <div className={styles.createButtons} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <button className={styles.createButton}>Создать</button>
            {isHovered && (
                <div className={styles.dropdown}>
                    <NavLink to={'/resume/create'}>
                        <button className={styles.createButton}>Создать резюме</button>
                    </NavLink>
                    <NavLink to={'/vacancy/create'}>
                        <button className={styles.createButton}>Создать вакансию</button>
                    </NavLink>
                    <NavLink to={'/company/create'}>
                        <button className={styles.createButton}>Создать компанию</button>
                    </NavLink>
                </div>
            )}
        </div>

                    <NavLink to={'/profile'}>
                    <FontAwesomeIcon className={styles.profile} icon={faUser} /> 
                    </NavLink>
                </div>
            </div>


        </div>
    )
}

export default Header