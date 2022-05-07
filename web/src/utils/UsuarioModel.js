module.exports = {
    dadosUsuarioEmpresaDTO: {
        idUsuario: "",
        nomeUsuario: "",
        login: "",
        senha: "",
        nomeEmpresa: "",
        email: "",
        numeroContato: "",
        is_Whatsapp: false,
        cidade: "",
        estado: "SP",
        segmento: "recepcao",
        is_CNPJ: false,
        numeroCNPJ: "",
        descricaoEmpresa: "",
        nivelConta: "",
        is_CadastroPorConvite: false,
        idUsuarioConvite: "",
        tokenUsuarioConvite: ""
    },

    dadosUsuarioNoivDTO: {
        idUsuario: "",
        nomeUsuario: "",
        login: "",
        senha: "",
        email: "",
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
        nomeUsuario: '',
        tipoUsuario: "",
        idProfissional: "",
        cidade: '',
        estado: '',
        nomeEmpresa: "",
        descricaoEmpresa: "",
        email: "",
        numeroContato: "",
        is_Whatsapp: "",
        is_CNPJ: "",
        numeroCNPJ: "",
        nivelConta: '',
        tokenConvite: 0,

        casamentosBemSucedidos: 0,
        classificacao: null,
        pontosAcumulados: 0,
        
        valorMinimo: "",
        formasPagamento: "",
        maisDeUmEventoPorDia: false,
        trabalhaSozinho: false
    }
}