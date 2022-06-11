<template>
  <div class="card" v-if="task">
    <h2>{{task.titleName}}</h2>
    <p><strong>Статус</strong>: <AppStatus :type="task.statusType" /></p>
    <p><strong>Дэдлайн</strong>: {{ new Date(task.date).toLocaleDateString() }}</p>
    <p><strong>Описание</strong>: {{task.description}}</p>
    <div>
      <button class="btn" @click="changeTaskType('pending')">Взять в работу</button>
      <button class="btn primary" @click="changeTaskType('done')">Завершить</button>
      <button class="btn danger" @click="changeTaskType('cancelled')">Отменить</button>
    </div>
  </div>
  <h3 class="text-white center" v-else>
    Задачи с id = <strong>{{id}}</strong> нет.
  </h3>
</template>

<script>
import {useStore} from 'vuex'
import {computed} from 'vue'
import {useRoute} from 'vue-router'
import AppStatus from '../components/AppStatus'

export default {
  setup() {
    const store = useStore()
    const route = useRoute()
    const id = +route.path.split('/')[2]

    const task = computed(() => store.getters.activeTask(id))

    const changeTaskType = statusType => {
      const updated = {...task.value, statusType}
      store.dispatch('changeTask', updated)
    }

    return {
      task,
      changeTaskType,
      id
    }
  },
  components: {AppStatus}
}
</script>
