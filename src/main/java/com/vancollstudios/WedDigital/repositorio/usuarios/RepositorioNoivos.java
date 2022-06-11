package com.vancollstudios.WedDigital.repositorio.usuarios;

import com.vancollstudios.WedDigital.model.usuarios.Noivos;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RepositorioNoivos extends CrudRepository<Noivos, Integer> {
    Optional<Noivos> findAllByIdNoivos(Integer idUsuario);

    Optional<Noivos> findAllByIdUsuario(Integer idUsuario);
}
