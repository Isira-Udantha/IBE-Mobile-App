package com.IBE.Mobile_App.service;

import com.IBE.Mobile_App.dto.LoginRequest;
import com.IBE.Mobile_App.dto.LoginResponse;
import com.IBE.Mobile_App.entity.User;
import com.IBE.Mobile_App.repo.UserRepo;
import com.IBE.Mobile_App.util.JwtUtil;

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
    @Autowired
    private UserRepo userRepo;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepo.findById(username).get();
        if (user != null){
            return new org.springframework.security.core.userdetails.User(
                    user.getUserName(),
                    user.getUserPassword(),
                    getAuthority(user)
            );

        }else {
            throw new UsernameNotFoundException("User not found with username: "+username);
        }
    }

    private Set<SimpleGrantedAuthority> getAuthority(User user){
        Set<SimpleGrantedAuthority> authorities = new HashSet<>();
//        for(Role role:user.getRole()){
//            authorities.add(new SimpleGrantedAuthority("ROLE_"+role.getRoleName()));
//        }
        authorities.add(new SimpleGrantedAuthority("ROLE_"+user.getRole()));
//        user.getRole().forEach(role -> {
//            authorities.add(new SimpleGrantedAuthority("ROLE_"+ role.getRoleName()));
//        });
        return authorities;
    }

    public LoginResponse createJwtToken(LoginRequest loginRequest) throws Exception{
        String userName = loginRequest.getUserName();
        String userPassword = loginRequest.getUserPassword();

        authenticate(userName,userPassword);
        UserDetails userDetails = loadUserByUsername(userName);
        String newGeneratedToken = jwtUtil.generateToken(userDetails);
        User user = userRepo.findById(userName).get();

        LoginResponse loginResponse = new LoginResponse(
                user,
                newGeneratedToken
        );
        return loginResponse;
    }

    private void authenticate(String userName, String userPassword) throws Exception{
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(userName,userPassword));
        }catch (BadCredentialsException e){
            throw new Exception("INVALID_CREDENTIALS", e);
        }
    }
}
