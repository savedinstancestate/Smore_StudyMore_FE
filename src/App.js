import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/HomePage/Home';
import Login from './pages/LoginPage/Login';
import Redirection from "./pages/LoginPage/Redirection";
import MyStudy from "./pages/MyStudyPage/MyStudy";
import Study from "./pages/StudyPage/Study";
import MyPage from './pages/MyPage/MyPage';

const App = () => {
    return (
        <Router>
            <div>
        <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/redirection/:accessToken/:refreshToken" element={<Redirection />} />
                <Route path="/mystudy" element={<MyStudy />} />
                <Route path="/study/:studyPk" element={<Study />} />
                <Route path="/mypage" element={<MyPage />} />
            </Routes>
            </div>
        </Router>
    );
};

export default App;