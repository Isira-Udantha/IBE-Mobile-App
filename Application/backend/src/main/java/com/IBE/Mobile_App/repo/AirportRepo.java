package com.IBE.Mobile_App.repo;

import com.IBE.Mobile_App.entity.Airport;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AirportRepo extends JpaRepository <Airport, String> {

}
