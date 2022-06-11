<template>
  <form class="card">
    <h1>Создать новую задачу</h1>
    <div class="form-control">
      <label for="title">Название</label>
      <input type="text" id="title" v-model="titleName">
    </div>

    <div class="form-control">
      <label for="date">Дата дэдлайна</label>
      <input type="date" id="date" v-model="date">
    </div>

    <div class="form-control">
      <label for="description">Описание</label>
      <textarea id="description" v-model="description"></textarea>
    </div>

    <button :disabled="!isValid" class="btn primary" @click.prevent="createNewTask">Создать</button>
  </form>
</template>

<script>
import {ref, watch} from 'vue'
import store from '@/store'
import {useRouter} from 'vue-router'

export default {
  setup() {
    const titleName = ref('')
    const date = ref('')
    const description = ref('')
    const isValid = ref(false)
    const router = useRouter()
    let dateCurrent = ''

    watch([titleName, date, description], (newValues) => {
      isValid.value = newValues[0] && newValues[1] && newValues[2]
      dateCurrent = new Date(date.value).getTime()
    })

    const createNewTask = () => {
      store.dispatch('createTask', {
        id: dateCurrent,
        date: dateCurrent,
        titleName: titleName.value,
        description: description.value,
        statusType: dateCurrent > Date.now() ? 'active' : 'cancelled'
      })
      router.push('/')
    }

    return {
      titleName,
      date,
      description,
      isValid,
      createNewTask
    }
  }
}
</script>
