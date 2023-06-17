<script setup lang="ts">
import { ref } from 'vue'
const props = defineProps<{
  board: {
    id: string
    name: string
  }
}>()

// const { board } = toRefs(props);

const text = ref('')

const emits = defineEmits(['onNewItem'])

const onSubmit = () => {
  if (text.value) {
    emits('onNewItem', text.value, props.board.id)
    text.value = ''
  }
}
</script>

<template>
  <div class="board-name">{{ board.name }}</div>
  <form action="" @submit.prevent="onSubmit">
    <label>
      <input
        class="input"
        v-model="text"
        :aria-label="`Add a new task to ${board.name} board`"
        maxlength="200"
        placeholder="Add a new task"
      />
    </label>
  </form>
</template>

<style>
.input {
  height: 35px;
  margin: 5px 0 10px;
  padding: 0 5px;
  border-radius: 5px;
  width: 100%;
}
.board-name {
  font-size: 16px;
  font-weight: 700;
  text-transform: capitalize;
}
</style>
