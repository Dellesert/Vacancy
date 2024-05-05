import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';
import MainPage from './components/MainPage';
import Vacancy from './components/Views/Vacancy/Vacancy';
import Auth from './components/Views/Auth/Auth';
import RegPage from './components/Views/RegPage/RegPage';
import Main from './components/Views/main/main';
import Resume from './components/Views/Resume/Resume';
import Profile from './components/Views/Profile/Profile';
import VacancyCard from './components/Views/Vacancy/VacanyCard';
import ResumeCard from './components/Views/Resume/ResumeCard';
import Createvacancy from './components/Views/createvacancy/Createvacancy';
import Createresume from './components/Views/createresume/Createresume';
import Company from './components/Views/Company/Company';
import CompanyCard from './components/Views/Company/CompanyCard';
import Createcompany from './components/Views/CreateCompany/CreateCompany'
import Favorite from './components/Views/Favorite/Favorite';
import Response from './components/Views/Me/MyVacancy/MyVacancy';
import MyVacancy from './components/Views/Me/MyVacancy/MyVacancy';
import VacancyResponse from './components/Views/Vacancy/VacancyResponse';
import VacancyInvitation from './components/Views/Vacancy/VacancyInvitation';
import MyResume from './components/Views/Me/MyResume/MyResume';
import MyCompany from './components/Views/Me/MyCompany/MyCompany';



function App() {
  return (
    <div>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} >
          <Route index element={<Main />} />
            <Route path="/vacancy" element={<Vacancy />} />
            <Route path="/vacancy/create" element={<Createvacancy />} />
            <Route path="/vacancy/:id" element={<VacancyCard />} />
            <Route path="/vacancy/responses/:id" element={<VacancyResponse />} />
            <Route path="/vacancy/invitation/:id" element={<VacancyInvitation />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/resume/create" element={<Createresume />} />
            <Route path="/resume/:id" element={<ResumeCard />} />
            <Route path="/company" element={<Company />} />
            <Route path="/company/create" element={<Createcompany />} />
            <Route path="/company/:id" element={<CompanyCard />} />
            <Route path="/profile/" element={<Profile />} />
            <Route path="/favorites/" element={<Favorite />} />
            <Route path="/myvacancy/" element={<MyVacancy />} />
            <Route path="/myresume/" element={<MyResume />} />
            <Route path="/mycompany/" element={<MyCompany />} />
          </Route>
          <Route path="login" element={<Auth />} />
          <Route path="regpage" element={<RegPage />} />
        </Routes>
      </BrowserRouter>


    </div>

  );
}

export default App;
