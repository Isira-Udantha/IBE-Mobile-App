package com.IBE.Mobile_App.controller;

import com.IBE.Mobile_App.dto.UserDTO;
import com.IBE.Mobile_App.entity.User;
import com.IBE.Mobile_App.repo.UserRepo;
import com.IBE.Mobile_App.service.UserService;
import com.IBE.Mobile_App.util.StandardResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/api/v1/user")
@CrossOrigin
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserRepo userRepo;

//    @PostMapping(value = "/register")
//    public ResponseEntity<StandardResponse> registerUser(@RequestBody UserDTO userDTO){
//        String id = userService.addUser(userDTO);
//        return new ResponseEntity<StandardResponse>(
//                new StandardResponse(201,"user added successfully",id),
//                HttpStatus.CREATED
//        );
//    }

    @PostMapping(value = "/register")
    public ResponseEntity<StandardResponse> registerUser(@RequestBody User user){
        ResponseEntity<StandardResponse> response = null;
        try {
            String hashPassword = passwordEncoder.encode(user.getUserPassword());
            user.setUserPassword(hashPassword);
            User savedUser = userRepo.save(user);
            if (savedUser.getUserNumber()>0){
                return new ResponseEntity<StandardResponse>(
                new StandardResponse(201,"user added successfully",savedUser.getUserName()),
                HttpStatus.CREATED);
            }
        }catch (Exception ex){
                return new ResponseEntity<StandardResponse>(
                new StandardResponse(201,"Exception Occured",ex.getMessage()),
                HttpStatus.CREATED
        );
        }
        return response;
    }



    @GetMapping(
            value = "/search-user",
            params = "username"
            )
    public ResponseEntity<StandardResponse> searchUserById(@RequestParam(value = "username") String username){
        UserDTO userDTO = userService.getUserById(username);
        return new ResponseEntity<StandardResponse>(
                new StandardResponse(200,"Success",userDTO),
                HttpStatus.OK
        );
    }

}
