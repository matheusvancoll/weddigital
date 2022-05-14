package com.vancollstudios.WedDigital.repositorio.vitrine;

import com.vancollstudios.WedDigital.model.chat.Mensagem;
import org.springframework.data.repository.CrudRepository;

public interface RepositorioChat extends CrudRepository<Mensagem, Integer> {
}
