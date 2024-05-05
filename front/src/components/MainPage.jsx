
import { useEffect, useState } from 'react';
import Header from '../components/UI/Header/Header';
import { Navigate, useLocation } from 'react-router-dom';


const MainPage = () => {
    const [currentPage, setCurrentPage] = useState('');

    const location = useLocation();
    useEffect(() => {
    const path = location.pathname
    setCurrentPage(path.includes('Resume') ? 'Создать вакансию' : 'Создать резюме');
    }, [location.pathname]);

    const authenticated = JSON.parse(localStorage.getItem("authenticated"))

    if (!authenticated) {
        return <Navigate replace to="/Login" />;
    } else {
    
        return (
            <div>
                <Header ButtonText={currentPage}></Header>
            </div>
        );
}}

export default MainPage;