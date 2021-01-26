<template>
  <h1 class="text-white center" v-if="!allTask.length">Задач пока нет</h1>
  <h3 class="text-white" v-else>Всего активных задач: {{ activeTask }}</h3>
  <TasksPreview v-for="tsk in allTask" :key="tsk.id" :data="tsk" />
</template>

<script>
import TasksPreview from "../components/TasksPreview";
import { useStore } from "vuex";
import { computed } from "vue";

export default {
  setup() {
    const store = useStore();
    const activeTask = computed(() => store.getters.statusFilter);
    const allTask = computed(() => store.getters.tasks);
    return {
      activeTask,
      allTask
    };
  },
  components: { TasksPreview }
};
</script>

<style scoped>
.create-link {
  color: #556472;
  text-decoration: underline;
  cursor: pointer;
}
.create-link:hover {
  text-decoration: none;
}
</style>
