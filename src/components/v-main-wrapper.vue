<template>
<div class="v-main-wrapper">
    {{ title }}
  <!-- <keep-alive> -->
    <router-view></router-view>
  <!-- </keep-alive> -->
  
</div>
</template>

<script>



export default {
    name: 'v-main-wrapper',
    components: {
 
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
