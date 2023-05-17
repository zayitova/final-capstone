<template>
    <table>
        <tr class="headers">
            <th>SKU</th>
            <th>Product</th>
            <th>Price</th>
            <th> </th>
            <th> </th>
        </tr>
        <tr v-for="product in $store.state.products" v-bind:key="product.id">
            <td class="sku"> {{ product.sku }} </td>
            <router-link class="router-link" v-bind:to="{ name: 'product-details', params: {id: product.id}}" >
                <td class="name"> {{ product.name }} </td>
            </router-link>
            <td class="price"> {{ Intl.NumberFormat(`en-US`, {currency: `USD`, style: "currency",}).format(product.price) }} </td>
            <td class="cart" v-if="$store.state.token" v-on:click="addProductToCart(product.id)"> 
                <font-awesome-icon icon="fa-solid fa-cart-plus icon action" class="action-button" v-on:click="addProductToCart(product)"/>
            </td>
        </tr>
    </table>
</template>

<script>
import cartService from '../services/CartService';

export default {
    name: 'product-table',
    props: {
        emptyArray: []
     },
     methods: {
        addProductToCart(productId) {
            cartService.addCartItem(productId).then((response) => {
                if(response.status === 201) {
                    this.$router.push({name: 'products'});
                }
            }).catch(error => {
                console.error(error)
            })
        }
     }
}
</script>

<style scoped>
* {
    font-family: serif;
}

table {
    width: 60%;
}

.headers > th{
    font-weight: bold;
    font-family: serif;
    text-decoration: none;
    text-align: left;
    font-size: 20px;
}



tr {
    /* display: grid;
    grid-template-columns: fr 2fr 1fr .5fr 3fr;
    grid-template-areas: "sku name price cart ."; */

    width: 100%;
    border: 1px solid;
    text-decoration: none;
}
/* 
th:first-child{
    width: 200;
}

th:nth-child(2) {
    width: 400px;
}
th:nth-child(3) {
    width: 150px;
}
th:last-child {
    width: 20px;
}

tr:first-child{
    width: 200;
}

tr:nth-child(2) {
    width: 400px;
}
tr:nth-child(3) {
    width: 150px;
}
tr:last-child {
    width: 20px;
} */

th:nth-child(3) {
    text-align: center;
}

td {
    text-decoration: none;
    text-align: left;
    color: black;
}

.sku {
    /* grid-area: sku; */
    font-weight: 200;
    text-decoration: none;
    width: 200px;
}

a.router-link {
  text-decoration: none;
  color: black;
}

.name {
    /* grid-area: name; */
    text-decoration: none;
    width: 300px;
}

.price {
    /* grid-area: price; */
    font-weight: 200;
    text-decoration: none;
    width: 100px;
}

/* .cart {
    width: 20px;
} */



@media (max-width: 768px) {
     table {
        width: 100%
    }

 }

 /*@media (max-width: 600px) {
    {
    }
  } */

</style>