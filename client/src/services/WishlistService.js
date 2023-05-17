import axios from 'axios';

const http = axios.create({
    baseURL: "http://localhost:9000"
  });


export default {
    getWishlists(){
        return http.get('/wishlists')
    },

    getWishlistById(id) {
        return http.get(`/wishlists/${id}`)
    },

    addWishlist(wishlist) {
        return http.post('/wishlists', wishlist)
    },

    deleteWishlistById(id) {
        return http.delete(`/wishlists/${id}`)
    },

    addWishlistItem(wishlistId, productId) {
        return http.post(`/wishlists/${wishlistId}/products/${productId}`)
    },

    deleteWishlistItem(wishlistId, productId) {
        return http.delete(`/wishlists/${wishlistId}/products/${productId}`)
    },
}