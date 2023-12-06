<script lang="ts">
    import { defineComponent } from 'vue'
    import axios from 'axios'
    import { Nota } from '../types'
    import PostNotes from '../components/posts-notes.vue'

    export default defineComponent({
    components: {PostNotes},
    data() {
        return {
            datiNote: [] as Nota[]
        };
    },
    methods: {
        getNote() {
            axios.get("/api/note")
                .then(response => this.datiNote = response.data);
        }
    },
    mounted() {
        this.getNote();
    },
})
</script>

<template>
    <h2>Note di Studenti</h2>
    <PostNotes v-for="nota in datiNote" :nota="nota"/>
</template>