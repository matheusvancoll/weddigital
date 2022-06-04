package com.vancollstudios.WedDigital.controlador.imagens;

import com.sun.org.apache.xpath.internal.operations.Bool;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Collection;

@Component
public class ControladorImagem {
    @Value("${DIRETORIO_RAIZ_IMAGENS}")
    private String diretorioRaizImagens;

    @Value("${DIRETORIO_FOTOS_VITRINE}")
    private String diretorioImgensVitrine;

    @Value("${DIRETORIO_FOTOS_PERFIL}")
    private String diretorioImagensPerfil;


    public String salvarImagemPerfilUsuario(MultipartFile fotoPerfil, String nomeImagem){
        String statusUploadImagem = "";
        Path caminhoDiretorio = Paths.get(this.diretorioRaizImagens, this.diretorioImagensPerfil);
        Path caminhoArquivo = caminhoDiretorio.resolve(nomeImagem);


        try{
            Files.createDirectories(caminhoDiretorio);
            fotoPerfil.transferTo(caminhoArquivo.toFile());
            statusUploadImagem = caminhoArquivo.toString();
        } catch (IOException e) {
            throw new RuntimeException("Problemas na tentativa de salvar o arquivo");
        }

        return statusUploadImagem;
    }

    public String salvarImagemVitrine(MultipartFile arquivoImagem, String nomeImagem){
        String statusUploadImagem = "";
        Path caminhoDiretorio = Paths.get(this.diretorioRaizImagens, this.diretorioImgensVitrine);
        Path caminhoArquivo = caminhoDiretorio.resolve(nomeImagem);

        try{
            Files.createDirectories(caminhoDiretorio);
            arquivoImagem.transferTo(caminhoArquivo.toFile());
            statusUploadImagem = caminhoArquivo.toString();
        } catch (IOException e) {
            throw new RuntimeException("Problemas na tentativa de salvar o arquivo");
        }

        return statusUploadImagem;
    }

    public void deletarImagemVitrine(String nomeArquivo){
        Path caminhoDiretorio = Paths.get(this.diretorioRaizImagens, this.diretorioImgensVitrine);
        Path caminhoArquivo = caminhoDiretorio.resolve(nomeArquivo);

        java.io.File arquivoDeletar = new java.io.File(caminhoArquivo.toString());
        arquivoDeletar.delete();
    }
}
