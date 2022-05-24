package com.vancollstudios.WedDigital.controlador.vendasRealizadas;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "137.184.212.128")
@RestController
public class ControladorPagamentosGreenn {

    @PostMapping(path = "/api/pagamento")
    public Object teste(@RequestBody Object responseEntity){

        return responseEntity;

    }
}
