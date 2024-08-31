import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;


export const endpoint = {
    'search':(q)=>`/api/search/?q=${q}`,
    'forecast':(q,days,lang)=>`/api/forecast/?q=${q}&days=${days}&lang=${lang}`
};

export default axios.create({
    baseURL: BASE_URL
});