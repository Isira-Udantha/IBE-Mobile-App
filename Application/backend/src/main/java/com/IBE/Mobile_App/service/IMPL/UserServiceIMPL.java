package com.IBE.Mobile_App.service.IMPL;

import com.IBE.Mobile_App.dto.UserDTO;
import com.IBE.Mobile_App.entity.User;
import com.IBE.Mobile_App.repo.UserRepo;
import com.IBE.Mobile_App.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceIMPL implements UserService {
    @Autowired
    private UserRepo userRepo;
    @Autowired
    private ModelMapper modelMapper;
    @Override
    public String addUser(UserDTO userDTO) {
        User user = modelMapper.map(userDTO, User.class);
        if (!userRepo.existsById(user.getUserName())){
            userRepo.save(user);
            return user.getUserName() + " is saved";
        }else {
            throw new RuntimeException("Already Saved");
        }

    }

    @Override
    public UserDTO getUserById(String username) {
        User user = userRepo.getReferenceById(username);
        if (userRepo.existsById(user.getUserName())) {
            UserDTO userDTO = modelMapper.map(user, UserDTO.class);
            return userDTO;
        }else {
            throw new RuntimeException("No customer from that id");
        }
    }
}
