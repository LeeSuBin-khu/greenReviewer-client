import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";

interface IData {
    id: string,
    name: string
}

//api get 커스텀 훅
export const useFetch = (url: string) => {
    const [data, setData] = useState<IData []>([]);

    useEffect( () => {
        const fetchApi = async () => {
            const response: AxiosResponse<IData []> = await axios.get(`${process.env.REACT_APP_SERVER_HOST}/${url}`);
            setData(response.data);
       }
       fetchApi();
    }, [])
    
    return data;
}