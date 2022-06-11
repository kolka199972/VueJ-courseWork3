import {createStore} from 'vuex'

export default createStore({
  state() {
    return {
      tasks: JSON.parse(localStorage.getItem('tasks')) || []
    }
  },
  mutations: {
    createTask(state, task) {
      state.tasks.push(task)
      localStorage.setItem('tasks', JSON.stringify(state.tasks))
    },
    changeTask(state, task) {
      const idx = state.tasks.findIndex(t => t.id === task.id)
      state.tasks[idx] = task
      localStorage.setItem('tasks', JSON.stringify(state.tasks))
    }
  },
  actions: {
    changeTask(state, task) {
      state.commit('changeTask', task)
    },
    createTask(state, task) {
      state.commit('createTask', task)
    }
  },
  getters: {
    tasks(state) {
      return state.tasks
    },
    numberActiveTasks(state) {
      let number = 0
      state.tasks.forEach(task => {
        number = task.statusType === 'active' ? number + 1 : number
      })
      return number
    },
    activeTask(_, getters) {
      return id => getters.tasks.find(task => +task.id === +id)
    }
  }
})
