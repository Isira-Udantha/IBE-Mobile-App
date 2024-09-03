package com.IBE.Mobile_App.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "airports")
public class Airport {

    @Id
    private String code; // 3-letter code, e.g., "JFK"

    private String name; // Long name, e.g., "John F. Kennedy International Airport"

}
