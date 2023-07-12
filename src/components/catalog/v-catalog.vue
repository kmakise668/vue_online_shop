<!-- 

<template>
<div>
    <div>
        <h1>Каталог</h1>
    </div>
    <VSelect :options="categories" @select="handleSelect" :selected="selected" />

    <p>{{ selected.name }}</p>
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
</template> -->

<template>

    <div class="bg-white">
        <h2 class="text-2xl font-bold tracking-tight text-gray-900">Customers also purchased</h2>
        <VSelect :options="categories" @select="handleSelect" :selected="selected" />
        <div class="range-slider">
            <input type="range" min="0" max="20000" step="10" v-model.number="minPrice" @change="setRangeSlider">
            <input type="range" min="0" max="20000" step="10" v-model.number="maxPrice" @change="setRangeSlider">
        </div>
        <div class="range-values">
            <span>Min: {{ minPrice }}</span>
            <span>Max: {{ maxPrice }}</span>
        </div>

        <p>{{ selected.name }}</p>
        <div class="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">

            <vCatalogItem v-for="product in filteredProducts" :key="product.id" v-bind:product_data="product" @addToCart="addToCart" />

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
            selected: {
                name: 'Все',
                value: 'ALL'
            },
            sortedProducts: [],
            minPrice: 0,
            maxPrice: 20000
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
            this.selected = this.categories.find(category => category.value === this.selected.value);
            this.sortByCategories(this.selected);
        },
        sortByCategories(category) {
            let vm = this;
            if (category && category.value === 'ALL') {
                this.sortedProducts = [...this.PRODUCTS];
            } else if (category) {
                this.sortedProducts = this.PRODUCTS.filter(function (item) {
                    return item.category === category.value;
                });
            }
            this.sortedProducts = this.sortedProducts.filter(function (item) {
                return item.price >= vm.minPrice && item.price <= vm.maxPrice;
            });

            if (!category) {
                let selectedCategory = this.categories.find(category => category.value === this.selected.value);
                this.sortByCategories(selectedCategory);
            }
        },
        addToCart(data) {
            this.ADD_TO_CART(data)
        },
        handleSelect(option) {
            this.selected = option;
            // Другие действия, которые вы хотите выполнить при выборе опции
            this.sortByCategories(option);
        },
    },
    mounted() {
        this.GET_PRODUCTS_FROM_API()
            .then((response) => {
                if (response.data) {
                    console.log('Products:', this.PRODUCTS);
                    this.sortByCategories(this.selected)
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
</style>
