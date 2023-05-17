<template>
    <article class="card">
        <div class="sku">{{product.sku}}</div>
        <div class="price">{{Intl.NumberFormat(`en-US`, {currency: `USD`, style: "currency",}).format(product.price)}}</div>
        <router-link class="router-link" v-bind:to="{ name: 'product-details', params: {id: product.id}}" >
            <div class="product-name action">{{product.name}}</div>
        </router-link>
        <img class="product-image" v-bind:src=product.imageName />
        <div class="cart" v-if="$store.state.token" v-on:click="addProductToCart(product.id)"> 
            <div class="popup" onclick="myFunction()">
                <font-awesome-icon icon="fa-solid fa-cart-plus icon action" class="action-button"/>
            <span class="popuptext" id="myPopup">Item Added</span>
            </div>
        </div>
    </article>
</template>

<script>
import cartService from '../services/CartService';
export default {
    name: 'product-card',
    data() {
        return {
            emptyArray: [],
        }
    },
    props: {
        product: Object
    },
    methods: {
        addProductToCart(productId) {
            cartService.addCartItem(productId).then((response) => {
                if(response.status === 201) {
                    this.myFunction()
                }
            })
        },
        myFunction() {
            var popup = document.getElementById("myPopup");
            popup.classList.toggle("show");
        }
    }
}
</script>

<style>
* {
    font-family: serif;
}

.card {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: .5fr .75fr 4fr .5fr;
    grid-template-areas: 
    "SKU price"
    "name name"
    "image image"
    "cart cart";
    width: 300px;
    height: 400px;
    border: solid black;
    padding: 15px;
}

.sku{
    grid-area: SKU;
    font-weight: bold;
    text-decoration: none;
    font-size: 20px;
    font-family: serif;
}

.price {
    grid-area: price;
    font-weight: bold;
    padding-right: 0px;
    text-align: right;
    text-decoration: none;
    font-size: 20px;
    font-family: serif;
}


a.router-link {
    grid-area: name;
    text-decoration: none;
    width: 100%;
    font-family: serif;
    display: grid;
}

.product-name {
    width: 100%;
    font-weight: bold;
    text-align: center;
    font-size: 20px;
    color: #2b2b2b;
    text-decoration: none;
    font-family: serif;
    justify-self: center;
    align-self: center;
    text-align: center;
    place-self: center;
}

.product-image{
    grid-area: image;
    justify-self: center;
    align-self: center;
    object-fit: contain;
    width: 100%;
    max-height: 100%;
    border-radius: 70px;
}

.cart {
    grid-area: cart;
    text-align: right;
    padding-right: 10px;
}

.popup {
  display: inline-block;
  cursor: pointer;
}

/* The actual popup (appears on top) */
.popup .popuptext {
    visibility: hidden;
    width: 160px;
    background-color: #555;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 8px 0;
    position: fixed;
    z-index: 1;
    top: 20%;
    left: 45%;
}

/* Popup arrow */
/* .popup .popuptext::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: #555 transparent transparent transparent;
} */

/* Toggle this class when clicking on the popup container (hide and show the popup) */
.popup .show {
  visibility: visible;
  -webkit-animation: fadeIn 1s;
  animation: fadeIn 1s
}

/* Add animation (fade in the popup) */
@-webkit-keyframes fadeIn {
  from {opacity: 0;}
  to {opacity: 1;}
}

@keyframes fadeIn {
  from {opacity: 0;}
  to {opacity:1 ;}
}

.action-button {
    color: black;
    align-items: center;
    font-size: 30px;
}

 @media (max-width: 800px) {
    .card {
        margin-bottom: 25px;
        margin-right: 40px;
        gap: 20px;
    }

    .product-image{
        grid-area: image;
        padding: 2px;
        padding-left: 10px;
        padding-right: 10px;
        object-fit: contain;
        max-width: 100%;
        max-height: 100%;
    }

 }

 @media (max-width: 600px) {
    .card  {
        margin-bottom: 25px;
        margin-right: 30px;
    }

    .product-image{
        grid-area: image;
        padding: 2px;
        padding-left: 10px;
        padding-right: 10px;
        object-fit: contain;
        max-width: 100%;
        max-height: 100%;
    }
 }
</style>