package com.vancollstudios.WedDigital.repositorio.usuarios;

import com.vancollstudios.WedDigital.model.usuarios.Usuario;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RepositorioUsuario extends CrudRepository<Usuario, Integer> {

    Optional<Object> findAllByIdUsuario(Integer idUsuario);
    Optional<Usuario> findByLogin(String login);
    Optional<Usuario> findAllByLoginOrEmail(String login, String email);
}
