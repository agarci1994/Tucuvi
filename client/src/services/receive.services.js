import axios from './http-common';

const receiveList = () => axios.get('/api/form/receive').then(response => response.data).catch(err => console.log(err))

export default receiveList
