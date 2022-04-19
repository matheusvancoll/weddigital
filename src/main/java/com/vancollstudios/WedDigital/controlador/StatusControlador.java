package com.vancollstudios.WedDigital.controlador;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class StatusControlador {

    @GetMapping(path = "/api/status")
    public String check(){
        return "okay";
    }
}
