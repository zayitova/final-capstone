import axios from 'axios';

export default {
    getAllProducts() {
        return axios.get('/products')
    },

    getProductById(id) {
        return axios.get(`/products/${id}`)
    }
}