package com.IBE.Mobile_App.util;

import com.IBE.Mobile_App.controller.FlightController;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class StandardResponse {
    private static final Logger logger = LoggerFactory.getLogger(FlightController.class);
    private Object data;
}
