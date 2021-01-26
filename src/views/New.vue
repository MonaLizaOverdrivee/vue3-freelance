<template>
  <form class="card" @submit.prevent="submitForm">
    <h1>Создать новую задачу</h1>
    <div class="form-control">
      <label for="title">Название</label>
      <input type="text" id="title" v-model="data.title" />
    </div>

    <div class="form-control">
      <label for="date">Дата дэдлайна</label>
      <input type="date" id="date" v-model="data.deadline" />
    </div>

    <div class="form-control">
      <label for="description">Описание</label>
      <textarea id="description" v-model="data.discription"></textarea>
    </div>

    <button class="btn primary" type="submit" :disabled="!btnActive">
      Создать
    </button>
  </form>
</template>

<script>
import { reactive, computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default {
  setup() {
    const data = reactive({
      title: "",
      discription: "",
      deadline: ""
    });
    const status = computed(() =>
      new Date(data.deadline) < Date.now() ? "cancelled" : "active"
    );
    const btnActive = computed(
      () => data.title && data.discription && data.deadline
    );
    const router = useRouter();
    const store = useStore();
    function submitForm() {
      // console.log(status.value, new Date(data.deadline) < Date.now() ? 'cancelled' : 'active')
      store.dispatch("recordTask", {
        status: status.value,
        ...data
      });
      // data.title = ''
      // data.discription = ''
      // data.deadline = ''
      router.push("/");
    }
    return {
      data,
      submitForm,
      btnActive
    };
  }
};
</script>
