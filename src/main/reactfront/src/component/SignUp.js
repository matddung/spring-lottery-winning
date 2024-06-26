import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { debounce } from 'lodash';

function SignUp() {
    const [formData, setFormData] = useState({
        account: '',
        password: '',
        confirmPassword: '',
        nickname: '',
        birth: '',
        email: '',
        phoneNumber: ''
    });

    const [errors, setErrors] = useState({
        account: '',
        nickname: '',
        email: '',
        phoneNumber: '',
        general: ''
    });

    const navigate = useNavigate();

    const validateField = useCallback(
        debounce(async (field, value) => {
            try {
                console.log(`Validating ${field} with value ${value}`);
                const response = await axios.get(`/api/validate/${field}`, {
                    params: {
                        [field]: value,
                    },
                });
                console.log(`${field} is valid`);
                setErrors(errors => ({ ...errors, [field]: '' }));
                return true;
            } catch (error) {
                if (error.response && error.response.status === 409) {
                    setErrors(errors => ({ ...errors, [field]: `⚠️ ${error.response.data}` }));
                    console.log(`${field} validation error: ${error.response.data}`);
                } else {
                    setErrors(errors => ({ ...errors, [field]: '⚠️ 검증 중 오류가 발생했습니다.' }));
                    console.log(`${field} validation error: 검증 중 오류가 발생했습니다.`);
                }
                return false;
            }
        }, 150),
        []
    );

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(formData => ({ ...formData, [name]: value }));

        if (['account', 'nickname', 'email', 'phoneNumber'].includes(name)) {
            validateField(name, value);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const { password, confirmPassword, birth } = formData;

        if (password !== confirmPassword) {
            setErrors(errors => ({ ...errors, general: '⚠️ 비밀번호가 일치하지 않습니다.' }));
            return;
        }

        const today = new Date();
        const birthYear = new Date(birth).getFullYear();
        const currentYear = today.getFullYear();
        const age = currentYear - birthYear;

        if (age < 19) {
            setErrors(errors => ({ ...errors, general: '⚠️ 만 19세 이상만 회원가입이 가능합니다.' }));
            return;
        }

        const isAccountValid = await validateField('account', formData.account);
        const isNicknameValid = await validateField('nickname', formData.nickname);
        const isEmailValid = await validateField('email', formData.email);
        const isPhoneNumberValid = await validateField('phoneNumber', formData.phoneNumber);

        if (!isAccountValid || !isNicknameValid || !isEmailValid || !isPhoneNumberValid) {
            return;
        }

        try {
            const response = await axios.post('/signUp', formData);
            console.log('Response:', response);
            if (response.status === 200) {
                navigate('/');
            } else {
                setErrors(errors => ({ ...errors, general: '⚠️ 회원가입에 실패했습니다. 다시 시도해주세요.' }));
            }
        } catch (error) {
            console.log('Error during signUp:', error);
            if (error.response && error.response.data) {
                setErrors(errors => ({ ...errors, general: `⚠️ ${error.response.data}` }));
            } else {
                setErrors(errors => ({ ...errors, general: '⚠️ 회원가입 중 오류가 발생했습니다. 다시 시도해주세요.' }));
            }
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
                        name="account"
                        value={formData.account}
                        onChange={handleChange}
                        required
                    />
                    {errors.account && <p className="error">{errors.account}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="password">비밀번호:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">비밀번호 확인:</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="nickname">닉네임:</label>
                    <input
                        type="text"
                        id="nickname"
                        name="nickname"
                        value={formData.nickname}
                        onChange={handleChange}
                        required
                    />
                    {errors.nickname && <p className="error">{errors.nickname}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="birth">생년월일:</label>
                    <input
                        type="date"
                        id="birth"
                        name="birth"
                        value={formData.birth}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">이메일:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    {errors.email && <p className="error">{errors.email}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="phoneNumber">전화번호:</label>
                    <input
                        type="tel"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        required
                    />
                    {errors.phoneNumber && <p className="error">{errors.phoneNumber}</p>}
                </div>
                {errors.general && <p className="error">{errors.general}</p>}
                <button type="submit" className="signup-button">회원가입</button>
            </form>
        </div>
    );
}

export default SignUp;