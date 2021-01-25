export default {
  state() {
    return {
      tasks: [
        {
          id: 123123213,
          status: "active",
          deadline: 1610537843066,
          discription: "lorem lorem lorem lorem",
          title: "Task title"
        }
      ]
    };
  },
  getters: {
    tasks: ({ tasks }) => tasks,
    statusFilter: ({ tasks }) =>
      tasks.filter(task => task.status === "active").length
  },
  mutations: {
    ADD_TASK(state, task) {
      state.tasks.push(task);
    },
    CHANGE_STATUS(state, payload) {
      state.tasks.forEach(i => {
        if (i.id === +payload.id) i.status = payload.status;
      });
    }
  },
  actions: {
    async loadTasks({ state }) {
      const response = await fetch(`${process.env.URL}tasks.json`, {
        method: "GET"
      });
      state.tasks = Object.keys(response).map(i => ({
        id: i,
        ...response[i]
      }));
    },
    async recordTask({ commit }, task) {
      await fetch("url", {
        method: "POST",
        "Content-type": "aplication/json",
        body: JSON.stringify(task)
      });
      commit("ADD_TASK", task);
    },
    async getIdChangedTaskStatus({ commit }, payload) {
      await fetch(`${process.env.URL}tasks/${payload.id}.json`, {
        method: "PATCH",
        "Content-type": "aplication/json",
        body: JSON.stringify({ status: payload.status })
      });
      commit("CHANGE_STATUS", payload);
    }
  }
};
