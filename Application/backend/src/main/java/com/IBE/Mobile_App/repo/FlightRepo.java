package com.IBE.Mobile_App.repo;

import com.IBE.Mobile_App.entity.Flight;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
@EnableJpaRepositories
public interface FlightRepo extends JpaRepository<Flight,Integer> {
    List<Flight> findAllByDepartureDateEqualsAndArrivalAirportEqualsAndDepartureAirportEquals(LocalDate departureDate, String arrival, String departure);
}
