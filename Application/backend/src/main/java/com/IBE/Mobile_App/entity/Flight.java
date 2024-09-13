package com.IBE.Mobile_App.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Date;
@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "Flight")
public class Flight {
    @Id
    @Column(name = "flight_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int flightId;

    @Column(name = "flight_designator",nullable = false)
    private String flightDesignator;

    @Column(name = "departure",nullable = false)
    private String departureAirport;
    @Column(name = "arrival", nullable = false)
    private String arrivalAirport;
    @Column(name = "departure_date", nullable = false,columnDefinition = "DATE")
    private LocalDate departureDate;
    @Column(name = "arrival_date", nullable = false,columnDefinition = "DATE")
    private LocalDate arrivalDate;
    @Column(name = "arrival_time", columnDefinition = "TIME")
    private LocalTime arrivalTime;
    @Column(name = "departure_time", columnDefinition = "TIME")
    private LocalTime departureTime;
}
