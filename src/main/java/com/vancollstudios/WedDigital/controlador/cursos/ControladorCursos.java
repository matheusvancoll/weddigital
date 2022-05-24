package com.vancollstudios.WedDigital.controlador.cursos;

import com.vancollstudios.WedDigital.model.cursos.AulasProfissional;
import com.vancollstudios.WedDigital.repositorio.cursos.RepositorioCursoProfissional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "${SERVER_ORIGIN_CORS}")
@RestController
public class ControladorCursos {

    @Autowired
    RepositorioCursoProfissional repositorioCursoProfissional;

    @GetMapping(path = "/api/cursos/profissional/obterTodasAulas")
    public Iterable<AulasProfissional> obterAulasCursoProfissional(){
        Iterable<AulasProfissional> aulasProfissional = repositorioCursoProfissional.findAll();

        return aulasProfissional;
    }
}
