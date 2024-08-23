package com.IBE.Mobile_App.config;

import com.IBE.Mobile_App.entity.User;
import com.IBE.Mobile_App.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.ArrayList;
import java.util.List;

@Configuration
public class UsernamePasswordAuthenticationProvider implements AuthenticationProvider {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;
    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        String username = authentication.getName();
        String pwd = authentication.getCredentials().toString();
//        Object credentials = authentication.getCredentials();
//        if (credentials == null) {
//            throw new BadCredentialsException("Credentials cannot be null");
//        }
//        String pwd = credentials.toString();

        List<User> users = userRepo.findByUserEmail(username);

        if (!users.isEmpty()){
            if (passwordEncoder.matches(pwd,users.get(0).getUserPassword())){
                return new UsernamePasswordAuthenticationToken(username,pwd);
            }else {
                throw new BadCredentialsException("Invalid Password");
            }
        }else {
            throw new BadCredentialsException("No user registered with this details");
        }
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return UsernamePasswordAuthenticationToken.class.isAssignableFrom(authentication);
    }
}
