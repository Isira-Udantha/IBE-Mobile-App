package com.IBE.Mobile_App.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class FlightSearchDTO {
    private String departureAirport;
    private String arrivalAirport;
    private LocalDate departureDate;
}
