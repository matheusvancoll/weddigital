package com.vancollstudios.WedDigital.repositorio.chat;

import com.vancollstudios.WedDigital.model.chat.Mensagem;
import com.vancollstudios.WedDigital.model.usuarios.Profissional;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;

@Repository
public interface RepositorioMensagens extends CrudRepository<Mensagem, Integer> {


    @Query(value = "select *  from mensagens_chat where id_profissional = :idProfissional group by id_cliente order by data_envio_mensagem desc",
            nativeQuery = true)
    Collection<Mensagem> findAllByIdProfissional(Integer idProfissional);

    Collection<Mensagem> findAllByIdCliente(Integer idCliente);
}
