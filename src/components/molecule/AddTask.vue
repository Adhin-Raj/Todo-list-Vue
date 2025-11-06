<script setup>

import { defineProps } from 'vue';

defineProps({
  handleSubmit: {
    type: Function
  },
  newTask: {
    type: String
  }
})

const emit = defineEmits(['update:newTask'])

function onInput(e) {
  emit('update:newTask', e.target.value)
}


</script>


<template>
  <form @submit.prevent="handleSubmit" class="flex justify-center mt-5">
    <label class="self-center text-xl mr-1" for="newTask">Add new task:</label>
    <input class="px-2 py-2 border border-gray-200 rounded-md" type="text" name="newTask" id="newTask" :value="newTask"
      @change="onInput">
    <Toast />
    <button class="ml-2 w-14 h-10.5 bg-green-500 hover:bg-green-600 text-white rounded-lg cursor-pointer"><i
        class="fa fa-plus" aria-hidden="true"></i></button>
  </form>
</template>