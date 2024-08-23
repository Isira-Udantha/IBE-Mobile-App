package com.IBE.Mobile_App.repo;

import com.IBE.Mobile_App.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@EnableJpaRepositories
public interface UserRepo extends JpaRepository<User,Integer> {

    List<User> findByUserEmail(String username);
}
