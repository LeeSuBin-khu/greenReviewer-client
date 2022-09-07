import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";

interface Data {
    id: string,
    name: string
}

export const useFetch = (url: string) => {
    const [data, setData] = useState<Data []>([]);

    useEffect( () => {
        const fetchApi = async () => {
            const response: AxiosResponse<any> = await axios.get(`/${url}`);
            setData(response.data);
       }
       fetchApi();
    }, [])
    
    return data;
}