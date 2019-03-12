import axios from 'axios';

const login = params => { return axios.post('/management/login', params) };
const getLabel = () => { return axios.get('/management/getLabel') };
const saveArticle = params => { return axios.post('/management/saveArticle', params) };
const getSummary = () => { return axios.get('/management/getSummary') };
const getOneWeekLoginData = () => { return axios.get('/management/getOneWeekLoginData') };

export default {
  login,
  getLabel,
  saveArticle,
  getSummary,
  getOneWeekLoginData
};