import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import styles from './style.module.css';
import { NavLink } from 'react-router-dom';

function Card({ id, position, salary, body, footer, button, page, toggleFavorite, isFavorite, isActiveFavorite, HandleClick, isResponse, buttonVisible }) {
  return (
    <div className={styles.cards}>
      <div className={styles.card}>
        <div className={styles.content}>
          <div className={styles.title}>
            <NavLink to={`/${page}/${id}`}>{position}</NavLink>
            {isActiveFavorite
            ? <FontAwesomeIcon
            className={isFavorite ? styles.activeIcon : styles.icon}
            icon={faBookmark}
            onClick={() => toggleFavorite(id)}
          ></FontAwesomeIcon>
            : <div></div>
            }
            
            
          </div>
          <div className={styles.salary}>{salary ? salary.toLocaleString('ru-RU')+' руб.' : ''}</div>
          <div className={styles.description}>{body}</div>
          <div className={styles.company}>{footer.title}</div>
          <div>
            {buttonVisible ? <button className={isResponse ? styles.button : styles.ActiveButton} onClick={() => HandleClick(id)}>{button}</button> : ''}
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
