import axios  from 'axios';  
import jwt_decode from 'jwt-decode';

const apiUrl = 'http://localhost:3000/';

export const normalApi = axios.create({
    baseURL: apiUrl,
})
// const accessToken = localStorage.getItem('his-current-user-token') != null ? localStorage.getItem('his-current-user-token'): null;
const accessToken = localStorage.getItem('his-current-user-token');
if(accessToken){
    // console.log(accessToken);
    let decoded = jwt_decode(accessToken);
    // console.log(decoded)
}

export const authApi = axios.create({
    baseURL: apiUrl,
    headers: {
        authorization: `Bearer ${accessToken}`
    }
})

// export const authApi = async()=>{
//     const accessToken = localStorage.getItem('his-current-user-token') != null ? localStorage.getItem('his-current-user-token'): null;
//     if(accessToken){
//         let decoded = jwt_decode(accessToken);
//         console.log(decoded)
//     }
//     return axios.create({
//         baseURL: apiUrl,
//         headers: {
//             authorization: `Bearer ${accessToken}`
//         }
//     })
// }

// export default {normalApi, authApi};
