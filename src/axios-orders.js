import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://ksw0mns3i5.execute-api.eu-west-1.amazonaws.com/Production'
});

export default instance;