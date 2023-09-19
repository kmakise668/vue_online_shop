<template>
<div class=" my-10" v-if="CART.length">

    <div class="mx-auto max-w-2xl text-center">
        <h2 class="text-3xl font-bold  text-gray-800 sm:text-4xl">Оформить заказ</h2>
        <!-- <h1 class="text-2xl">{{CART.length}}</h1> -->
        <div v-for="item  in CART" :key="item.id">
            {{ item.price  }} {{ item.id }}
        </div>
    </div>
    <form action="#" method="POST" class="mx-auto mt-16 max-w-xl sm:mt-20">
        <div class="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <div>
                <label for="first-name" class="block text-sm font-semibold leading-6 text-gray-900">Имя</label>
                <div class="mt-2.5">
                    <input type="text"  v-model="user.name" name="first-name" id="first-name" autocomplete="given-name" class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
            </div>
            <div>
                <label for="last-name" class="block text-sm font-semibold leading-6 text-gray-900">Email</label>
                <div class="mt-2.5">
                    <input type="text" v-model="user.email"  name="last-name" id="last-name" autocomplete="family-name" class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
            </div>
            <div class="sm:col-span-2">
                <label for="company" class="block text-sm font-semibold leading-6 text-gray-900">Номер телефона</label>
                <div class="mt-2.5">
                    <input type="text" name="company" v-model="user.phone" id="company" autocomplete="organization" class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
            </div>
            <div>

            </div>

            <div class="sm:col-span-2">
                <label for="message" class="block text-sm font-semibold leading-6 text-gray-900">Сообщение</label>
                <div class="mt-2.5">
                    <textarea name="message" id="message" rows="4" class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
          </div>
          <SwitchGroup as="div" class="flex gap-x-4 sm:col-span-2">
            <div class="flex h-6 items-center">
              <Switch v-model="agreed" :class="[agreed ? 'bg-indigo-600' : 'bg-gray-200', 'flex w-8 flex-none cursor-pointer rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600']">
                <span class="sr-only">Agree to policies</span>
                <span aria-hidden="true" :class="[agreed ? 'translate-x-3.5' : 'translate-x-0', 'h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out']" />
              </Switch>
            </div>
            <SwitchLabel class="text-sm leading-6 text-gray-600">
              By selecting this, you agree to our
              {{ ' ' }}
              <a href="#" class="font-semibold text-indigo-600">privacy&nbsp;policy</a>.
            </SwitchLabel>
          </SwitchGroup>
        </div>
        <div class="mt-10">
          <button type="submit" class="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Let's talk</button>
        </div>
      </form>
    </div>
    <div v-else class="text-center my-auto flex flex-col items-center justify-center h-[70vh]">
        <div class="relative mb-4">
            <ShoppingCartIcon class=" w-36 flex items-center text-gray-200  mx-auto justify-center "  />
            <div class="absolute w-12 h-12 text-white flex items-center font-bold text-2xl justify-center bg-blue-200 rounded-full top-0 right-0">0</div>
        </div>
        <div class="text-3xl mb-2 font-bold">Корзина пуста</div>
        <div class="text-gray-600 text-md ">Для заказа добавьте товары в корзину</div>
        <router-link  :to="`/catalog`">
                   <button class="btn v-catalog-item__add_to_cart mx-auto z-2 relative flex  justify-center rounded-md bg-blue-600 px-8 py-3 mt-10 text-md font-semibold leading-6 text-white shadow-sm transition duration-300 hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">Каталог товаров</button>
                </router-link>

    </div>
  
</template>

  
  
<script setup>
import {
    ref
} from 'vue'

//   import { ChevronDownIcon } from '@heroicons/vue/solid'
import {
    ShoppingCartIcon
} from '@heroicons/vue/outline'
import {
    Switch,
    SwitchGroup,
    SwitchLabel
} from '@headlessui/vue'

const agreed = ref(false)
</script>
<script>
import {
    mapGetters
} from 'vuex'
import axios from 'axios';
export default {
    name: 'v-order',
    components: {},
    props: {
        cart_data: {
            type: Array,
            default () {
                return []
            }
        }
    },
    data() {
    return {
      user: {},
    };
  },
  created() {

    const userId = localStorage.getItem('id');


    this.fetchUserData(userId);
  },
    methods: {
    async fetchUserData(userId) {
      try {
        // Используйте userId в URL для получения данных текущего пользователя
        const response = await axios.get(`http://localhost:5555/api/users/${userId}`);
        this.user = response.data;
        
      } catch (error) {
        console.error(error);
      }
    },
  },
    computed: {
        ...mapGetters(['CART']),
    },
}
</script>
