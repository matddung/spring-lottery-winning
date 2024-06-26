package com.studyjun.lottery.service;

import com.studyjun.lottery.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ValidationService {
    @Autowired
    private UserRepository userRepository;

    public boolean isAccountExist(String account) {
        return userRepository.findByAccount(account).isPresent();
    }

    public boolean isNicknameExist(String nickname) {
        return userRepository.findByNickname(nickname).isPresent();
    }

    public boolean isEmailExist(String email) {
        return userRepository.findByEmail(email).isPresent();
    }

    public boolean isPhoneNumberExist(String phoneNumber) {
        return userRepository.findByPhoneNumber(phoneNumber).isPresent();
    }
}