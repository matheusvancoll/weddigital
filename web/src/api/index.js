import axios from "axios";

const api = axios.create({
    baseURL: "http://127.0.18.2:8080/api"
})

export default api