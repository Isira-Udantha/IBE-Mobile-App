package com.IBE.Mobile_App.service;

import com.IBE.Mobile_App.dto.FlightDTO;
import com.IBE.Mobile_App.dto.FlightSearchDTO;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;


public interface FlightService {
    String addFlight(FlightDTO flightDTO);

//    List<FlightDTO> searchFlights(LocalDate departureDate, String arrival, String departure);
List<FlightDTO> searchFlights(FlightSearchDTO flightSearchDTO);
}
