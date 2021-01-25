<template>
  <div class="card">
    <h2 class="card-title">
      {{ task.title }}
      <AppStatus :type="task.status" />
    </h2>
    <p>
      <strong>
        <small>
          {{ new Date(task.deadline).toLocaleString() }}
        </small>
      </strong>
    </p>
    <router-link :to="'/task/' + task.id" v-slot="{ navigate }">
      <button class="btn primary" @click="navigate">Посмотреть</button>
    </router-link>
  </div>
</template>

<script>
import AppStatus from "./AppStatus";
import { reactive } from "vue";

export default {
  props: ["data"],
  setup(props) {
    const task = reactive(props.data);
    return {
      task
    };
  },
  components: { AppStatus }
};
</script>

<style></style>
