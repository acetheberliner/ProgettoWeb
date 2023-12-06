<script lang="ts">
    import { PropType, defineComponent } from 'vue';
    import { Nota } from '../types';

    export default defineComponent ({
        props: {
            nota: {
                type: Object as PropType<Nota>,
                required: true
            }
        }
    })
</script>

<template>
    <article>
        <h3>{{nota.titolo}}</h3>
        <p>{{nota.categoria}}</p>
        <p>{{nota.autore}}</p>
        <p>{{nota.testo}}</p>
    </article>
</template>