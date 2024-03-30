import Axios from 'axios';

const createAxios = ({ authToken = '' }) => {

    console.log(process.env.NEXT_PUBLIC_BACKEND_URL);
    const axios = Axios.create({
        baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
        headers: {
            //'X-Requested-With': 'XMLHttpRequest',
            authorization: `Bearer ${authToken}`
        },
        withCredentials: true,
    });

    return axios;
}

export default createAxios;