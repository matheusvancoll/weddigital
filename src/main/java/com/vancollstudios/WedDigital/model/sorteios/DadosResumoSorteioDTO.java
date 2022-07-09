package com.vancollstudios.WedDigital.model.sorteios;

public class DadosResumoSorteioDTO {

    String nomeGanhador;
    String imagemPefil;
    String dataHoraSorteio;
    Integer pontosAcumulados;
    String dataCriacao;

    Boolean IsNoivos;
    String nomeConjuge;

    public String getNomeGanhador() {
        return nomeGanhador;
    }

    public void setNomeGanhador(String nomeGanhador) {
        this.nomeGanhador = nomeGanhador;
    }

    public String getImagemPefil() {
        return imagemPefil;
    }

    public void setImagemPefil(String imagemPefil) {
        this.imagemPefil = imagemPefil;
    }

    public String getDataHoraSorteio() {
        return dataHoraSorteio;
    }

    public void setDataHoraSorteio(String dataHoraSorteio) {
        this.dataHoraSorteio = dataHoraSorteio;
    }

    public Integer getPontosAcumulados() {
        return pontosAcumulados;
    }

    public void setPontosAcumulados(Integer pontosAcumulados) {
        this.pontosAcumulados = pontosAcumulados;
    }

    public String getDataCriacao() {
        return dataCriacao;
    }

    public void setDataCriacao(String dataCriacao) {
        this.dataCriacao = dataCriacao;
    }

    public Boolean getNoivos() {
        return IsNoivos;
    }

    public void setNoivos(Boolean noivos) {
        IsNoivos = noivos;
    }

    public String getNomeConjuge() {
        return nomeConjuge;
    }

    public void setNomeConjuge(String nomeConjuge) {
        this.nomeConjuge = nomeConjuge;
    }
}
