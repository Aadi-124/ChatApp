import axios from "axios";
import { BaseURL } from "./URLService";

const customAxios = axios.create({
    baseURL:BaseURL,
    headers: {
        'Content-Type': 'application/json',
      },
});

export default customAxios;

// import axios from "axios";
// import { BaseURL } from "./URLService";

// const customAxios = axios.create({
//     baseURL: BaseURL,
//     headers: {
//         'Content-Type': 'application/json',
//         // Add other default headers here if needed
//     },
//     timeout: 10000, // 10 seconds timeout
// });

// // Request interceptor
// customAxios.interceptors.request.use(
//     (config) => {
//         // Add authorization token if exists
//         const token = localStorage.getItem('authToken');
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

// // Response interceptor
// customAxios.interceptors.response.use(
//     (response) => {
//         // You can modify responses here before they reach your components
//         return response;
//     },
//     (error) => {
//         // Handle errors globally
//         if (error.response?.status === 401) {
//             // Handle unauthorized access (e.g., redirect to login)
//         }
//         return Promise.reject(error);
//     }
// );

// export default customAxios;