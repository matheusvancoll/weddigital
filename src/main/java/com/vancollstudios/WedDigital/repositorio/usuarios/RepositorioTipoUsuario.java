package com.vancollstudios.WedDigital.repositorio.usuarios;

import com.vancollstudios.WedDigital.model.usuarios.TipoUsuario;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RepositorioTipoUsuario extends CrudRepository<TipoUsuario, Integer> {
    Optional<Object> findAllByIdTipoUsuario(Integer idUsuario);
}
