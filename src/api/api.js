import axios from 'axios';

const login = params => { return axios.post('/blog-serve/management/login', params) };
const getLabel = () => { return axios.get('/blog-serve/management/getLabel') };
const saveArticle = params => { return axios.post('/blog-serve/management/saveArticle', params) };
const getSummary = () => { return axios.get('/blog-serve/management/getSummary') };
const getOneWeekLoginData = () => { return axios.get('/blog-serve/management/getOneWeekLoginData') };

export default {
  login,
  getLabel,
  saveArticle,
  getSummary,
  getOneWeekLoginData
};