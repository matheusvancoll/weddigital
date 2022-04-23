package com.vancollstudios.WedDigital.repositorio.usuarios;

import com.vancollstudios.WedDigital.model.usuarios.Profissional;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RepositorioProfissional extends CrudRepository<Profissional, Integer> {
    Optional<Profissional> findAllByIdUsuario(Integer idUsuario);
}
