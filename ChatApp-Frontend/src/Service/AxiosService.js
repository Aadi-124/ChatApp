import axios from "axios";

const customAxios = axios.create({
    baseURL:"https://chatapp-backend-dkeb.onrender.com",
    // baseURL:"http://localhost:8080",
    headers: {
        'Content-Type': 'application/json',
      },
});

export default customAxios;