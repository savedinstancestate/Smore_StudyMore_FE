import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Home from './pages/HomePage/Home';
import Login from './pages/LoginPage/LoginModal';
import Redirection from "./pages/LoginPage/Redirection";
import PrivateRoute from './pages/LoginPage/PrivateRoute';
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
                
                {/* 인증(로그인) 필요한 페이지 접근 설정
                <Route path="/mystudy" element={<PrivateRoute component={MyStudy} />} />
                <Route path="/study/:studyPk" element={<PrivateRoute component={Study} />} />
                <Route path="/mypage" element={<PrivateRoute component={MyPage} />} /> 
                */}
            </Routes>
            </div>
        </Router>
    );
};

export default App;