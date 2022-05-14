package com.vancollstudios.WedDigital.controlador;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "${SERVER_ORIGIN_CORS}")
@RestController
public class StatusControlador {

    @GetMapping(path = "/api/status")
    public String check(){
        return "okay";
    }
}
