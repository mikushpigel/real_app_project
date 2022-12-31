import axios from 'axios';
import config from "../config.json";
// אימפורט של קובץ גייסון הופך אותו לאוביקט לכן קונפיג נקודה אי פי איי יוארל

axios.defaults.baseURL = config.apiUrl;

export function setCommonHeader(headerName, value){
    axios.defaults.headers.common[headerName] = value;
    console.log(axios.defaults.headers.common);
}

const httpService = {
    get: axios.get,
    post: axios.post,
    patch: axios.patch,
    put: axios.put,
    delete: axios.delete,
};

export default httpService;