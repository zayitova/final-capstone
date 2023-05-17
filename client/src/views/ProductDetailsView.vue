<template>
  <div class="product-details">
    <div class="heading">
      <h1>{{product.name}}</h1>
      <button class="add-to-cart" v-on:click="addProduct(product)">Add to Cart</button>
    </div>
    <h2>Details:</h2>
    <h4>SKU: {{product.sku}}</h4>     
    <h4>Price: ${{ product.price }}</h4>
    <h3>Name: {{ product.name }}</h3>
    <img v-bind:src=product.imageName />
    <p>{{ product.description }}</p>
  </div>
</template>

<script>
import cartService from '../services/CartService';

export default {
    name: 'productDetails',
    data() {
      return {
        emptyArray: []
      }
    },
    computed: {
        product() {
            return this.$store.state.products.find((prod) => {
                return prod.id == this.$route.params.id;
            });
        },
    },
    methods: {
      addProduct(product) {
        cartService.addCartItem(product).then((response) => {
          if(response.status == 201) {
            this.$router.push({name: "products"})
          }
        })

      }
    }
}
</script>

<style >
* {
    font-family: serif;
}

.product-details {
  color:black;
  font-family: serif;
}

.heading {
  display: grid;
  grid-template-columns: 4fr 1fr;
  grid-template-areas: "header cart";
}

 h1 {
  grid-area: header;
  margin-top: -10px;
  font-family: serif;
  font-weight: bold;
  font-size: 50px;
  height: 40px;
 }

 .add-to-cart {
    grid-area: cart;
    font-family: serif;
    width: 150px;
    height: 50px;
    align-self: center;
    justify-self: end;
 }

 h2 {
  color:black;
  font-family: serif;
  font-size: 35px;
  height: 30px;
  /* margin-top: -1px; */
 }

 h4 {
  font-weight: 200;
  display: inline;
  color:black;
  font-family: serif;
  font-size: 25px;
  height: 25px;
  margin-right: 25px;
 }

 h3 {
  font-weight: 200;
  margin-top: -5px;
  color:black;
  font-family: serif;
  font-size: 25px;
  height: 25px;
 }

 img {
  object-fit: contain;
 }
  
 p {
  color:black;
  font-family: serif;
  font-size: 20px;
 }

 @media (max-width: 768px) {
    h1{
     font-size: 35px;
   }

 }

</style>