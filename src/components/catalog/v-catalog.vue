<template>
<div class="bg-white">
    <h2 class="text-2xl font-bold tracking-tight text-gray-900">
        Customers also purchased
    </h2>
    <form class="group relative">
        <svg width="20" height="20" fill="currentColor" class="absolute left-3 top-1/2 -mt-2.5 text-slate-400 pointer-events-none group-focus-within:text-blue-500" aria-hidden="true">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" />
        </svg>
        <input class="focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-10 ring-1 ring-slate-200 shadow-sm" type="text" aria-label="Filter projects" placeholder="Поиск..." v-model="searchQuery" @input="search" />
    </form>
    <VSelect :options="categories" @select="handleSelect" :selected="selected" />
    <div class="range-slider">
        <input type="range" min="0" max="20000" step="10" v-model.number="minPrice" @change="setRangeSlider" />
        <input type="range" min="0" max="20000" step="10" v-model.number="maxPrice" @change="setRangeSlider" />
    </div>
    <div class="range-values">
        <span>Min: {{ minPrice }}</span>
        <span>Max: {{ maxPrice }}</span>
    </div>

    <p>{{ selected.name }}</p>

    <div class="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        <vCatalogItem v-for="product in filteredProducts" :key="product.id" :product_data="product" @addToCart="addToCart" />
        <div v-if="filteredProducts.length === 0" class="text-gray-500 text-center py-10">
            Ничего не найдено.
        </div>
    </div>
    <div class="fixed bottom-5 right-5">
        <transition-group name="slide-right">
            <div v-for="(item, index) in addedItems" :key="item.id" :style="{ transitionDelay: `${index * 100}ms` }" class="relative mt-3">

                <div class="bg-white p-4 pr-8 shadow-md flex items-center rounded-lg">
                    <div class="bg-green-100 w-10 h-10 rounded-md flex items-center justify-center">
                        <CheckCircleIcon class="w-7 h-7 text-green-300" />
                    </div>
                    <div class="ml-4 mr-20 ">
                        <a href="/cart" class="font-semibold text-sm">Корзина</a>
                        <div class="text-xs text-gray-500">Товар добавлен в корзину</div>
                    </div>
                    <button @click="dismissNotification(item.id)" class="absolute top-5 right-5 text-gray-500 hover:text-gray-700">
                        <XIcon class="w-5 h-5 text-black-300 hover:text-red-700" />
                    </button>
                </div>
            </div>
        </transition-group>
    </div>
</div>
</template>

<script>
import VSelect from "../v-select";
import vCatalogItem from "./v-catalog-item";
import {
    CheckCircleIcon,
    XIcon
} from "@heroicons/vue/outline";
import {
    mapActions,
    mapGetters
} from "vuex";

export default {
    name: "v-catalog",
    components: {
        VSelect,
        vCatalogItem,
        CheckCircleIcon,
        XIcon,
    },
    data() {
        return {
            categories: [{
                    name: "Все",
                    value: "ALL",
                },
                {
                    name: "second",
                    value: "second",
                },
                {
                    name: "first",
                    value: "first",
                },
            ],
            selected: {
                name: "Все",
                value: "ALL",
            },
            sortedProducts: [],
            minPrice: 0,
            maxPrice: 20000,
            searchQuery: "",
            showNotification: false,
            addedItems: [],
        };
    },
    computed: {
        ...mapGetters(["PRODUCTS", "CART"]),
        filteredProducts() {
            let filtered = this.sortedProducts.length ?
                this.sortedProducts :
                this.PRODUCTS;
            filtered = filtered.filter((product) =>
                product.name.toLowerCase().includes(this.searchQuery.toLowerCase())
            );
            return filtered;
        },
        noResultsFound() {
            return (
                this.searchQuery.length > 0 && this.filteredProducts.length === 0
            );
        },
    },
    methods: {
        ...mapActions(["GET_PRODUCTS_FROM_API", "ADD_TO_CART"]),
        setRangeSlider() {
            if (this.minPrice > this.maxPrice) {
                let tmp = this.maxPrice;
                this.maxPrice = this.minPrice;
                this.minPrice = tmp;
            }
            this.selected = this.categories.find(
                (category) => category.value === this.selected.value
            );
            this.sortByCategories(this.selected);
        },
        sortByCategories(category) {
            let vm = this;
            if (category && category.value === "ALL") {
                this.sortedProducts = [...this.PRODUCTS];
            } else if (category) {
                this.sortedProducts = this.PRODUCTS.filter(
                    (item) => item.category === category.value
                );
            }
            this.sortedProducts = this.sortedProducts.filter(
                (item) => item.price >= vm.minPrice && item.price <= vm.maxPrice
            );

            if (!category) {
                let selectedCategory = this.categories.find(
                    (category) => category.value === this.selected.value
                );
                this.sortByCategories(selectedCategory);
            }
        },
        addToCart(data) {
            this.ADD_TO_CART(data);
            this.showNotification = true;
        

            const newItem = {
                id: Date.now(),
                data: data,
            };
            this.addedItems.push(newItem);
            setTimeout(() => {
                const index = this.addedItems.findIndex(item => item.id === newItem.id);
                if (index !== -1) {
                    this.addedItems.splice(index, 1);
                }
            }, 2000);
        },
        dismissNotification(itemId) {
            this.addedItems = this.addedItems.filter((item) => item.id !== itemId);
        },
        handleSelect(option) {
            this.selected = option;
            this.sortByCategories(option);
        },
        search() {
            this.sortByCategories(this.selected);
        },
    },
    mounted() {
        this.GET_PRODUCTS_FROM_API().then((response) => {
            if (response.data) {
                console.log("Products:", this.PRODUCTS);
                this.sortByCategories(this.selected);
            }
        });
    },
};
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
.range-slider input[type="range"] {
    position: absolute;
    left: 0;
    bottom: 0;
}

input[type="range"]::-webkit-slider-thumb {
    z-index: 2;
    position: relative;
    top: 2px;
    margin-top: -7px;
}

.slide-right-enter-active {
    transition: transform 0.3s ease-out;
}

.slide-right-enter {
    transform: translateX(100%);
}

.slide-right-leave-active {
    transition: transform 0.3s ease-in;
}

.slide-right-leave-to {
    transform: translateX(100%);
}
</style>
