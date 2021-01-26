<template>
  <the-navbar></the-navbar>
  <div class="container with-nav">
    <router-view />
  </div>
</template>

<script>
import TheNavbar from "./components/TheNavbar";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    store.dispatch("loadTasks");
  },
  components: {
    TheNavbar
  }
};
</script>

<style></style>
