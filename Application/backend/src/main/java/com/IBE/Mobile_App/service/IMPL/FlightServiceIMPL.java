package com.IBE.Mobile_App.service.IMPL;

import com.IBE.Mobile_App.controller.FlightController;
import com.IBE.Mobile_App.dto.FlightDTO;
import com.IBE.Mobile_App.dto.FlightSearchDTO;
import com.IBE.Mobile_App.entity.Flight;
import com.IBE.Mobile_App.exception.NotFoundException;
import com.IBE.Mobile_App.repo.FlightRepo;
import com.IBE.Mobile_App.service.FlightService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service

public class FlightServiceIMPL implements FlightService {

    private static final Logger logger = LoggerFactory.getLogger(FlightServiceIMPL.class);

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
//    public List<FlightDTO> searchFlights(LocalDate departureDate, String arrival, String departure)
    public List<FlightDTO> searchFlights(FlightSearchDTO flightSearchDTO)
    {
        logger.info("START: searchFlights {}",flightSearchDTO);

        LocalDate departureDate = flightSearchDTO.getDepartureDate();
        String arrival = flightSearchDTO.getArrivalAirport();
        String departure = flightSearchDTO.getDepartureAirport();

        logger.info("START: findFlights {} {} {}",departureDate,arrival,departure);
        List<Flight> flights = flightRepo.findFlights(departureDate,arrival,departure);
        logger.info("END: findFlights {}{}{}",departureDate,arrival,departure);
        if (!flights.isEmpty()){
            List<FlightDTO> flightDTOS = modelMapper.map(flights, new TypeToken<List<FlightDTO>>(){}.getType());
            logger.info("END: searchFlights {}",flightSearchDTO);
            return flightDTOS;
        }else {
            logger.error("No Fligts Found related to the input data");
            throw new NotFoundException("No FLight Found");
        }
    }
}
