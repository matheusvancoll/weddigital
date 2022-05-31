import axios from "axios";

const api = axios.create({
    baseURL: "http://177.153.60.189:8080/api"
})

export default api