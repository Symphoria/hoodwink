import axios from 'axios'

export default axios.create({
  baseURL: 'https://hoodwink-api.herokuapp.com/',
  headers: {
    'Content-Type': 'application/json'
  }
});
