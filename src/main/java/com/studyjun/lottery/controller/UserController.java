package com.studyjun.lottery.controller;

import com.studyjun.lottery.dto.UserDto;
import com.studyjun.lottery.service.LoginService;
import com.studyjun.lottery.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    private final LoginService loginService;

    @PostMapping("/signUp")
    public String signUp(@RequestBody UserDto dto) throws Exception{
        userService.signUp(dto);
        return "회원가입 성공";
    }

    @PostMapping("/login")
    public String login(@RequestBody UserDto dto) throws Exception{
        loginService.loadUserByUsername(dto.getAccount());
        return "로그인 성공";
    }

    @PostMapping("/additional-info")
    public String updateAdditionalInfo(@RequestBody UserDto dto) throws Exception {
        userService.updateAdditionalInfo(dto);
        return "추가 정보 업데이트 성공";
    }
}