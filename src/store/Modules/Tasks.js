export default {
  state() {
    return {
      tasks: []
    };
  },
  getters: {
    tasks: ({ tasks }) => tasks,
    statusFilter: ({ tasks }) =>
      tasks.filter(task => task.status === "active").length
  },
  mutations: {
    ADD_TASK(state, task) {
      state.tasks.unshift(task);
    },
    CHANGE_STATUS(state, payload) {
      state.tasks.forEach(i => {
        if (i.id === payload.id) i.status = payload.status;
      });
    }
  },
  actions: {
    async loadTasks({ state }) {
      const response = await fetch(`${process.env.VUE_APP_FIREBASE}.json`, {
        method: "GET"
      });
      const firebaseResponse = await response.json();
      console.log(firebaseResponse);
      if (firebaseResponse) {
        state.tasks = Object.keys(firebaseResponse).map(i => ({
          id: i,
          ...firebaseResponse[i]
        }));
      }
      console.log(state.tasks);
    },
    async recordTask({ commit }, task) {
      const response = await fetch(`${process.env.VUE_APP_FIREBASE}.json`, {
        method: "POST",
        "Content-type": "aplication/json",
        body: JSON.stringify(task)
      });
      const firebaseResponse = await response.json();
      commit("ADD_TASK", {
        id: firebaseResponse.name,
        ...task
      });
      console.log({
        id: firebaseResponse.name,
        ...task
      });
    },
    async getIdChangedTaskStatus({ commit }, payload) {
      await fetch(`${process.env.VUE_APP_FIREBASE}/${payload.id}.json`, {
        method: "PATCH",
        "Content-type": "aplication/json",
        body: JSON.stringify({ status: payload.status })
      });
      commit("CHANGE_STATUS", payload);
    }
  }
};
