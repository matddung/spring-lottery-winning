package com.studyjun.lottery.security.oauth2;

import com.studyjun.lottery.entity.User;
import com.studyjun.lottery.security.oauth2.entity.GoogleOAuth2UserInfo;
import com.studyjun.lottery.security.oauth2.entity.KakaoOAuth2UserInfo;
import com.studyjun.lottery.security.oauth2.entity.NaverOAuth2UserInfo;
import com.studyjun.lottery.security.oauth2.entity.OAuth2UserInfo;
import lombok.Builder;
import lombok.Getter;

import java.util.Map;

@Getter
@Builder
public class OAuth2Attributes {
    private String nameAttributeKey;
    private String email;
    private String provider;
    private OAuth2UserInfo oAuth2UserInfo;
    private Map<String, Object> attributes;

    public static OAuth2Attributes of(String socialType,
                                     String userNameAttributeName, Map<String, Object> attributes) {

        if (socialType.equals("naver")) {
            return ofNaver(userNameAttributeName, attributes);
        }
        if (socialType.equals("kakao")) {
            return ofKakao(userNameAttributeName, attributes);
        }
        return ofGoogle(userNameAttributeName, attributes);
    }

    private static OAuth2Attributes ofKakao(String userNameAttributeName, Map<String, Object> attributes) {
        Map<String, Object> kakaoAccount = (Map<String, Object>) attributes.get("kakao_account");
        Map<String, Object> kakaoProfile = (Map<String, Object>) kakaoAccount.get("profile");

        return OAuth2Attributes.builder()
                .email((String) kakaoAccount.get("email"))
                .nameAttributeKey(userNameAttributeName)
                .oAuth2UserInfo(new KakaoOAuth2UserInfo(attributes))
                .build();
    }

    public static OAuth2Attributes ofGoogle(String userNameAttributeName, Map<String, Object> attributes) {
        return OAuth2Attributes.builder()
                .email((String) attributes.get("email"))
                .nameAttributeKey(userNameAttributeName)
                .oAuth2UserInfo(new GoogleOAuth2UserInfo(attributes))
                .build();
    }

    public static OAuth2Attributes ofNaver(String userNameAttributeName, Map<String, Object> attributes) {
        Map<String, Object> response = (Map<String, Object>) attributes.get("response");

        return OAuth2Attributes.builder()
                .email((String) response.get("email"))
                .nameAttributeKey(userNameAttributeName)
                .oAuth2UserInfo(new NaverOAuth2UserInfo(attributes))
                .build();
    }

    public User toEntity(String socialType, OAuth2UserInfo oauth2UserInfo) {
        return User.builder()
                .socialType(socialType)
                .socialId(oauth2UserInfo.getId())
                .email(email)
                .nickname(oauth2UserInfo.getNickname())
                .role("GUEST")
                .build();
    }
}
