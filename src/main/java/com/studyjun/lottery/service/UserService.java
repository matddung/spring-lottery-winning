package com.studyjun.lottery.service;

import com.studyjun.lottery.dto.UserDto;
import com.studyjun.lottery.entity.User;
import com.studyjun.lottery.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder encoder;

    public void signUp(UserDto dto) throws Exception {
        if (userRepository.findByAccount(dto.getAccount()).isPresent()) {
            throw new Exception("이미 존재하는 아이디 입니다.");
        }

        if (userRepository.findByNickname(dto.getNickname()).isPresent()) {
            throw new Exception("이미 존재하는 닉네임 입니다.");
        }

        if (userRepository.findByEmail(dto.getEmail()).isPresent()) {
            throw new Exception("이미 존재하는 이메일 입니다.");
        }

        if (userRepository.findByPhoneNumber(dto.getPhoneNumber()).isPresent()) {
            throw new Exception("이미 존재하는 전화번호 입니다.");
        }

        User user = User.builder()
                .email(dto.getEmail())
                .account(dto.getAccount())
                .password(encoder.encode(dto.getPassword()))
                .nickname(dto.getNickname())
                .phoneNumber(dto.getPhoneNumber())
                .birth(dto.getBirth())
                .role("USER")
                .socialId("사이트 회원가입 유저")
                .socialType("사이트 회원가입 유저")
                .build();

        userRepository.save(user);
    }

    public void updateAdditionalInfo(UserDto dto) {
        User user = userRepository.findByEmail(dto.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("사용자가 없습니다. email=" + dto.getEmail()));

        user.setNickname(dto.getNickname());
        user.setBirth(dto.getBirth());
        user.setPhoneNumber(dto.getPhoneNumber());
        user.setRole("USER");

        userRepository.save(user);
    }
}