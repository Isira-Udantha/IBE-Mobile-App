package com.IBE.Mobile_App.repo;

import com.IBE.Mobile_App.entity.Flight;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
@EnableJpaRepositories
public interface FlightRepo extends JpaRepository<Flight,Integer> {

    @Query("SELECT f FROM Flight f WHERE f.departureDate = :departureDate AND f.arrivalAirport = :arrival AND f.departureAirport = :departure")
    List<Flight> findFlights(@Param("departureDate") LocalDate departureDate,
                             @Param("arrival") String arrival,
                             @Param("departure") String departure);
//    List<Flight> findAllByDepartureDateEqualsAndArrivalAirportEqualsAndDepartureAirportEquals(LocalDate departureDate, String arrival, String departure);
}
