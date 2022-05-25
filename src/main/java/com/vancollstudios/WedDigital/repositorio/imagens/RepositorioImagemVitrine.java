package com.vancollstudios.WedDigital.repositorio.imagens;

import com.vancollstudios.WedDigital.model.imagens.ImagemVitrine;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RepositorioImagemVitrine extends CrudRepository<ImagemVitrine, Integer> {
}
