package com.IBE.Mobile_App.service.IMPL;

import com.IBE.Mobile_App.dto.FlightDTO;
import com.IBE.Mobile_App.entity.Flight;
import com.IBE.Mobile_App.repo.FlightRepo;
import com.IBE.Mobile_App.service.FlightService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service

public class FlightServiceIMPL implements FlightService {
    @Autowired
    private FlightRepo flightRepo;
    @Autowired
    private ModelMapper modelMapper;

    @Override
    public String addFlight(FlightDTO flightDTO) {
        Flight flight = modelMapper.map(flightDTO,Flight.class);
        if (!flightRepo.existsById(flight.getFlightId())){
            flightRepo.save(flight);
            return flight.getFlightId()+" is saved";
        }else {
            throw new RuntimeException("");
        }
    }

    @Override
    public List<FlightDTO> searchFlights(LocalDate departureDate, String arrival, String departure) {
        List<Flight> flights = flightRepo.findAllByDepartureDateEqualsAndArrivalAirportEqualsAndDepartureAirportEquals(departureDate,arrival,departure);
        if (!flights.isEmpty()){
            List<FlightDTO> flightDTOS = modelMapper.map(flights, new TypeToken<FlightDTO>(){}.getType());
            return flightDTOS;
        }else {
            throw new RuntimeException("No flights are found");
        }
    }
}
