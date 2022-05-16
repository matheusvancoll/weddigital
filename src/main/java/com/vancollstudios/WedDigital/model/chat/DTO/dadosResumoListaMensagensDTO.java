package com.vancollstudios.WedDigital.model.chat.DTO;

public class dadosResumoListaMensagensDTO {

    private Integer idMensagem;
    private Integer idProfissional;
    private String nomeProfissional;
    private Integer idCliente;
    private String nomeCliente;
    private String dataHoraMensagemUltimaMensagem;
    private String ultimaMensagem;

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

    public String getNomeProfissional() {
        return nomeProfissional;
    }

    public void setNomeProfissional(String nomeProfissional) {
        this.nomeProfissional = nomeProfissional;
    }

    public Integer getIdCliente() {
        return idCliente;
    }

    public void setIdCliente(Integer idCliente) {
        this.idCliente = idCliente;
    }

    public String getNomeCliente() {
        return nomeCliente;
    }

    public void setNomeCliente(String nomeCliente) {
        this.nomeCliente = nomeCliente;
    }

    public String getDataHoraMensagemUltimaMensagem() {
        return dataHoraMensagemUltimaMensagem;
    }

    public void setDataHoraMensagemUltimaMensagem(String dataHoraMensagemUltimaMensagem) {
        this.dataHoraMensagemUltimaMensagem = dataHoraMensagemUltimaMensagem;
    }

    public String getUltimaMensagem() {
        return ultimaMensagem;
    }

    public void setUltimaMensagem(String ultimaMensagem) {
        this.ultimaMensagem = ultimaMensagem;
    }
}
