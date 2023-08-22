import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://academy-react.rarolabs.com.br/v1/'
});
