package com.vancollstudios.WedDigital.repositorio.orcamentos;

import com.vancollstudios.WedDigital.model.orcamentos.Orcamento;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RepositorioOrcamento extends CrudRepository<Orcamento, Integer> {
}
