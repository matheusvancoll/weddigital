package com.vancollstudios.WedDigital.repositorio.vitrine;

import com.vancollstudios.WedDigital.model.usuarios.Profissional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.util.Collection;

@Repository
public class RepositorioVitrine {

    @Autowired
    EntityManager entityManager;
    public Collection<Profissional> listarProfissionaisPorNivelConta(){
        StringBuilder sql = new StringBuilder();
        sql.append(" from ");
        sql.append(Profissional.class.getName());
        sql.append(" order by nivelConta desc");
        Query query = entityManager.createQuery(String.valueOf(sql));
        return (Collection<Profissional>) query.getResultList();
    }
}
