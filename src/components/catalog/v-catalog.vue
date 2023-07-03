<template>
<div>
    <div>
        <h1>Каталог</h1>
    </div>
    <VSelect :options="categories" @select="sortByCategories" :selected="selected" />
    <p>{{ selected }}</p>
    <div class="range-slider">
        <input type="range" min="0" max="10000" step="10" v-model.number="minPrice" @change="setRangeSlider">
        <input type="range" min="0" max="10000" step="10" v-model.number="maxPrice" @change="setRangeSlider">
    </div>
    <div class="range-values">
        <span>Min: {{ minPrice }}</span>
        <span>Max: {{ maxPrice }}</span>
    </div>
    <div class="v-catalog">
        <vCatalogItem v-for="product in filteredProducts" :key="product.article" v-bind:product_data="product" @addToCart="addToCart" />
    </div>
</div>
</template>

<script>
import VSelect from '../v-select'
import vCatalogItem from './v-catalog-item';

import {
    mapActions,
    mapGetters
} from 'vuex'
export default {

    name: 'v-catalog',
    components: {
        VSelect,
        vCatalogItem
    },
    props: {

    },
    data() {
        return {
            categories: [{
                    name: 'Все',
                    value: 'ALL'
                },
                {
                    name: 'second',
                    value: 'second'
                },
                {
                    name: 'first',
                    value: 'first'
                }
            ],
            selected: 'Все',
            sortedProducts: [],
            minPrice: 0,
            maxPrice: 10000
        }
    },
    computed: {
        ...mapGetters([
            'PRODUCTS',
            'CART'
        ]),
        filteredProducts() {
            if (this.sortedProducts.length) {
                return this.sortedProducts
            } else {
                return this.PRODUCTS
            }
        }
    },
    methods: {
        ...mapActions([
            'GET_PRODUCTS_FROM_API',
            'ADD_TO_CART'
        ]),

        setRangeSlider() {
            if (this.minPrice > this.maxPrice) {
                let tmp = this.maxPrice;
                this.maxPrice = this.minPrice;
                this.minPrice = tmp;
            }
            this.sortByCategories()
        },
        sortByCategories() {
            // this.sortedProducts = [];
            // let vm = this;
            // this.PRODUCTS.map(function (item) {
            //     if (item.category === category.name) {
            //         vm.sortedProducts.push(item);
            //     }
            // })
            // this.selected = category.name
            let vm = this;
            this.sortedProducts = [...this.PRODUCTS]
            this.sortedProducts = this.sortedProducts.filter(function (item) {
                return item.price >= vm.minPrice && item.price <= vm.maxPrice
            })

        },
        addToCart(data) {
            this.ADD_TO_CART(data)
        },

    },

    watch: {

    },
    mounted() {
        this.GET_PRODUCTS_FROM_API()
            .then((response) => {
                if (response.data) {
                    console.log('Products:', this.PRODUCTS); 
                    this.sortByCategories()
                }
            })
    }
}
</script>

<style>
.filters {
    display: flex;
    justify-content: space-between;
}

.range-slider {
    width: 200px;
    margin: auto 16px;
    text-align: center;
    position: relative;
}

.range-slider svg,
.range-slider input[type=range] {
    position: absolute;
    left: 0;
    bottom: 0;

}

input[type=range]::-webkit-slider-thumb {
    z-index: 2;
    position: relative;
    top: 2px;
    margin-top: -7px;

}

.v-catalog {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    margin: 0 auto;
    margin-bottom: -3rem;
    padding-top: 150px;
}

.v-catalog>* {
    width: calc(100% / 4 - 6rem);
    margin-right: 3rem;
    padding: 1.5rem;
    border-radius: 0.5rem;
    margin-bottom: 3rem;
    background-color: violet;
}

.v-catalog__link_to_cart {
    position: fixed;
    top: 2rem;
    right: 10rem;
    background: palevioletred;
    padding: 12px;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
}

.wrap {
    margin-top: 200px;
}
</style>
