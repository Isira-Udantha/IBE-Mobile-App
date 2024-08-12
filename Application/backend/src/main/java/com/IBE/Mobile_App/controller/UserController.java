package com.IBE.Mobile_App.controller;

import com.IBE.Mobile_App.dto.UserDTO;
import com.IBE.Mobile_App.service.UserService;
import com.IBE.Mobile_App.util.StandardResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/api/v1/user")
@CrossOrigin
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping(value = "/save")
    public ResponseEntity<StandardResponse> saveUser(@RequestBody UserDTO userDTO){
        System.out.println(userDTO);
        String id = userService.addUser(userDTO);
        return new ResponseEntity<StandardResponse>(
                new StandardResponse(201,"user added successfully",id),
                HttpStatus.CREATED
        );
    }

}
