package com.vancollstudios.WedDigital.repositorio.chat;

import com.vancollstudios.WedDigital.model.chat.Mensagem;
import com.vancollstudios.WedDigital.model.usuarios.Profissional;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;

@Repository
public interface RepositorioMensagens extends CrudRepository<Mensagem, Integer> {


    @Query(value = "select *  from mensagens_chat where id_profissional = :idProfissional group by id_cliente order by data_envio_mensagem desc", nativeQuery = true)
    Collection<Mensagem> findAllByIdProfissional(Integer idProfissional);

    @Query(value = "select *  from mensagens_chat where id_profissional = :idCliente group by id_profissional order by data_envio_mensagem desc", nativeQuery = true)
    Collection<Mensagem> findAllByIdCliente(Integer idCliente);

    @Query(value = "select *  from mensagens_chat where id_profissional = :idProfissional and id_cliente = :idCliente order by data_envio_mensagem asc", nativeQuery = true)
    Collection<Mensagem> findAllByIdProfissionalAndIdCliente(Integer idProfissional, Integer idCliente);
}
