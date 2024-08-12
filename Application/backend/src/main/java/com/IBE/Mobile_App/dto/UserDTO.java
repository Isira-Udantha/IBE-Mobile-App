package com.IBE.Mobile_App.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserDTO {
    private int userId;
    private String userName;
    private String userGender;
    private String userNationality;
    private LocalDate userBirthDay;
    private String userPassport;
    private String userCountry;
    private ArrayList<String> contactNumbers;
    private String userEmail;
    private String userAddress;
    private String userPassword;
}
