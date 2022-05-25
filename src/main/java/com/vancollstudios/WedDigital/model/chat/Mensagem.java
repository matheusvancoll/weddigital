package com.vancollstudios.WedDigital.model.chat;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.sql.Date;
import java.sql.Timestamp;

@Entity(name = "MENSAGENS_CHAT")
public class Mensagem {
    @Id @GeneratedValue
    private Integer idMensagem;

    @Column
    private Integer idProfissional;

    @Column
    private Integer idCliente;

    @Column
    private String corpoMensagem;

    @Column
    private Timestamp dataEnvioMensagem;

    @Column
    private Boolean enviadoPorProfissional;

    @Column
    private Boolean enviadoPorCliente;


    public Integer getIdMensagem() {
        return idMensagem;
    }

    public void setIdMensagem(Integer idMensagem) {
        this.idMensagem = idMensagem;
    }

    public Integer getIdProfissional() {
        return idProfissional;
    }

    public void setIdProfissional(Integer idProfissional) {
        this.idProfissional = idProfissional;
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

    public Timestamp getDataEnvioMensagem() {
        return dataEnvioMensagem;
    }

    public void setDataEnvioMensagem(Timestamp dataEnvioMensagem) {
        this.dataEnvioMensagem = dataEnvioMensagem;
    }

    public Boolean getEnviadoPorProfissional() {
        return enviadoPorProfissional;
    }

    public void setEnviadoPorProfissional(Boolean enviadoPorProfissional) {
        this.enviadoPorProfissional = enviadoPorProfissional;
    }

    public Boolean getEnviadoPorCliente() {
        return enviadoPorCliente;
    }

    public void setEnviadoPorCliente(Boolean enviadoPorCliente) {
        this.enviadoPorCliente = enviadoPorCliente;
    }
}
