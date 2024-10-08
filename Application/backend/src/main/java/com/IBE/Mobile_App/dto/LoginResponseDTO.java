package com.IBE.Mobile_App.dto;

import com.IBE.Mobile_App.entity.User;


public class LoginResponseDTO {
    private User user;
    private  String jwtToken;

    public LoginResponseDTO(User user, String jwtToken) {
        this.user = user;
        this.jwtToken = jwtToken;
    }

    public LoginResponseDTO() {
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getJwtToken() {
        return jwtToken;
    }

    public void setJwtToken(String jwtToken) {
        this.jwtToken = jwtToken;
    }
}
