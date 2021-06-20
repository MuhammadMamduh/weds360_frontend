import axios from 'axios';

const localURL = 'http://localhost:4000';
const productionURL= 'https://mamduh-weds360-backend.herokuapp.com'
export default axios.create({
    baseURL: productionURL
});