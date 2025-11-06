<script setup>
import { ref } from 'vue';
import { useToast } from 'primevue/usetoast';
import AddTask from '../molecule/AddTask.vue';
import TaskList from '../molecule/TaskList.vue';

let newTask = ref('')
let allTasks = ref([])

const toast = useToast();

const handleSubmit = () => {
    if (newTask.value.trim() === '') {
        toast.add({ severity: 'Error', summary: 'Enter your Task...!', life: 3000 });
    }
    else {
        allTasks.value.push({ task: newTask.value, isCompleted: false })
        newTask.value = ''
    }
}

const done = (data) => {
    allTasks.value = data
}

const remove = (data) => {
    allTasks.value = data
}

const update = (data) => {
    allTasks.value = allTasks.value.filter((item) => item.task !== data)
    newTask.value = data
}

</script>


<template>
    <h1 class="text-3xl font-bold text-center mt-3">Todo List</h1>

    <AddTask :handleSubmit="handleSubmit" v-model:newTask="newTask" />

    <h3 v-if="allTasks.length > 0" class="my-5 text-center text-xl text-red-700 font-bold">All Tasks</h3>

    <TaskList :all-tasks="allTasks" v-model:new-task-value="newTask" @done="done" @remove="remove" @update="update" />

</template>