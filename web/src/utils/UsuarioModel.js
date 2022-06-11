module.exports = {
    dadosUsuarioEmpresaDTO: {
        idUsuario: "",
        nomeUsuario: "",
        email: "",
        login: "",
        senha: "",
        nomeEmpresa: "",
        numeroContato: "",
        is_Whatsapp: false,
        cidade: "",
        estado: "SP",
        segmento: "recepcao",
        numeroCPF: "",
        is_CNPJ: false,
        numeroCNPJ: "",
        descricaoEmpresa: "",
        nivelConta: "1",
        is_CadastroPorConvite: false,
        idUsuarioConvite: "",
        tokenUsuarioConvite: ""
    },

    dadosUsuarioNoivDTO: {
        idUsuario: "",
        nomeUsuario: "",
        email: "",
        login: "",
        senha: "",
        cidade: "",
        estado: "SP",
        dataCasamento: "",
        is_Noiva: true,
        is_CadastroPorConvite: false,
        idUsuarioConvite: ""
    },

    login:{
        user: '', 
        password: ''
    },

    dadosResumoPerfilProfissionalDTO: {
        idUsuario: "",
        nomeUsuario: "",
        fotoPerfil: "",
        tipoUsuario: "",
        idProfissional: "",
        cidade: "",
        estado: "",
        nomeEmpresa: "",
        descricaoEmpresa: "",
        email: "",
        numeroContato: "",
        is_Whatsapp: "",
        numeroCPF: "",
        is_CNPJ: "",
        numeroCNPJ: "",
        nivelConta: "",
        tokenConvite: 0,
        valorMinimo: "",
        formasPagamento: "",
        maisDeUmEventoPorDia: false,
        trabalhaSozinho: false
    },

    dadosResumoPerfilCasamentoDTO: {
        idUsuario: "",
        nomeUsuario: "",
        fotoPerfil: "",
        tipoUsuario: "",
        idNoivX: "",
        cidade: "",
        estado: "",
        email: "",
        numeroContato: "",
        dataCasamento: "",
        is_Whatsapp: "",
        numeroCPF: "",
        pontosAcumulados: "",
        tokenConvite: "",
        profissionaisContratados: [],
    }
}