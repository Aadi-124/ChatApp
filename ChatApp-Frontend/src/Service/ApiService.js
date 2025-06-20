

import customAxios from "./AxiosService"

export const createRoom = (room) =>{ return customAxios.post("/room/createRoom",room)};

export const joinRoom = (roomId) =>{return customAxios.get(`/room/${roomId}`)};

export const getMessages = (roomId) =>{return customAxios.get(`/room/messages/${roomId}`)};

export const registeruser = (user)=>{return customAxios.post(`/public/register`,user,{
    headers:{
        'Content-Type':'application/json'
    }
})};

export const loginuser = (credentials) =>{return customAxios.post(`/public/login`,credentials,{
    headers:{
        'Content-Type':'application/json'
    }
})}

export const loadUsers = (jwtToken)=>{
    return customAxios.get(`/private/getUsers`,{
        headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer "+jwtToken
        }
    })
}




// export const checkEmail = (email) => {
//     return customAxios.get(`/public/checkEmail?email=${email}`,{
//     headers:{
//         'Content-Type':'application/json'
//     }
// })
// }
// export const checkPhone = (phone) => {return customAxios.get(`/public/checkPhone?phone=${phone}`,{
//     headers:{
//         'Content-Type':'application/json'
//     }
// })}
// export const checkUsername = (username) => {return customAxios.get(`/public/checkUserName?username=${username}`,{
//     headers:{
//         'Content-Type':'application/json'
//     }
// })}
