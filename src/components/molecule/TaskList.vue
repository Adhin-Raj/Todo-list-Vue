<script setup>

import { defineProps } from 'vue'
import Button from '../atom/Button.vue';
import { useToast } from 'primevue';

const toast = useToast()

const { allTasks, newTaskValue } = defineProps({
    allTasks: {
        type: Array
    },
    newTaskValue: {
        type: String
    }
})

const emit = defineEmits(['done', 'remove', 'update'])


const done = (index) => {
    const updated = [...allTasks]
    const getTask = updated[index]
    getTask.isCompleted = true
    updated.sort((a, b) => a.isCompleted - b.isCompleted)
    emit('done', updated)
}

const update = (index) => {
    if (newTaskValue.trim() === '') {
        const updated = [...allTasks]
        const spliced = updated.splice(index, 1)
        const editTask = spliced[0].task
        emit('update', editTask)
        console.log("hi")
    }
    else {
        toast.add({ severity: 'Error', summary: 'Please add or remove the value in the input...!', life: 3000 });
    }
}

const remove = (index) => {
    const updated = allTasks.filter((_, i) => i !== index)
    emit('remove', updated)
}

</script>


<template>
    <ul v-if="allTasks.length > 0" class="flex items-center flex-col gap-2">
        <li v-for="(task, index) in allTasks"
            :class="`${task.isCompleted && 'line-through'} w-80 py-2 bg-gray-300 rounded-lg px-2 flex justify-between font-medium text-gray-800`">

            <span><i class="fa fa-thumb-tack text-sm mr-1" aria-hidden="true"></i>{{ task.task }}</span>
            <div class="flex gap-1.5">
                <Toast />
                <Button v-if="!task.isCompleted" className="bg-yellow-400 hover:bg-yellow-500 text-black"
                    :handleFun="done" :index="index"><i class="fa fa-check" aria-hidden="true"></i></Button>
                <Button className="bg-blue-400 hover:bg-blue-500" :handleFun="update" :index="index"><i
                        class="fa fa-pencil" aria-hidden="true"></i></Button>
                <Button className="bg-red-400 hover:bg-red-500" :handleFun="remove" :index="index"><i
                        class="fa fa-times" aria-hidden="true"></i></Button>
            </div>
        </li>
    </ul>

</template>