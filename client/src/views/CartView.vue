<template>
  <div class="cart">
    <section id="headline">
        <h1 id="heading">Shopping Cart</h1>
        <button id="clear" v-on:click="clearCart">Clear cart</button>
    </section>
    <section class="table">
        <cart-table></cart-table>
    </section>
  </div>
</template>

<script>
import cartService from '../services/CartService'
import CartTable from '../components/CartTable.vue'

export default {
   components: {
        CartTable
    },
    data() {
        return {
            emptyArray: []
        }
    },
    methods: {
        clearCart() {
            cartService.deleteCart().then((response) => {
                if(response.status === 204) {
                    location.reload();
                        }
                })
            }
        }
}
</script>

<style scoped> 
* {
    font-family: serif;
}
#headline {
    display: grid;
    grid-template-columns: 4fr 1fr;
    grid-template-areas: "heading clear";
}

#heading {
    grid-area: heading;
    text-align: left;
}

#clear {
    grid-area: clear;
    width: 150px;
    height: 50px;
    align-item: center;
    justify-self: end;
}

</style>