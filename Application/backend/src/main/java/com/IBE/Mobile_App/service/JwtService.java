package com.IBE.Mobile_App.service;

import com.IBE.Mobile_App.controller.FlightController;
import com.IBE.Mobile_App.dto.LoginRequestDTO;
import com.IBE.Mobile_App.dto.LoginResponseDTO;
import com.IBE.Mobile_App.entity.User;
import com.IBE.Mobile_App.repo.UserRepo;
import com.IBE.Mobile_App.util.JwtUtil;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class JwtService implements UserDetailsService {

    private static final Logger logger = LoggerFactory.getLogger(JwtService.class);

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        logger.info("START: loadUserByUsername {}",username);
        User user = userRepo.findById(username).get();
        if (user != null){
            logger.info("END: loadUserByUsername");
            return new org.springframework.security.core.userdetails.User(
                    user.getUserName(),
                    user.getUserPassword(),
                    getAuthority(user)
            );

        }else {
            logger.error("User not found with {} username",username);
            throw new UsernameNotFoundException("User not found with username: "+username);
        }
    }

    private Set<SimpleGrantedAuthority> getAuthority(User user){
        Set<SimpleGrantedAuthority> authorities = new HashSet<>();
        authorities.add(new SimpleGrantedAuthority("ROLE_"+user.getRole()));
        return authorities;
    }

    public LoginResponseDTO createJwtToken(LoginRequestDTO loginRequestDTO) throws Exception{
        logger.info("START: createJwtToken {}",loginRequestDTO);

        String userName = loginRequestDTO.getUserName();
        String userPassword = loginRequestDTO.getUserPassword();

        authenticate(userName,userPassword);

        UserDetails userDetails = loadUserByUsername(userName);
        String newGeneratedToken = jwtUtil.generateToken(userDetails);
        logger.info("START: findById {}",userName);
        User user = userRepo.findById(userName).get();
        logger.info("END: findById");

        LoginResponseDTO loginResponseDTO = new LoginResponseDTO(
                user,
                newGeneratedToken
        );
        logger.info("END: createJwtToken");
        return loginResponseDTO;
    }

    private void authenticate(String userName, String userPassword) throws Exception{
        try {
            logger.info("START: authenticate");
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(userName,userPassword));
            logger.info("END: authenticate");
        }catch (BadCredentialsException e){
            logger.error("Invalid Credentials");
            throw new Exception("INVALID_CREDENTIALS", e);
        }
    }
}
