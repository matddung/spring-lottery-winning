package com.studyjun.lottery.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UserDto {
    private String account;
    private String password;
    private String email;
    private String phoneNumber;
    private String nickname;
    private String birth;
    private String accessToken;
    private String refreshToken;
}
