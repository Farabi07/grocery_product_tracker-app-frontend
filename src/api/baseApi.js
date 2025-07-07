import axios from 'axios';

const baseApi = axios.create({
  baseURL: 'http://10.0.70.145:8001/'
});

export default baseApi;