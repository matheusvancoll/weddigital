package com.vancollstudios.WedDigital.repositorio.anuncios;

import com.vancollstudios.WedDigital.model.anuncios.Anuncio;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
@EnableJpaRepositories
public interface RepositorioAnuncio extends CrudRepository<Anuncio, Integer> {

    Optional<Object> findAllByIdAnuncio(Integer idAnuncio);

    Optional<Object> findAllByIdUsuarioFornecedor(Integer tipoUsuario);
}
