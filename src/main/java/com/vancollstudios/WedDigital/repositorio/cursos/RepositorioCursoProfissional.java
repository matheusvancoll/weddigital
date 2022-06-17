package com.vancollstudios.WedDigital.repositorio.cursos;

import com.vancollstudios.WedDigital.model.cursos.AulasProfissional;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.Collection;

public interface RepositorioCursoProfissional extends CrudRepository<AulasProfissional, Integer> {

    @Query(value = "select * from cursos_profissional order by restrincao = :nivelConta desc;",
            nativeQuery = true)
    Collection<AulasProfissional> testet(Integer nivelConta);


}
