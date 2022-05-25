package com.vancollstudios.WedDigital.repositorio.statusPontuacaoProfissional;

import com.vancollstudios.WedDigital.model.statusPontuacaoProfissional.StatusPontuacao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import javax.persistence.EntityManager;
import javax.persistence.Query;

@Repository
public class RepositorioStatusPontuacaoProfissional {

    @Autowired
    EntityManager entityManager;

    public StatusPontuacao obterStatusPontuacaoPorCasamentosBemSucedidos(Integer numeroCasamentosBemSucedidos){
        StringBuilder sql = new StringBuilder();
        sql.append(" from ");
        sql.append(StatusPontuacao.class.getName());
        sql.append(" where :numeroCasamentosBemSucedidosParam >= pontoMinimo and :numeroCasamentosBemSucedidosParam <= pontoMaximo ");
        Query query = entityManager.createQuery(String.valueOf(sql));

        query.setParameter("numeroCasamentosBemSucedidosParam", numeroCasamentosBemSucedidos);

        return (StatusPontuacao) query.getResultList().get(0);
    }
}
