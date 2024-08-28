package com.IBE.Mobile_App.controller;

import com.IBE.Mobile_App.dto.LoginRequest;
import com.IBE.Mobile_App.dto.LoginResponse;


import com.IBE.Mobile_App.service.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/login")
@CrossOrigin
public class LoginController {
    @Autowired
    private JwtService jwtService;
    //authentication == logging
    @PostMapping({"/authenticate"})
    public LoginResponse createJWTTokenAndLogin(@RequestBody LoginRequest loginRequest) throws Exception{
//        System.out.println(loginRequest);
        return jwtService.createJwtToken(loginRequest);
    }
}
