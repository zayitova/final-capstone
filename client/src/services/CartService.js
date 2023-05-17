import axios from 'axios';

export default {
    getCart() {
        return axios.get('/cart')
    },

    addCartItem(productId) {
        const item = {
          productId: productId,
          quantity: 1,
        };
        return axios.post('/cart/items', item)
    },

    deleteCartItem(id) {
        return axios.delete(`/cart/items/${id}`)
    },

    deleteCart() {
        return axios.delete('/cart')
    }
}