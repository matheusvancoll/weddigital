package com.vancollstudios.WedDigital.repositorio.chat;

import com.vancollstudios.WedDigital.model.chat.Mensagem;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RepositorioMensagens extends CrudRepository<Mensagem, Integer> {
}
