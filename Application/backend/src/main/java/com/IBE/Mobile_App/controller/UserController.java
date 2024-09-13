package com.IBE.Mobile_App.controller;

import com.IBE.Mobile_App.dto.UserDTO;
import com.IBE.Mobile_App.entity.User;
import com.IBE.Mobile_App.repo.UserRepo;
import com.IBE.Mobile_App.service.UserService;
import com.IBE.Mobile_App.util.StandardResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping(value = "/api/v1/user")
@CrossOrigin
public class UserController {

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserRepo userRepo;

    @PostMapping(value = "/register")
    public ResponseEntity<StandardResponse> registerUser(@RequestBody User user){
    logger.info("START: registerUser {}",user);
        ResponseEntity<StandardResponse> response = null;
        try {
            if (!userRepo.existsById(user.getUserName())){
                String hashPassword = passwordEncoder.encode(user.getUserPassword());
                user.setUserPassword(hashPassword);
                User savedUser = userRepo.save(user);
                if (savedUser.getUserNumber()>0){
                    logger.info("END: registerUser {}", user);
                    return new ResponseEntity<StandardResponse>(
                      new StandardResponse(savedUser.getUserName()),
                    HttpStatus.CREATED);
                }
            }else {
                logger.error("User {} exist",user);
                return new ResponseEntity<StandardResponse>(
                        new StandardResponse("User exist"),
                        HttpStatus.BAD_REQUEST);
            }
        }catch (Exception ex){
                logger.error("Error exist");
                return new ResponseEntity<StandardResponse>(
                  new StandardResponse(ex.getMessage()),
                HttpStatus.BAD_REQUEST
        );
        }
        return response;
    }
//    @GetMapping(
//            value = "/search-user",
//            params = "username"
//            )
//    public ResponseEntity<StandardResponse> searchUserById(@RequestParam(value = "username") String username){
//        UserDTO userDTO = userService.getUserById(username);
//        return new ResponseEntity<StandardResponse>(
//                new StandardResponse(userDTO),
//                HttpStatus.OK
//        );
//    }
}
