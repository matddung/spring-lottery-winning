package com.studyjun.lottery.controller;

import com.studyjun.lottery.service.ValidationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/validate")
public class ValidationController {
    @Autowired
    private ValidationService validationService;

    @GetMapping("/account")
    public ResponseEntity<?> checkAccount(@RequestParam String account) {
        if (validationService.isAccountExist(account)) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("이미 존재하는 아이디입니다.");
        }
        return ResponseEntity.ok().build();
    }

    @GetMapping("/nickname")
    public ResponseEntity<?> checkNickname(@RequestParam String nickname) {
        if (validationService.isNicknameExist(nickname)) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("이미 존재하는 닉네임입니다.");
        }
        return ResponseEntity.ok().build();
    }

    @GetMapping("/email")
    public ResponseEntity<?> checkEmail(@RequestParam String email) {
        if (validationService.isEmailExist(email)) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("이미 존재하는 이메일입니다.");
        }
        return ResponseEntity.ok().build();
    }

    @GetMapping("/phoneNumber")
    public ResponseEntity<?> checkPhoneNumber(@RequestParam String phoneNumber) {
        if (validationService.isPhoneNumberExist(phoneNumber)) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("이미 존재하는 전화번호입니다.");
        }
        return ResponseEntity.ok().build();
    }
}
