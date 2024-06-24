import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function SignUp() {
    const [account, setAccount] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [nickname, setNickname] = useState('');
    const [birth, setBirth] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            setError('비밀번호가 일치하지 않습니다.');
            return;
        }

        const today = new Date();
        const birthYear = new Date(birth).getFullYear();
        const currentYear = today.getFullYear();
        const age = currentYear - birthYear;

        if (age < 19) {
            setError('만 19세 이상만 회원가입이 가능합니다.');
            return;
        }

        const userDto = {
            account,
            password,
            nickname,
            birth,
            email,
            phoneNumber
        };

        try {
            // 서버에 회원가입 데이터 전송
            const response = await axios.post('/signUp', userDto);
            if (response.status === 200) {
                    navigate('/');
            } else {
                // 회원가입 실패 시 처리 로직
                setError('회원가입에 실패했습니다. 다시 시도해주세요.');
            }
        } catch (error) {
            // 에러 처리 로직
            setError('회원가입 중 오류가 발생했습니다. 다시 시도해주세요.');
        }
    };

    return (
        <div className="signup-container">
            <form onSubmit={handleSubmit} className="signup-form">
                <h2>회원가입</h2>
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
                <div className="form-group">
                    <label htmlFor="confirmPassword">비밀번호 확인:</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="nickname">닉네임:</label>
                    <input
                        type="text"
                        id="nickname"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                        required
                    />
                </div>
                {error && <p className="error"><span className="error-icon">⚠️</span> {error}</p>}
                <div className="form-group">
                    <label htmlFor="birth">생년월일:</label>
                    <input
                        type="date"
                        id="birth"
                        value={birth}
                        onChange={(e) => setBirth(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">이메일:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="phoneNumber">전화번호:</label>
                    <input
                        type="tel"
                        id="phoneNumber"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="signup-button">회원가입</button>
            </form>
        </div>
    );
}

export default SignUp;