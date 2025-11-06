<script setup>
import { defineProps } from 'vue';

defineProps({
    className: {
        type: String
    },
    handleFun: {
        type: Function
    },
    index: {
        type: Number
    }
})

</script>

<template>
    <button :class="`${className} w-6 text-white rounded-md cursor-pointer h-6`" @click="handleFun(index)">
        <slot></slot>
    </button>
</template>