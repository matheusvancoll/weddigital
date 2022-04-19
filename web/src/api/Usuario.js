// import { useState } from 'react'
const axios = require('axios')
const api = require('./index')

module.exports = {

    async vai(idUser){
        let dadosUsuario;
        axios.get("http://localhost:8080/api/tipousuario/3").then(({dados}) => {
            dadosUsuario = dados
            console.log("DADOS THEN")
            console.log(dados)
            })
            console.log("DADOS USUARIO")
            console.log(dadosUsuario)
            return dadosUsuario
    },

    async buscarTiposUsuario(idUser){
        let tipoUsuario
        axios.get("http://localhost:8080/api/tipousuario/3").then(({dadosUsuario}) => {
            tipoUsuario = dadosUsuario
        })
        return tipoUsuario
    }
}




// export default function Usuarios(props){
//     const [Usuarios, setUsuarios] = useState([])
    
//     useEffect(() => {
//         api.get("anuncio/buscarTodos").then(({data}) => {
//             setUsuarios(data)
//             //eslint-disable-next-line react-hooks/exhaustive-deps
//         })
//     }, [])
    
//     let listaOpcoes = Usuarios
//     let listaCardProdutosMarketplace = []

//     for (let i = 0; i < listaOpcoes.length; i++) {
//         listaCardProdutosMarketplace.push(<CardAnuncioMarketplace dadosProduto={listaOpcoes[i]} />)
//     }

//     return(
//         <div className='marketplace-container'>
//         </div>
//     )
// }