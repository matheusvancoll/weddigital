package com.vancollstudios.WedDigital.controlador.imagens;

import com.sun.org.apache.xpath.internal.operations.Bool;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Component
public class ControladorImagem {
    private String diretorioRaizImagens = "${SERVER_ORIGIN_CORS}";
    private String diretorioImgensVitrine = "${DIRETORIO_FOTOS_VITRINE}";
    private String diretorioImagensPerfil = "${DIRETORIO_FOTOS_PERFIL}";


    public Boolean salvarImagemVitrineProfissional(MultipartFile arquivo){
        Boolean isSucessUpload = false;

        Path caminhoDiretorio = Paths.get(this.diretorioRaizImagens, this.diretorioImgensVitrine);
        Path caminhoArquivo = caminhoDiretorio.resolve(arquivo.getOriginalFilename());


        try{
            Files.createDirectories(caminhoDiretorio);
            arquivo.transferTo(caminhoArquivo.toFile());
            isSucessUpload = true;
        } catch (IOException e) {
            throw new RuntimeException("Problemas na tentativa de salvar o arquivo");
        }

        return isSucessUpload;
    }
}
