<script lang="ts">
import {useCounter} from '../composables/useCounter'
import {isVue3, isVue2, defineComponent} from 'vue-demi'
console.log('isVue3', isVue3)
console.log('isVue2', isVue2)
export default defineComponent({
  props: {
    /**
     * The message to display
     */
    msg: {
      type: String,
      default: 'hello world',
    },
  },
  setup() {
    const {count, increment, decrement} = useCounter()
    return {count, increment, decrement}
  },
})
</script>
<template>
  <div>
    <button @click="increment">Increment</button>
    <span>{{ count }}</span>
    <button @click="decrement">Decrement</button>
  </div>
</template>
<style></style>
