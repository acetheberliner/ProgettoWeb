<script lang="ts">
import { defineComponent } from "vue";
import { Nota } from "../types";
import axios from "axios";

export default defineComponent({
    props: {
        nota: {
            type: Object as () => Nota
        }
    },
    data() {
        return {
            notes: null as Nota | null, 
        };
    },
    methods: {

    },
    mounted() {

    }
});
</script>

<template>
</template>

<style scoped>
</style>