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
        if(senha.length <= 8 && senha.length > 36){
            console.log("SIZE")
            return "size"
        }else if(!regex.exec(senha)){
            console.log("SENHA1: " + senha)
            return false
        }
        
        console.log("true")
        return true;
    }
}