<script lang="ts">
    import { defineComponent } from 'vue'
    import axios from 'axios'
    import { Nota } from '../types'

    export default defineComponent({
        data() {
            return {
                datiNote: [] as Nota[]
            }
        },
        methods: {
            getNote() {
                axios.get("/api/note")
                    .then(response => this.datiNote = response.data)
            }
        },
        mounted() {
            this.getNote()
        }
    })
</script>

<template>
    <h2>Note di Studenti</h2>
    <article v-for="nota in datiNote">
        <h3>{{nota.titolo}}</h3>
        <p>{{nota.categoria}}</p>
        <p>{{nota.autore}}</p>
        <p>{{nota.testo}}</p>
    </article>
</template>