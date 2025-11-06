<script setup>
import { ref } from 'vue';
import { useToast } from 'primevue/usetoast';

let newTask = ref('')
let allTasks = ref([])

const toast = useToast();

const handleSubmit = () => {
  if (newTask.value.trim() === '') {
   toast.add({ severity: 'Error', summary: 'Enter your Task...!', life: 3000 });
  }
  else{
    allTasks.value.push({ task: newTask.value, isCompleted: false })
    newTask.value = ''    
  }
}

const handleDone = (index) => {
  const getTask = allTasks.value[index]
  getTask.isCompleted = true
  allTasks.value
   allTasks.value.sort((a,b)=>a.isCompleted - b.isCompleted)
}

const handleEdit = (index) => {
  if (newTask.value.trim() === '') {
    const spliced = allTasks.value.splice(index, 1)
    newTask.value = spliced[0].task
  }
  else {
    toast.add({ severity: 'Error', summary: 'Please add or remove the value in the input...!', life: 3000 });
  }
}

const handleDelete = (index) => {
  allTasks.value.splice(index, 1)
}


</script>

<template>  
  
  <h1 class="text-3xl font-bold text-center mt-3">Todo List</h1>
  <form @submit.prevent="handleSubmit" class="flex  justify-center mt-5">
    <label class="self-center text-xl mr-1" for="newTask">Add new task:</label>
    <input class="px-2 py-2 border border-gray-200 rounded-md" type="text" name="newTask" id="newTask"
      v-model="newTask">
 <Toast/>
    <button  class="ml-2 w-14 h-10.5 bg-green-500 hover:bg-green-600 text-white rounded-lg cursor-pointer"><i
        class="fa fa-plus" aria-hidden="true"></i></button>
  </form>

  <h3 v-if="allTasks.length > 0" class="my-5 text-center text-xl text-red-700 font-bold">All Tasks</h3>
  <ul class="flex items-center flex-col gap-2">
    <li v-for="(task, index) in allTasks"
      :class="`${task.isCompleted && 'line-through'} w-80 py-2 bg-gray-300 rounded-lg px-2 flex justify-between font-medium text-gray-800`">
      <span><i class="fa fa-thumb-tack text-sm mr-1" aria-hidden="true"></i>{{ task.task }}</span>
      <div class="flex gap-1.5">
        <button v-if="!task.isCompleted"
          class="bg-yellow-400 w-6 text-black rounded-md cursor-pointer hover:bg-yellow-500 h-6"
          @click="handleDone(index)">
          <i class="fa fa-check" aria-hidden="true"></i>
        </button>
    <Toast/>
        <button class="bg-blue-400 w-6 text-white rounded-md cursor-pointer hover:bg-blue-500 h-6"
          @click="handleEdit(index)">
          <i class="fa fa-pencil" aria-hidden="true"></i>
        </button>
        <button class="bg-red-400 w-6 text-white rounded-md cursor-pointer hover:bg-red-500 h-6"
          @click="handleDelete(index)">
          <i class="fa fa-times" aria-hidden="true"></i>
        </button>

      </div>
    </li>
  </ul>

</template>

<style scoped></style>
