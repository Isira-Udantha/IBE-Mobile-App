package com.IBE.Mobile_App.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import java.time.Duration;
import java.time.LocalDate;
import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class FlightDTO {
    private int flightId;
    private String departureAirport;
    private String arrivalAirport;
    private LocalDate departureDate;
    private LocalDate arrivalDate;
}
