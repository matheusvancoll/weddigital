package com.vancollstudios.WedDigital.repositorio.imagens;

import com.vancollstudios.WedDigital.model.imagens.ImagemPerfil;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RepositorioImagemPerfil extends CrudRepository<ImagemPerfil, Integer> {
}
