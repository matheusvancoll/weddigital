package com.vancollstudios.WedDigital.repositorio.imagens;

import com.vancollstudios.WedDigital.model.chat.Mensagem;
import com.vancollstudios.WedDigital.model.imagens.ImagemVitrine;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;

@Repository
public interface RepositorioImagemVitrine extends CrudRepository<ImagemVitrine, Integer> {
    Collection<ImagemVitrine> findAllByIdProfissional(Integer idProfissional);

    @Query(value = "select count(id_Profissional) from imagens_vitrine where id_profissional = :idProfissional",
            nativeQuery = true)
    Integer obterQuantidadeImagensVitrineSalvosPorIdProfissional(Integer idProfissional);
}
