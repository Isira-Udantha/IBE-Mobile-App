package com.IBE.Mobile_App.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
public class Airports {
    @Id
    @Column(name = "airport_code",length = 3)
    private String airPortCode;
    @Column(name = "airport_name",length = 100)
    private String airPortName;
}
