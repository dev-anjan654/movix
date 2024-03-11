import axios from "axios";


const BASE_URL = "https://api.themoviedb.org/3";
const API_TOKEN = import.meta.env.VITE_APP_API_TOKEN;

const headers = {
    Authorization: `bearer ${API_TOKEN}`,
}

export const fetchAPi = async (url, params) => {
    try{
        const {data} = await axios.get(BASE_URL + url, {
            headers: headers,
            params: params
        })
        return data;
    } catch(err){
        console.log(err)
        return err;
    }
}