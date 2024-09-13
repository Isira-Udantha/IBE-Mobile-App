package com.IBE.Mobile_App.controller;

import com.IBE.Mobile_App.dto.LoginRequestDTO;
import com.IBE.Mobile_App.dto.LoginResponseDTO;


import com.IBE.Mobile_App.service.JwtService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/login")
@CrossOrigin
public class LoginController {



    @Autowired
    private JwtService jwtService;

    @PostMapping({"/authenticate"})
    public LoginResponseDTO createJWTTokenAndLogin(@RequestBody LoginRequestDTO loginRequestDTO) throws Exception{

        return jwtService.createJwtToken(loginRequestDTO);
    }
}
