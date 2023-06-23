<template>
<div class="v-catalog">
    <vCatalogItem v-for="product in products" :key="product.article" v-bind:product_data="product" @sendArticle="showChildArticleInConsole"/>
</div>
</template>

<script>
import vCatalogItem from './v-catalog-item';
export default {

    name: 'v-catalog',
    components: {
        vCatalogItem
    },
    props: {
   
    },
    data() {

        return {
            "products": [{
                    image: "1.png",
                    name: "T-shirt 1",
                    price: 100,
                    article: "T1",
                    available: true
                },
                {
                    image: "2.png",
                    name: "T-shirt 2",
                    price: 200,
                    article: "T2",
                    available: true
                }
            ]
        }
    },
    computed: {

    },
    methods: {
        showChildArticleInConsole(data) {
            console.log(data);
        }
    },
    watch: {

    },
    mounted() {}
}
</script>

<style>
.v-catalog {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    margin: 0 auto;
    margin-bottom: -3rem;
}

.v-catalog>* {
    width: calc(100% / 4 - 6rem);
    margin-right: 3rem;
    padding: 1.5rem;
    border-radius: 0.5rem;
    margin-bottom: 3rem;
    background-color: violet;
}
</style>
