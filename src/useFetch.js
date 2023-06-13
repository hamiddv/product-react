import axios from "axios";

export async function useFetch(url){
    let res=axios.get(url)
    return res
}