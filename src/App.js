import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/HomePage/Home';
import Login from './pages/LoginPage/Login';
import Redirection from "./pages/LoginPage/Redirection";
import MyStudy from "./pages/MyStudyPage/MyStudy";
import MyPage from './pages/MyPage/MyPage';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/redirection/:accessToken/:refreshToken" element={<Redirection />} />
                <Route path="/mystudy" element={<MyStudy />} />
                <Route path="/mypage" element={<MyPage />} />
            </Routes>
        </Router>
    );
};

export default App;