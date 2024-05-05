import React from 'react';
import styles from './style.module.css';
import { NavLink } from 'react-router-dom';

function Sidebar() {
  return (
    <div>
       <div className={styles.sidebar}>
                <NavLink to="/profile" className={({ isActive }) => isActive ? styles.activeLink : styles.sidebarLink}>Обо мне</NavLink>
                <NavLink to="/favorites" className={({ isActive }) => isActive ? styles.activeLink : styles.sidebarLink}>Избранное</NavLink>
                <NavLink to="/myvacancy" className={({ isActive }) => isActive ? styles.activeLink : styles.sidebarLink}>Мои вакансии</NavLink>
                <NavLink to="/myresume" className={({ isActive }) => isActive ? styles.activeLink : styles.sidebarLink}>Мои резюме</NavLink>
                <NavLink to="/mycompany" className={({ isActive }) => isActive ? styles.activeLink : styles.sidebarLink}>Мои компании</NavLink>
            </div>
    </div>
  );
}

export default Sidebar;
