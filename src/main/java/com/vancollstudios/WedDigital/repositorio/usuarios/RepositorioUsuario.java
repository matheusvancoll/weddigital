package com.vancollstudios.WedDigital.repositorio.usuarios;

import com.vancollstudios.WedDigital.model.usuarios.Usuario;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface RepositorioUsuario extends CrudRepository<Usuario, Integer> {

    Optional<Usuario> findByIdUsuario(Integer idUsuario);
    Optional<Usuario> findAllByIdUsuario(Integer idUsuario);
    Optional<Usuario> findAllByLoginOrEmail(String login, String email);
}
