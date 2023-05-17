<template>
  <table>
        <tr class="table-heading">
            <th>QTY</th>
            <th>Product</th>
            <th>Price</th>
            <th>Amount</th>           
        </tr>
        <tr class="product-values" v-for="product in cart.cartList" v-bind:key="product.productId" >
            <td>{{product.quantity}}</td>
            <td>{{ productName(product.productId) }}</td>
            <td>{{Intl.NumberFormat(`en-US`, {currency: `USD`, style: "currency",}).format(product.price)}}</td>
            <td>{{Intl.NumberFormat(`en-US`, {currency: `USD`, style: "currency",}).format(product.price * product.quantity) }}</td>
            <td class="delete" v-on:click="deleteItem(product.id)">X</td>
        </tr>
        <tr class="total-rows-first">
            <td></td>
            <td class="total-values">Item subtotal:</td>
            <td></td>
            <td class="total-values">{{ Intl.NumberFormat(`en-US`, {currency: `USD`, style: "currency",}).format(cart.subtotal) }}</td>
            <td></td>
        </tr>
        <tr class="total-rows">
            <td></td>
            <td class="total-values">Tax:</td>
            <td></td>
            <td class="total-values">{{ Intl.NumberFormat(`en-US`, {currency: `USD`, style: "currency",}).format(cart.tax) }}</td>
            <td></td>
        </tr>
        <tr class="total-rows">
            <td></td>
            <td class="total-values">Total:</td>
            <td></td>
            <td class="total-values">{{ Intl.NumberFormat(`en-US`, {currency: `USD`, style: "currency",}).format(cart.total)}}</td>
            <td></td>
        </tr>
    </table>
</template>

<script>
import cartService from '../services/CartService'
import productService from '../services/ProductService'
export default {
    data() {
        return {
            cart: {},
            emptyArray: [],
        }
    },
    methods: {
        deleteItem(cartId){
            cartService.deleteCartItem(cartId).then((response) => {
                if(response.status === 204) {
                    location.reload();
                }
            }).catch(error=> {
                    console.error(error)
            });
        },
        productName(productId){
            let name= "";
            if(this.$store.state.products.length == 0) {
                productService.getAllProducts().then((response) => {
                    this.$store.commit("SET_PRODUCTS", response.data);
                 })
                //this.$router.push({name: "products"});
            }
            this.$store.state.products.find((prod) => {
                if(prod.id === productId) {
                    name = prod.name;
                }
            });
            return name;
        }
    },
    created() {
        cartService.getCart().then((response) => {
            this.cart = response.data;
            this.$store.commit("SET_CART", response.data);
        });
    }
}
</script>

<style scoped>
*{
    font-size: 18px;
    font-family: serif;
}

table {
    width: 60%;
    border-collapse: collapse;
    margin-top: 20px;
}

.table-heading > th {
    font-size: 20px;
    text-align: right;
}
.total-rows-first{
    border-top: 2px solid black;
}
th, td {
    height: 30px;
}

.product-values > td {
    text-align: right;
    font-size: 18px;
}

.total-rows > td {
    text-align: right;
}

.total-values {
    font-weight: bold;
    font-size: 20px;
}

.delete {
    font-weight: bold;
}

@media (max-width: 768px) {
     table {
        width: 100%
    }

 }

</style>