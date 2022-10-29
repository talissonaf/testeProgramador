import axios from 'axios';

export const https = axios.create({
  baseURL: 'https://www.unigran.br/campogrande/api/index.php/teste/'
})
