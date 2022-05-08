package com.vancollstudios.WedDigital.model.chat;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity(name = "DADOS_CHAT")
public class Mensagem {
    @Id @GeneratedValue
    private Integer idMensagem;

    @Column
    private Integer idProfissionall;

    @Column
    Integer idCliente;

    @Column
    String corpoMensagem;

    public Integer getIdMensagem() {
        return idMensagem;
    }

    public void setIdMensagem(Integer idMensagem) {
        this.idMensagem = idMensagem;
    }

    public Integer getIdProfissionall() {
        return idProfissionall;
    }

    public void setIdProfissionall(Integer idProfissionall) {
        this.idProfissionall = idProfissionall;
    }

    public Integer getIdCliente() {
        return idCliente;
    }

    public void setIdCliente(Integer idCliente) {
        this.idCliente = idCliente;
    }

    public String getCorpoMensagem() {
        return corpoMensagem;
    }

    public void setCorpoMensagem(String corpoMensagem) {
        this.corpoMensagem = corpoMensagem;
    }
}
