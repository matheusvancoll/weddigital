package com.vancollstudios.WedDigital.repositorio.imagensVitrine;

import com.vancollstudios.WedDigital.model.imagensVitrine.ImagemVitrine;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RepositorioImagemVitrine extends CrudRepository<ImagemVitrine, Integer> {
}
