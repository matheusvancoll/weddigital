package com.vancollstudios.WedDigital.repositorio.sorteios;

import com.vancollstudios.WedDigital.model.sorteios.Sorteio;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RepositorioSorteio extends CrudRepository<Sorteio, Integer> {
    @Query(value = "select * from sorteios where is_profissional = true order by data_sorteio desc LIMIT 1", nativeQuery = true)
    Sorteio obterUltimoProfissionalSorteado();

    @Query(value = "select * from sorteios where is_noivos = true order by data_sorteio desc LIMIT 1", nativeQuery = true)
    Sorteio obterUltimoNoivSorteado();

}
