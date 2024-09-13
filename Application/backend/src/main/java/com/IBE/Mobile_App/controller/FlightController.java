package com.IBE.Mobile_App.controller;

import com.IBE.Mobile_App.dto.FlightDTO;
import com.IBE.Mobile_App.dto.FlightSearchDTO;
import com.IBE.Mobile_App.service.FlightService;
import com.IBE.Mobile_App.util.StandardResponse;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import org.slf4j.Logger;



@RestController
@RequestMapping(value = "/api/v1/flight")
@CrossOrigin
public class FlightController {

    private static final Logger logger = LoggerFactory.getLogger(FlightController.class);

    @Autowired
    private FlightService flightService;

    @PostMapping(value = "/save")
    public ResponseEntity<StandardResponse> saveFlight(@RequestBody FlightDTO flightDTO) {

        logger.info("INFO: Entering saveFlight method : {}" , flightDTO);

        try {
            String id = flightService.addFlight(flightDTO);
            logger.info("INFO: Flight saved successfully with ID: {}", id);
            return new ResponseEntity<StandardResponse>(
                    new StandardResponse(id),
                    HttpStatus.CREATED
            );
        } catch (Exception e) {
            logger.error("ERROR: Error occurred while saving flight", e);
            return new ResponseEntity<>(
                    new StandardResponse("Error occurred while saving flight"),
                    HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }
//    @GetMapping(value = "/search",
//            params = {"departure_date", "arrival", "departure"}
//    )
//    public ResponseEntity<StandardResponse> searchFlights(@RequestParam(value = "departure_date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate departure_date,
//                                                         @RequestParam(value = "arrival") String arrival,
//                                                         @RequestParam(value = "departure") String departure)
//    {
//        List<FlightDTO> flightDTO = flightService.searchFlights(departure_date,arrival,departure);
//        if(flightDTO.size()>0){
//            return new ResponseEntity<StandardResponse>(
//                    new StandardResponse(flightDTO),
//                    HttpStatus.OK);
//        }else {
//            throw new RuntimeException("No flight found");
//        }
//
//    }
    @PostMapping(value = "/search")
    public ResponseEntity<StandardResponse> searchFlights(@RequestBody FlightSearchDTO flightSearchDTO) {

        logger.info("START: SearchFlights : {}" , flightSearchDTO);

//        LocalDate departure_date = flightSearchDTO.getDepartureDate();
//        String arrival = flightSearchDTO.getArrivalAirport();
//        String departure = flightSearchDTO.getDepartureAirport();

        List<FlightDTO> flightDTO = flightService.searchFlights(flightSearchDTO);

        if(flightDTO.size()>0){
            logger.info("END: SearchFlights, Found {} flights", flightDTO.size());
            return new ResponseEntity<StandardResponse>(
                    new StandardResponse(flightDTO),
                    HttpStatus.OK
            );
        }else {
            logger.warn("WARN: No flights found for given search criteria");
            return new ResponseEntity<StandardResponse>(
                    new StandardResponse("No flight found"),
                    HttpStatus.NOT_FOUND);
        }
    }
}
