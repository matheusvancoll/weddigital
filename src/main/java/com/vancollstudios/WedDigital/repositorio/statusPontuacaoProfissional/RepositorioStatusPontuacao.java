package com.vancollstudios.WedDigital.repositorio.statusPontuacaoProfissional;

import com.vancollstudios.WedDigital.model.statusPontuacaoProfissional.StatusPontuacao;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RepositorioStatusPontuacao extends CrudRepository<StatusPontuacao, Integer> {

}
