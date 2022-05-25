package com.vancollstudios.WedDigital.util;

import org.springframework.web.multipart.MultipartFile;

import java.util.Calendar;
import java.util.Date;

public class Util {

    public static final String FORMATO_DATA_HORA_BR = "dd/MM/yyyy HH:mm:ss";
    public static final String FORMATO_DATA_BR = "dd/MM/yyyy";

    public static String converterDataParaStringSemHora(Date data, String mascara) {
        StringBuilder retorno = new StringBuilder();
        if(data != null){
            Calendar calendar = Calendar.getInstance();
            calendar.setTime(data);

            String dia = String.valueOf(calendar.get(Calendar.DAY_OF_MONTH));
            String mes = String.valueOf(calendar.get(Calendar.MONTH) + 1);
            String ano = String.valueOf(calendar.get(Calendar.YEAR));

            if (FORMATO_DATA_HORA_BR.equals(mascara) || FORMATO_DATA_BR.equals(mascara)) {
                retorno.append(adicionarZeros(dia));
                retorno.append("/");
                retorno.append(adicionarZeros(mes));
                retorno.append("/");
                retorno.append(adicionarZeros(ano));
            } else {
                retorno.append(adicionarZeros(ano));
                retorno.append("/");
                retorno.append(adicionarZeros(mes));
                retorno.append("/");
                retorno.append(adicionarZeros(dia));
            }
        }
        return retorno.toString();
    }


    public static String adicionarZeros(String param) {
        if (param.length() < 2) {
            return "0" + param;
        } else {
            return param;
        }
    }

    public static String obterExtensaoImagem(MultipartFile arquivo){
        String contentType = arquivo.getContentType();
        String[] arrContentType = contentType.split("/");

        String extensaoArquivo = arrContentType[(arrContentType.length - 1)];

        return extensaoArquivo;
    }
}
