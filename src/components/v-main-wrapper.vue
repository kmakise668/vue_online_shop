<template>
<div class="v-main-wrapper">
    {{ title }}
    <vCart />
    <vCatalog />
</div>
</template>

<script>
import vCart from './v-cart';
import vCatalog from './v-catalog';

export default {
    name: 'v-main-wrapper',
    components: {
        vCart,
        vCatalog,
    },
    props: {},
    data() {
        return {
            title: 'Main wrapper'
        }
    },
    computed: {

    },
    methods: {

    },
    watch: {

    },
    mounted() {
        console.log('Hello i am alive!');
    }
}
</script>

<style>
.v-main-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

}
@import "../assets/styles/style.scss";

</style>
