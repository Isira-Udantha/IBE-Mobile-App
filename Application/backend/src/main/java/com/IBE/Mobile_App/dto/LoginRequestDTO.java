package com.IBE.Mobile_App.dto;

public class LoginRequestDTO {
    private String userName;
    private String userPassword;

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getUserPassword() {
        return userPassword;
    }

    public void setUserPassword(String userPassword) {
        this.userPassword = userPassword;
    }

    public LoginRequestDTO(String userName, String userPassword) {
        this.userName = userName;
        this.userPassword = userPassword;
    }

    public LoginRequestDTO() {
    }
}
