import axios from 'axios'

export default axios.create({
  baseURL: 'https://api-hoodwink.herokuapp.com/',
  headers: {
    'Content-Type': 'application/json'
  }
});
