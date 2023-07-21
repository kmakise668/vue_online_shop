<template>
<div class="group relative v-catalog-item bg-white">
    <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-white transform scale-1 transition duration-500 brightness-95  lg:aspect-none group-hover:scale-2 group-hover:brightness-100 lg:h-80">
        <router-link :to="`/catalog/${convertToSlug(product_data.name)}/${product_data.id}`">
        <img :src="require('@/assets/images/' + product_data.image)" class=" bg-white h-full w-full object-cover  object-center lg:h-full lg:w-full" />
    </router-link>
    </div>
    <div class="mt-4 flex justify-between">
        <div>
            <h3 class="text-sm text-gray-700">
                <router-link :to="`/catalog/${convertToSlug(product_data.name)}/${product_data.id}`">
  <span aria-hidden="true" class="hover:bg-indigo-500" />
  {{ product_data.name }}
</router-link>

            </h3>
            <p class="mt-1 text-sm text-gray-500">Black {{ product_data.id }}</p>
        </div>
        <p class="text-sm font-medium text-gray-900"> {{ product_data.price }}</p>

    </div>
    <button class="btn v-catalog-item__add_to_cart flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 mt-4 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600" @click="addToCart">Добавить в корзину</button>
</div>
</template>

<script>

export default {

    name: 'v-catalog-item',
    components: {

    },
    props: {
        product_data: {
            type: Object,
            default () {
                return {}
            }
        }
    },
    data() {
        return {

        }
    },
    computed: {

    },
    methods: {
        addToCart() {
            this.$emit('addToCart', this.product_data)
        },

        convertToSlug() {
            const transliterationTable = {
                а: 'a',
                б: 'b',
                в: 'v',
                г: 'g',
                д: 'd',
                е: 'e',
                ё: 'yo',
                ж: 'zh',
                з: 'z',
                и: 'i',
                й: 'y',
                к: 'k',
                л: 'l',
                м: 'm',
                н: 'n',
                о: 'o',
                п: 'p',
                р: 'r',
                с: 's',
                т: 't',
                у: 'u',
                ф: 'f',
                х: 'h',
                ц: 'c',
                ч: 'ch',
                ш: 'sh',
                щ: 'shch',
                ъ: '',
                ы: 'y',
                ь: '',
                э: 'e',
                ю: 'yu',
                я: 'ya',
            };
            const slug = this.product_data.name
                .toLowerCase()
                .split('')
                .map((char) => (transliterationTable[char] ? transliterationTable[char] : char))
                .join('')
                .replace(/[^a-z0-9-]/g, '-')
                .replace(/--+/g, '-')
                .replace(/^-|-$/g, '');

            return slug;

        },

    },

    watch: {

    },
    mounted() {
        this.$emit('update:cart_item_data', {
            ...this.product_data,
            quantity: 1
        });
    }
}
</script>

<style></style>
