package com.IBE.Mobile_App.controller;

import com.IBE.Mobile_App.dto.FlightDTO;
import com.IBE.Mobile_App.service.FlightService;
import com.IBE.Mobile_App.util.StandardResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping(value = "/api/v1/flight")
@CrossOrigin
public class FlightController {
    @Autowired
    private FlightService flightService;

    @PostMapping(value = "/save")
    public ResponseEntity<StandardResponse> saveFlight(@RequestBody FlightDTO flightDTO) {
        String id = flightService.addFlight(flightDTO);
        return new ResponseEntity<StandardResponse>(
                new StandardResponse(201, "flight added succesfully", id),
                HttpStatus.CREATED
        );
    }

    @GetMapping(value = "search-flight-by-date-arrival-and-departure",
            params = {"departure_date", "arrival", "departure"}
    )
    public ResponseEntity<StandardResponse> searchFlights(@RequestParam(value = "departure_date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate departure_date,
                                                         @RequestParam(value = "arrival") String arrival,
                                                         @RequestParam(value = "departure") String departure)
    {
        List<FlightDTO> flightDTO = flightService.searchFlights(departure_date,arrival,departure);
        return new ResponseEntity<StandardResponse>(
                new StandardResponse(200,"Success",flightDTO),
                HttpStatus.OK
        );

    }
}
