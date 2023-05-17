<template>
<html>
  <div id="app">
    <header>
      <img src="client/space-logo-design-free-vector.jpg" alt="Logo">
    </header>
    <nav>
      <router-link id="home" v-bind:to="{name: 'home'}">Home</router-link>
      <router-link id="cart" v-bind:to="{name: 'cart'}">Cart</router-link>
      <span id="message"></span>
      <router-link id="logout" v-bind:to="{ name: 'logout' }" v-if="$store.state.token">Logout</router-link>
      <router-link id="login" v-bind:to="{ name: 'login' }" v-else>Login</router-link>
    </nav>
    <main>
      <router-view />
    </main>
    <footer>
        <h4>&copy; All rights reserved.</h4>
    </footer>
  </div>
</html>
</template>

<style scoped>
* {
    font-family: serif;
}

#app {
    height: 100%;
    margin: 0px;
    padding: 0px;
    left: 0px;
    overflow: scroll;
    display: grid;
    grid-template-areas: 
    "header"
    "nav"
    "main"
    "footer";
}

header {
    grid-area: header;
    margin: 0px;
    padding: 0px;
    position: fixed;
    width: 100%;
    text-align: center;
    top: 0px;
    left: 0px;
    height: 100px;
    background-color:#DFD6C9;
    border: solid black;
}

header > img {
    display: block;
    margin-left: auto;
    margin-right: auto;
    height: 100px;
}

nav {
    grid-area: nav;
    margin: 0px;
    padding: 0px;
    position: fixed;
    top: 100px;
    left: 0px;
    width: 100%; 
    height: 40px;
    background-color: whitesmoke;
    border: solid black;
    margin-left: 0px;
    padding-inline-start: 20px;
    display: grid;
    grid-template-columns: .3fr .3fr 4fr .5fr;
    grid-template-areas:
    "first second third fourth";
}

nav > #home  {
    grid-area: first;
    display: flex;
    justify-content: flex-start;
    margin-right: 10px;
    text-decoration: none;
    color: black;
    font-size: 25px;
}

nav > #cart {
    grid-area: second;
    display: flex;
    margin-right: 10px;
    text-decoration: none;
    color: black;
    font-size: 25px;
}

nav > #message {
    grid-area: third;
    display: none;
    color: black;
    font-size: 16px;
    text-align: center;
    width: 90%;
    padding-top: 0px;
    padding-bottom: 2px;
    text-decoration: none;
}

nav > #logout, #login {
    grid-area: fourth;
    display: flex;
    justify-content: flex-end;
    margin-right: 30%;
    text-decoration: none;
    color: black;
    font-size: 25px;
}

main {
    grid-area: main;
    padding-top: 180px;
    padding-bottom: 60px;
    overflow: auto;
    height: 100%;
}

footer {
    grid-area: footer;
    position: fixed;
    bottom: 0px;
    width: 100%;
    height: 60px;
    background-color: whitesmoke;
    border: solid black;
    left: 0px;

}

footer > h4 {
    padding-bottom: 5px;
    padding-left: 20px;
}

@media (max-width: 768px) {
    
    #message {
        width: 90%;
        text-align: center;
    }

    #logout, #login  {
        margin-right: 40%;
    }

 }

 @media (max-width: 600px) {


    #message {
        width: 80%;
        text-align: center;
    }

    #logout, #login {
        margin-right: 70%;
    }

 }
</style>