package com.vancollstudios.WedDigital.controlador.casamentos;

import com.vancollstudios.WedDigital.model.casamentos.Casamento;
import com.vancollstudios.WedDigital.model.usuarios.Usuario;
import com.vancollstudios.WedDigital.repositorio.casamentos.RepositorioCasamento;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ControladorCasamento {

    @Autowired
    RepositorioCasamento repositorioCasamento;

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(path = "/api/casamento/{idUsuarios}")
    public Casamento consultarCasamentoPorIdUsuario(@PathVariable("idUsuarios") Integer idUsuario){
        ResponseEntity casamentoEncontrado = repositorioCasamento.findAllByIdUsuario(idUsuario)
                .map(registro -> ResponseEntity.ok().body(registro)).orElse(ResponseEntity.notFound().build());
        Casamento casamento = (Casamento) casamentoEncontrado.getBody();

        return casamento;
    }
}
