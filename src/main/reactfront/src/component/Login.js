import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Login.css';
import warningImage from '../A_warning_sign_indicating_No_access_for_minors_un.png'

function Login({ login }) {
    const [account, setAccount] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('email');
    }, []);

    React.useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const email = params.get('email');
    
        if (email) {
          localStorage.setItem('email', email);
        }
      }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const userDto = { account, password }

        try {
            const response = await axios.post('/login', userDto, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });

            if (response.status === 200) {
                const accessToken = response.headers['authorization'];
                const refreshToken = response.headers['refresh'];

                if (accessToken && refreshToken) {
                    localStorage.setItem('accessToken', accessToken);
                    localStorage.setItem('refreshToken', refreshToken);
                    login();
                    navigate('/main');
                } else {
                    setError('서버 응답에 토큰이 포함되어 있지 않습니다.');
                }
            } else {
                setError('로그인에 실패했습니다. 다시 시도해주세요.');
            }
        } catch (error) {
            setError('로그인 중 오류가 발생했습니다. 다시 시도해주세요.');
        }
    };

    const handleSocialLogin = (provider) => {
        window.location.href = `http://localhost:8080/oauth2/authorization/${provider}`;
    };

    return (
        <div className="login-page">
            <div className="header">
                <h1>로또 번호 추천 페이지</h1>
            </div>
            <div className="content">
                <div className="warning">
                    <img src={warningImage} alt="19세 미만 경고" className="warning-image" />
                    <p>이 정보내용은 청소년유해매체물로서 정보통신망 이용촉진 및 정보보호 등에 관한 법률 및 청소년 보호법에 따라 19세 미만의 청소년이 이용할 수 없습니다.</p>
                </div>
                <form onSubmit={handleSubmit} className="login-form">
                    <h2>로그인</h2>
                    <div className="form-group">
                        <label htmlFor="account">아이디:</label>
                        <input
                            type="text"
                            id="account"
                            value={account}
                            onChange={(e) => setAccount(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">비밀번호:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <p className="error"><span className="error-icon">⚠️</span> {error}</p>}
                    <button type="submit" className="login-button">로그인</button>
                    <p>계정이 없으신가요? <Link to="/signUp" className="signup-link">회원가입</Link></p>
                    <div className="social-login">
                        <button type="button" className="social-button google" onClick={() => handleSocialLogin('google')}>구글로 로그인</button>
                        <button type="button" className="social-button kakao" onClick={() => handleSocialLogin('kakao')}>카카오톡으로 로그인</button>
                        <button type="button" className="social-button naver" onClick={() => handleSocialLogin('naver')}>네이버로 로그인</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;