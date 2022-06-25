package com.vancollstudios.WedDigital.controlador.vendasRealizadas;

import com.vancollstudios.WedDigital.model.usuarios.Profissional;
import com.vancollstudios.WedDigital.repositorio.usuarios.RepositorioProfissional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@CrossOrigin(origins = "137.184.212.128")
@RestController
public class ControladorPagamentosGreenn {

    @Autowired
    RepositorioProfissional repositorioProfissional;

    @PostMapping(path = "/api/pagamento")
    public Object teste(@RequestBody Map<String, Object> responseEntity){

        Map<String, Object> dadosCliente = (Map<String, Object>) responseEntity.get("client");
        Map<String, Object> dadosCompra = (Map<String, Object>) responseEntity.get("product");
        String statusPagamento = responseEntity.get("currentStatus").toString();

        if(dadosCliente != null || !dadosCliente.isEmpty()){
            String nomeCliente = dadosCliente.get("name").toString();
            String emailCliente = dadosCliente.get("email").toString();
            String cpf_cnpjCliente = dadosCliente.get("cpf_cnpj").toString();

            Profissional profissional = new Profissional();

//            Procurar pelo cpf
//            profissional = repositorioProfissional.find

        }

        return responseEntity;
    }
}
