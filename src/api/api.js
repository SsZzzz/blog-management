import axios from 'axios';

const login = params => { return axios.post('/blog-serve/management/login', params) };
const getLabel = () => { return axios.get('/blog-serve/management/getLabel') };
const saveArticle = params => { return axios.post('/blog-serve/management/saveArticle', params) };
const updateArticle = params => { return axios.post('/blog-serve/management/updateArticle', params) };
const getSummary = () => { return axios.get('/blog-serve/management/getSummary') };
const getOneWeekLoginData = () => { return axios.get('/blog-serve/management/getOneWeekLoginData') };
const getArticleList = () => { return axios.get('/blog-serve/blog/getArticleList') };
const delArticle = params => { return axios.post('/blog-serve/management/delArticle', params) };
const getArticle = params => { return axios.get('/blog-serve/blog/getArticle', { params }) };

export default {
  login,
  getLabel,
  saveArticle,
  getSummary,
  getOneWeekLoginData,
  getArticleList,
  delArticle,
  getArticle,
  updateArticle
};