import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { StudyNameProvider } from './components/StudyNameContext';
import './App.css';
import Header from './components/Header';
import Home from './pages/HomePage/Home';
import Login from './pages/LoginPage/LoginModal';
import Redirection from './pages/LoginPage/Redirection';
import PrivateRoute from './pages/LoginPage/PrivateRoute';
import MyStudy from './pages/MyStudyPage/MyStudy';
import Study from './pages/StudyPage/Study';
import MyPage from './pages/MyPage/MyPage';
import { AuthProvider } from './components/AuthContext';

const App = () => {
    return (
        <AuthProvider>
            <StudyNameProvider>
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

                            {/* <Route path="/mystudy" element={<PrivateRoute component={MyStudy} />} />
                <Route path="/study/:studyPk" element={<PrivateRoute component={Study} />} />
                <Route path="/mypage" element={<PrivateRoute component={MyPage} />} /> 
                 */}
                        </Routes>
                    </div>
                </Router>
            </StudyNameProvider>
        </AuthProvider>
    );
};

export default App;
