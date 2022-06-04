import axios from "axios";
import WedConfig from '../config.json'

const api = axios.create({
    baseURL: WedConfig.api.linkApiGeral
})

export default api