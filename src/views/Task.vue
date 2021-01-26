<template>
  <div class="card" v-if="task">
    <h2 v-text="task.title"></h2>
    <p><strong>Статус</strong>: <AppStatus :type="task.status" /></p>
    <p>
      <strong>Дэдлайн</strong>:
      {{ new Date(task.deadline).toLocaleDateString() }}
    </p>
    <p><strong>Описание</strong>: {{ task.discription }}</p>
    <div>
      <button class="btn" @click="changeStatus('pending')">
        Взять в работу
      </button>
      <button class="btn primary" @click="changeStatus('done')">
        Завершить
      </button>
      <button class="btn danger" @click="changeStatus('cancelled')">
        Отменить
      </button>
    </div>
  </div>
  <h3 class="text-white center" v-else>
    Задачи с id = <strong>{{ id }}</strong> нет.
  </h3>
</template>

<script>
import AppStatus from "../components/AppStatus";
import { useStore } from "vuex";
import { computed } from "vue";

export default {
  props: ["taskid"],
  setup(props) {
    const store = useStore();
    const task = computed(() =>
      store.getters.tasks.find(i => i.id === props.taskid)
    );
    function changeStatus(status) {
      store.dispatch("getIdChangedTaskStatus", {
        id: props.taskid,
        status: status
      });
    }
    return {
      changeStatus,
      task,
      id: props.taskid
    };
  },
  components: { AppStatus }
};
</script>
