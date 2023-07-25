<template>
<div class="">

    <h2 class="text-3xl mb-4 font-bold tracking-tight text-gray-900">Каталог товаров</h2>
    <p class="text-gray-500 font-normal text-sm mb-12">Lorem, ipsum dolor sit amet consectetur adipisicing elit. <br/> Quidem architecto atque maiores praesentium aliquid ea laborum quisquam vero! Laborum, aut.</p>
    <vBreadcrumbs />

    <div class="flex">
        <div class="mr-10 w-72 flex-shrink-0">
            <VSelect :options="categories" @select="handleSelect" :selected="selected" />
            <div class="range-slider mt-10">
                
                <input type="range" min="0" max="20000" step="10" v-model.number="minPrice" @change="setRangeSlider" />
                <input type="range" min="0" max="20000" step="10" v-model.number="maxPrice" @change="setRangeSlider" />
            </div>
            <div class="range-values flex items-center justify-between">
                <div class=" mt-5  text-gray-600 border border-blue-300 text-xs font-medium rounded-md p-4  h-5 w-20 flex items-center justify-center"> {{ minPrice }}</div>
                <div class=" mt-5  text-gray-600 border border-blue-300 text-xs font-medium rounded-md p-4  h-5 flex w-20  items-center justify-center"> {{ maxPrice }}</div>
            </div>
        </div>

        <div class="flex-grow ">
            <form class="group relative shadow-md ">
                <SearchIcon class="text-slate-500 absolute w-5 h-5 top-2.5 left-2.5" />
                <input class="focus:ring-2 focus:ring-blue-300 focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-10 ring-1 ring-blue-200 shadow-sm" type="text" aria-label="Filter projects" placeholder="Поиск..." v-model="searchQuery" @input="search" />
            </form>
            <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                <vCatalogItem v-for="product in filteredProducts" :key="product.id" :product_data="product" @addToCart="addToCart" />
                <div v-if="filteredProducts.length === 0" class="text-gray-500 text-center bg-gray-100 py-10 flex items-center justify-center flex-col">
                    <XCircleIcon  class=" w-1/5 flex items-center text-gray-400  justify-center mb-2"  />
                    <p class="">Ничего не найдено</p>
                </div>
            </div>
        </div>
    </div>
    <div class="fixed bottom-5 right-5">
        <transition-group name="slide-right">
            <div v-for="(item, index) in addedItems" :key="item.id" :style="{ transitionDelay: `${index * 100}ms` }" class="relative mt-3">

                <div class="bg-white p-4 pr-8 shadow-md flex items-center rounded-lg">
                    <div class="bg-blue-100 w-10 h-10 rounded-md flex items-center justify-center">
                        <CheckCircleIcon class="w-7 h-7 text-blue-300" />
                    </div>
                    <div class="ml-4 mr-20 ">
                        <router-link :to="{ name: 'cart' }" class="font-semibold text-sm">Корзина</router-link>
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
    XIcon,
    SearchIcon,
    XCircleIcon
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
        XCircleIcon,
        SearchIcon
  
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
    width: 100%;
    text-align: center;
    position: relative;
    
}

.range-slider svg,
.range-slider input[type="range"] {
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    height: 2px;
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
