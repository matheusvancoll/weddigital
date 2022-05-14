module.exports = {
    verificarIgualdadeSenha(senha1, senha2){
        if(senha1 != "" && senha2 != ""){
            if(senha1 == senha2){
                return true
            }else{
                return false
            }
        }else{
            return false
        }
    },

    verificarIntegridadeSenha(senha){
        var regex = /^(?=(?:.*?[A-Z]){1})(?=(?:.*?[0-9]){1})/
        if(senha.length < 8){
            return false
        }else if(!regex.exec(senha)){
            return false
        }

        return true;
    }
}