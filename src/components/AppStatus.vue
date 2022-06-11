<template>
  <span :class="['badge', className]">{{statusName}}</span>
</template>

<script>
import { watch } from '@vue/runtime-core'
import {useStore} from 'vuex'
import {ref} from 'vue'

export default {
  props: ['type'],
  setup(props) {
    const createNames = (value) => {
      if (value === 'active') {
        statusName.value = 'активен'
        className.value = 'primary'
      } else if (value === 'cancelled') {
        statusName.value = 'отменен'
        className.value = 'danger'
      } else if (value === 'done') {
        statusName.value = 'завершен'
        className.value = 'primary'
      } else if (value === 'pending') {
        statusName.value = 'выполняется'
        className.value = 'warning'
      }
    }
    const store = useStore()
    const tasks = store.getters.tasks
    const className = ref('')
    const statusName = ref('')

    createNames(props.type)

    watch(props, (value) => {
      createNames(value.type)
    })

    return {
      tasks,
      statusName,
      className
    }
  }
}
</script>
