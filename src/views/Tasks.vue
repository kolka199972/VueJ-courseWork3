<template>
  <h1 class="text-white center" v-if="tasks.length === 0">Задач пока нет</h1>
  <div v-else>
    <h3 class="text-white">Всего активных задач: {{numberActiveTasks}}</h3>
    <div class="card" v-for="task in tasks" :key="task.id">
      <h2 class="card-title">
        {{task.titleName}}
        <AppStatus :type="task.statusType" />
      </h2>
      <p>
        <strong>
          <small>
            {{new Date(task.date).toLocaleDateString()}}
          </small>
        </strong>
      </p>
      <button class="btn primary" @click="open(task.id)">Посмотреть</button>
    </div>
  </div>
</template>

<script>
import AppStatus from '../components/AppStatus'
import {useStore} from 'vuex'
import {useRouter} from 'vue-router'
import {computed} from 'vue'

export default {
  setup() {
    const store = useStore()
    const tasks = computed(() => store.getters.tasks)
    const numberActiveTasks = computed(() => store.getters.numberActiveTasks)
    const router = useRouter()

    return {
      tasks,
      numberActiveTasks,
      open: id => router.push(`/task/${id}`)
    }
  },
  components: {AppStatus}
}
</script>
