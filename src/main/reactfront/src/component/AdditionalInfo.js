import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AdditionalInfo() {
    const [nickname, setNickname] = useState('');
    const [birth, setBirth] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const parseEmail = params.get('email');

        if (parseEmail) {
            setEmail(parseEmail);
        } else {
            setError('로그인 정보가 없습니다. 다시 로그인해주세요.');
            navigate('/');
        }
    }, [navigate]);

    const calculateAge = (birthDate) => {
        const today = new Date();
        const birthDateObj = new Date(birthDate);
        let age = today.getFullYear() - birthDateObj.getFullYear();
        const monthDiff = today.getMonth() - birthDateObj.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
            age--;
        }

        return age;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (calculateAge(birth) < 19) {
            setError('19세 미만은 가입할 수 없습니다.');
            return;
        }

        const additionalInfo = {
            email,
            nickname,
            birth,
            phoneNumber
        };

        try {
            const response = await axios.post('/additional-info', additionalInfo, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true
            });

            if (response.status === 200) {
                navigate('/');
            } else {
                setError('정보 업데이트에 실패했습니다. 다시 시도해주세요.');
            }
        } catch (error) {
            console.error("정보 업데이트 중 오류 발생:", error);
            setError('정보 업데이트 중 오류가 발생했습니다. 다시 시도해주세요.');
        }
    };

    return (
        <div className="additional-info-page">
            <h2>추가 정보 입력</h2>
            <form onSubmit={handleSubmit}>
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
                    <label htmlFor="phoneNumber">전화번호:</label>
                    <input
                        type="tel"
                        id="phoneNumber"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                    />
                </div>
                {error && <p className="error">{error}</p>}
                <button type="submit">제출</button>
            </form>
        </div>
    );
}

export default AdditionalInfo;