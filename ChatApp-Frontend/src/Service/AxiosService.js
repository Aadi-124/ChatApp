import axios from "axios";
import { BaseURL } from "./URLService";

const customAxios = axios.create({
    baseURL:BaseURL,
    headers: {
        'Content-Type': 'application/json',
      },
});

export default customAxios;

