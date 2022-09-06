import axios from "axios";

type SetTypeId = (stringType : string) => number;

export const setTypeId: SetTypeId = (stringType) => {
    let id: number = 0;

    const response = axios.get(`${process.env.REACT_APP_SERVER_HOST}/checklists`);
    console.log(response);

    return id;
}