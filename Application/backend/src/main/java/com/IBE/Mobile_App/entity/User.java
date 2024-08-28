package com.IBE.Mobile_App.entity;

import com.vladmihalcea.hibernate.type.json.JsonType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;
import org.hibernate.annotations.TypeDefs;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "user")

@TypeDefs({
        @TypeDef(name = "json", typeClass = JsonType.class)
})

public class User {

    @Id
    @Column(name = "user_name",length = 100,nullable = false)
    private String userName;

    @Column(name = "user_id",length = 45)
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int userNumber;

    @Column(name = "user_gender",nullable = false)
    private String userGender;

    @Column(name = "user_nationality",nullable = false)
    private String userNationality;

    @Column(name = "user_date_of_birth", nullable = false,columnDefinition = "DATE")
    private LocalDate userBirthDay;

    @Column(name = "user_passport", nullable = false)
    private String userPassport;

    @Column(name = "user_country",nullable = false)
    private String userCountry;

    @Type(type = "json")
    @Column(name = "contact_numbers",columnDefinition = "json")
    private ArrayList<String> contactNumbers;

    @Column(name = "user_email",nullable = false)
    private String userEmail;

    @Column(name = "user_address",nullable = false)
    private String userAddress;

    @Column(name = "user_password",nullable = false)
    private String userPassword;

//    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
//    @JoinTable(name = "USER_ROLE",
//            joinColumns = {
//                    @JoinColumn(name = "USER_ID")
//            },
//            inverseJoinColumns = {
//                    @JoinColumn(name = "ROLE_ID")
//            })
    private String role;
}
