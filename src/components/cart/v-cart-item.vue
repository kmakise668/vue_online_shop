<template>
<div class="v-cart-item  flex py-5 px-5 items-center shadow-sm border-solid border-b border-gray-100 " :key="cart_item_data.id">
    <div class="w-1/2 flex items-center mr-20">
       <router-link  :to="`/catalog/${convertToSlug(cart_item_data.name)}/${cart_item_data.id}`" class="overflow-hidden bg-white rounded-md  mr-6 p-3 shadow-sm flex flex-shrink-0">
        <img :src="require('@/assets/images/'  + cart_item_data.image)" alt="img" class="w-20  transition   duration-300 transform scale-1 hover:scale-110">
      </router-link>
        <div class="">
          <div class="v-cart-item__article text-gray-400 text-xs font-medium">{{ cart_item_data.article }}</div>
          <router-link  :to="`/catalog/${convertToSlug(cart_item_data.name)}/${cart_item_data.id}`">
            <h5 class="v-cart-item__name text-xl  font-medium  duration-300  hover:text-blue-700 ">{{ cart_item_data.name }}</h5>
          </router-link>
            <div class="v-cart-item__price text-emerald-500 rounded-md mt-3 font-bold  bg-green-100 px-2 py-1 inline-block whitespace-nowrap">{{ cart_item_data.price }} тг.</div>
        </div>
    </div>
    <div class="flex items-center justify-between rounded-md shrink-0 bg-gray-100 px-2 h-14  mr-10">
        <div @click="decrementItem" class="bg-white rounded-md flex items-center justify-center font-medium w-10 h-10 cursor-pointer">
            <MinusSmIcon class="w-6 text-blue-500" />
        </div>
        <div class="v-cart-item__quantity mx-5 text-gray-700 font-medium text-md w-4 flex justify-center flex-shrin-0">{{ cart_item_data.quantity }}</div>
        <div @click="incrementItem" class="bg-white rounded-md flex items-center justify-center font-medium w-10 h-10 cursor-pointer">
            <PlusSmIcon class="w-6 text-blue-500" />
        </div>
    </div>
    <div class=" flex justify-center w-20 ml-auto">
        <TrashIcon class="btn  v-cart-item__remove_to_cart cursor-pointer text-gray-400 transition   duration-300 w-6 hover:text-red-500 " @click="deleteFromCart" />
    </div>

</div>
</template>

  
  
<script>
import {
    MinusSmIcon,
    PlusSmIcon,
    TrashIcon
} from "@heroicons/vue/outline";
export default {
    name: "v-cart-item",
    components: {
        MinusSmIcon,
        PlusSmIcon,
        TrashIcon
    },
    props: {
        cart_item_data: {
            type: Object,
            default: () => ({})
        }
    },
    methods: {

        decrementItem() {
            this.$emit('decrement')
        },
        incrementItem() {
            this.$emit('increment')
        },
        deleteFromCart() {
            this.$emit('deleteFromCart')
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
            const slug = this.cart_item_data.name
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
    mounted() {
        // this.$emit('update:cart_item_data', { ...this.cart_item_data, quantity: 1 });
    }
};
</script>
  
  
<style></style>
