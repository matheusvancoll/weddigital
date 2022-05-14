package com.vancollstudios.WedDigital.repositorio.vitrine;

import com.vancollstudios.WedDigital.model.orcamentos.Orcamento;
import org.springframework.data.repository.CrudRepository;

import javax.persistence.criteria.CriteriaBuilder;

public interface RepositorioOrcamento extends CrudRepository<Orcamento, Integer> {
}
