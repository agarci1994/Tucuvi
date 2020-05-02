import axios from './http-common';

const sendForm = object => axios.post('/api/form/create', object).then(response => response.data).catch(err => console.log(err))

export default sendForm