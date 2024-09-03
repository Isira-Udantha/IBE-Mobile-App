package com.IBE.Mobile_App.advisor;

import com.IBE.Mobile_App.exception.NotFoundException;
import com.IBE.Mobile_App.util.StandardResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class AppWideExceptionHandler {
    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<StandardResponse> handleNotFoundException(NotFoundException e){
        return  new ResponseEntity<StandardResponse>(
                new StandardResponse(e.getMessage()),
                HttpStatus.NOT_FOUND);
    }
}
