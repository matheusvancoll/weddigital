package com.vancollstudios.WedDigital.repositorio.casamentos;

import com.vancollstudios.WedDigital.model.casamentos.Casamento;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@Repository
@RestController
public interface RepositorioCasamento extends CrudRepository<Casamento, Integer> {
    Optional<Object> findAllByIdCasamento(Integer idUsuario);
    Optional<Object> findAllByIdUsuario(Integer idUsuario);
}
