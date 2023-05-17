<template>
  <div class="products">
      <section id="headline">
        <h1 id="heading">My Products</h1>
        <div class="left-side">
          <font-awesome-icon
          v-bind:class="{ 'view-icon': true, active: cardView }"
          v-on:click="cardView = true"
          icon="fa-solid fa-grip"
          title="View tiles"
        />
        <font-awesome-icon
          v-bind:class="{ 'view-icon': true, active: !cardView }"
          v-on:click="cardView = false"
          icon="fa-solid fa-table"
          title="View table"
        />
        <div id="search-box">
          <input name="search" id="search" type="text" placeholder="Search..." v-on:input="searchTerm($event.target.value)"/>
          <font-awesome-icon icon="fas fa-search" class="search-icon"/>
        </div>
        </div>  
        <p>The best place to find products for your solar geek needs. We have solar geek themed items from coffee mugs to 
          apparel to educational books with prices you cannot beat! Click each product available to see the product details. </p>
      </section>
      <section id="prod">
        <div class="product-cards" v-if=cardView>
            <product-card class="product-card" v-for="product in displayedProducts" v-bind:key="product.id" v-bind:product="product"/>
        </div>
        <product-table class="product-table" v-if=!cardView />
      </section>
  </div>
</template>

<script>
import ProductCard from '../components/ProductCard.vue'
import ProductTable from '../components/ProductTable.vue'
import productService from '../services/ProductService'

 export default {
  name: "products",
  components: {
    ProductCard,
    ProductTable
  },
  data() {
    return {
      cardView: true,
      searchActive: false,
      searchList: []
    };
  },
  methods: {
    searchTerm(searchValue) {
      if (searchValue.length > 0) {
        this.searchActive = true;
      } else {
        this.searchActive = false;
      }
      this.searchList=[];
      return this.searchList = this.$store.state.products.filter((product) => {
        return product.name.toLowerCase().includes(searchValue.toLowerCase());
    })}
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.token.length > 0;
    },
    displayedProducts() {
    return this.searchActive ? this.searchList : this.$store.state.products;
  }
 },
 created() {
        productService.getAllProducts().then((response) => {
        this.$store.commit("SET_PRODUCTS", response.data);
        })
        this.searchActive = false;
        this.searchList = [];
    }
  }
</script>

<style scoped>
* {
    font-family: serif;
}
.products {
    padding-bottom: 60px;
    overflow-y: scroll;
    height: 100%;
    padding-right: 20px;
    padding-left: 20px;
    font-family: fantasy;
}

#headline {
    display: grid;
    grid-template-columns: 4fr 2fr;
    grid-template-areas: 
    "heading other" 
    "intro intro";
}

#heading {
    grid-area: heading;
    align-self: center;
}

.left-side {
  grid-area: other;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-end;
}


.view-icon {
  font-size: 1.2rem;
  margin-right: 7px;
  padding: 3px;
  color: #444;
  border-radius: 3px;
}

.view-icon.active {
  background-color: lightgreen;
}

.view-icon:not(.active) {
  font-size: 1.2rem;
  margin-right: 7px;
  cursor: pointer;
}

.view-icon:not(.active):hover {
  color: blue;
  background-color: rgba(255, 255, 255, 0.7);
}

#search-box {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-self: end;
    width: 300px;
}

#search{
    height: 30px;
    width: 100%;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
} 

#search-box > .search-icon {
    color: gray;
    justify-content: flex-end;
    margin-left: -20px;
}

#headline > p {
    grid-area: intro;
    width: 100%;
}

.product-cards {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
}




/* table {
    width: 100%;
    height: 100%;
    border-collapse: collapse;
} */


/* tbody {
  display: block;
  height: 100%;
  overflow-y: scroll;
}

thead, tfoot {
  width: calc(100% - 17px);
  display: table;
  table-layout: fixed;
}

.headers > th {
    font-weight: bold;
    font-family: monospace;
    text-decoration: none;
    text-align: center;
} */

@media (max-width: 768px) {

      .product-card {
        margin-bottom: 25px;
        margin-right: 40px;
        gap: 20px;
    }

 }

 @media (max-width: 600px) {

      #heading {
        font-size: 40px;

      }
      .product-card {
        margin-bottom: 25px;
        margin-right: 40px;
    }

 }


</style>