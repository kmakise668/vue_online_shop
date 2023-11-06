<template>
  <div class="bg-white main-wrapper relative">
    <!-- <canvas id="c"></canvas> -->
    <div class="bubble-container">
      <div class="bubble-wrap">
        <div class="bubble" v-for="n in 3000" :key="n"></div>
      </div>
    </div>
    <div class="relative isolate px-6 lg:px-8">
      <div
        class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        aria-hidden="true"
      >
        <div
          class="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#4568dc] to-[#8057c7] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style="
            clip-path: polygon(
              74.1% 44.1%,
              100% 61.6%,
              97.5% 26.9%,
              85.5% 0.1%,
              80.7% 2%,
              72.5% 32.5%,
              60.2% 62.4%,
              52.4% 68.1%,
              47.5% 58.3%,
              45.2% 34.5%,
              27.5% 76.7%,
              0.1% 64.9%,
              17.9% 100%,
              27.6% 76.8%,
              76.1% 97.7%,
              74.1% 44.1%
            );
          "
        />
      </div>

      <div class="mx-auto max-w-4xl sm:py-12 lg:pt-36 lg:pb-24">
        <div class="text-center mb-10">
          <h1 class="text-2xl font-bold tracking-normal text-gray-900 sm:text-6xl">
            Исследуйте, Мечтайте, Путешествуйте
          </h1>
          <p class="mt-3 text-md leading-6 text-gray-500">
            Мы заботимся о вашем удобстве, чтобы каждое путешествие было полно радости и
            восхищения.
          </p>
          <p class="mt-0 text-md leading-6 text-gray-500">
            Ваше невероятное путешествие начинается здесь.
          </p>
        </div>
        <swiper
          :mousewheel="true"
          :pagination="{ clickable: true }"
          :direction="'horizontal'"
          :effect="'coverflow'"
          :grabCursor="true"
          :centeredSlides="true"
          :coverflowEffect="{
            rotate: 0,
            stretch: 0,
            speed: 13000,
            depth: 100,
            modifier: 3,
            slideShadows: true,
          }"
          :keyboard="{ enabled: true }"
          :initialSlide="2"
          :slidesPerView="5"
          :spaceBetween="0"
          :loop="true"
          :autoplay="{ delay: 3000, disableOnInteraction: false }"
          :breakpoints="{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1560: { slidesPerView: 3 },
          }"
          @swiper="onSwiper"
        >
          <swiper-slide v-for="(slide, index) in slides" :key="index" class="sw_slide">
            <component :is="slide.icon" class="w-14 h-14 text-white z-5 relative mb-4" />
            <img :src="`${slide.imageUrl}`" alt="" />
            <div class="text-container">
              <div class="text-center title font-medium text-white">
                {{ slide.title }}
              </div>
              <div class="text-xs text-center text font-medium text-slate-100">
                {{ slide.text }}
              </div>
            </div>
            <!-- <div class="bubble-container">
              <div class="bubble-wrap">
                <div class="bubble" v-for="n in 100" :key="n"></div>
              </div>
            </div> -->
          </swiper-slide>
        </swiper>
        <div class="mt-10 flex items-center justify-center gap-x-6">
          <a
            href="#"
            class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >Get started</a
          >
          <a href="#" class="text-sm font-semibold leading-6 text-gray-900"
            >Learn more <span aria-hidden="true">→</span></a
          >
        </div>
      </div>

      <div
        class="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        aria-hidden="true"
      >
        <div
          class="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          style="
            clip-path: polygon(
              74.1% 44.1%,
              100% 61.6%,
              97.5% 26.9%,
              85.5% 0.1%,
              80.7% 2%,
              72.5% 32.5%,
              60.2% 62.4%,
              52.4% 68.1%,
              47.5% 58.3%,
              45.2% 34.5%,
              27.5% 76.7%,
              0.1% 64.9%,
              17.9% 100%,
              27.6% 76.8%,
              76.1% 97.7%,
              74.1% 44.1%
            );
          "
        />
      </div>
      <div class="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div
          class="flex flex-col lg:flex-row lg:space-x-2 space-y-2 lg:space-y-0 mb-2 lg:mb-4"
        >
          <div class="w-full lg:w-1/5">
            <div
              class="widget w-full p-4 rounded-lg bg-white border-l-4 border-purple-400"
            >
              <div class="flex items-center">
                <div class="icon w-14 p-3.5 bg-purple-400 text-white rounded-full mr-3">
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    ></path>
                  </svg>
                </div>
                <div class="flex flex-col justify-center">
                  <div class="text-lg">230k</div>
                  <div class="text-sm text-gray-400">Sales</div>
                </div>
              </div>
            </div>
          </div>

          <div class="w-full lg:w-1/5">
            <div class="widget w-full p-4 rounded-lg bg-white border-l-4 border-blue-400">
              <div class="flex items-center">
                <div class="icon w-14 p-3.5 bg-blue-400 text-white rounded-full mr-3">
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                </div>
                <div class="flex flex-col justify-center">
                  <div class="text-lg">3456</div>
                  <div class="text-sm text-gray-400">Customers</div>
                </div>
              </div>
            </div>
          </div>

          <div class="w-full lg:w-1/5">
            <div
              class="widget w-full p-4 rounded-lg bg-white border-l-4 border-yellow-400"
            >
              <div class="flex items-center">
                <div class="icon w-14 p-3.5 bg-yellow-400 text-white rounded-full mr-3">
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                    />
                  </svg>
                </div>
                <div class="flex flex-col justify-center">
                  <div class="text-lg">3456</div>
                  <div class="text-sm text-gray-400">Products</div>
                </div>
              </div>
            </div>
          </div>

          <div class="w-full lg:w-1/5">
            <div class="widget w-full p-4 rounded-lg bg-white border-l-4 border-red-400">
              <div class="flex items-center">
                <div class="icon w-14 p-3.5 bg-red-400 text-white rounded-full mr-3">
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <div class="flex flex-col justify-center">
                  <div class="text-lg">12658</div>
                  <div class="text-sm text-gray-400">Orders</div>
                </div>
              </div>
            </div>
          </div>

          <div class="w-full lg:w-1/5">
            <div
              class="widget w-full p-4 rounded-lg bg-white border-l-4 border-green-400"
            >
              <div class="flex items-center">
                <div class="icon w-14 p-3.5 bg-green-400 text-white rounded-full mr-3">
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div class="flex flex-col justify-center">
                  <div class="text-lg">$948'560</div>
                  <div class="text-sm text-gray-400">Revenue</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    test

    <div class="flex">
      <div v-scroll-reveal="{ duration: 1000 }">
        <div class="block" id="block1" style="width: 50vw; flex-shrink: 0">
          <h1 class="text-4xl font-bold text-black">Блок 1</h1>
        </div>
      </div>

      <div v-scroll-reveal="{ duration: 1000 }">
        <div
          class="opacity-0 transform -translate-y-10 transition-transform transition-opacity duration-1000"
          id="block2"
        >
          <h1 class="text-4xl font-bold text-red-500">
            <!-- Ваш контент для блока 2 -->
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem dolorem
            inventore, quas deserunt deleniti, omnis ratione commodi amet sapiente nostrum
            officia vitae dolore dicta doloribus vel dignissimos velit? Explicabo error
            similique temporibus quod ipsum ratione magni. Asperiores sequi, omnis commodi
            dicta ex animi, qui officia mollitia, quisquam reiciendis totam doloremque
            quae accusantium! Corporis optio perspiciatis minima nihil repellat, maiores
            quaerat quo eveniet consequuntur velit, temporibus vitae numquam cumque
            necessitatibus rerum! Recusandae, beatae hic blanditiis voluptatibus quod quia
            optio nesciunt iure omnis eaque quaerat itaque ex, dolore a labore tempore
            fuga aut reiciendis commodi dicta autem! Harum tenetur distinctio ut a.
          </h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import { EffectCoverflow, Mousewheel, Autoplay, Pagination } from "swiper/modules";
import { createScrollRevealDirective } from "vue-scroll-reveal"; // Import the named export
// import "vue-scroll-reveal/dist/theme-default.css";

import "swiper/swiper-bundle.css";
import SwiperCore from "swiper/core";
import {
  LightBulbIcon,
  GlobeIcon,
  HeartIcon,
  VideoCameraIcon,
  ShoppingBagIcon,
  SparklesIcon,
  UserGroupIcon,
} from "@heroicons/vue/outline";
SwiperCore.use([Pagination, Mousewheel, Autoplay, EffectCoverflow]);

const VueScrollReveal = createScrollRevealDirective(); // Create the directive
export default {
  name: "v-home",
  components: {
    Swiper,
    LightBulbIcon,
    SwiperSlide,
    GlobeIcon,
    HeartIcon,
    VideoCameraIcon,
    ShoppingBagIcon,
    SparklesIcon,
    UserGroupIcon,
  },
  directives: {
    "scroll-reveal": VueScrollReveal,
  },
  data() {
    return {
      scrollRevealOptions: {
        duration: 1000, // Длительность анимации в миллисекундах
        scale: 1, // Фактор масштабирования
        distance: "10px", // Расстояние анимации
        origin: "top", // Начало анимации (top, right, bottom, left)
        viewFactor: 0.5, // Процент элемента, видимый во вьюпорте перед триггером анимации
      },
      slides: [
        {
          title: "Откройте мир вместе с нами",
          text:
            "Готовьтесь к увлекательным экспедициям, осваивайте новые вершины с нашей помощью.",
          icon: "GlobeIcon",
          imageUrl: require("@/assets/images/slide_1.jpeg"),
        },
        {
          title: "Путешествуйте с любовью",
          text:
            "Отдохните с комфортом, имея под рукой наши комфортные товары для приключений.",
          icon: "HeartIcon",
          imageUrl: require("@/assets/images/slide_2.jpeg"),
        },
        {
          title: "Идеи для незабываемых путешествий",
          text:
            "Вдохновитесь креативными гаджетами, которые сделают ваши приключения незабываемыми.",
          icon: "LightBulbIcon",
          imageUrl: require("@/assets/images/slide_3.jpeg"),
        },
        {
          title: "Запишите моменты с видеокамерой",
          text:
            "С нашей видеокамерой каждый момент вашего путешествия останется в памяти.",
          icon: "VideoCameraIcon",
          imageUrl: require("@/assets/images/slide_4.jpeg"),
        },
        {
          title: "Удобство в пути",
          text:
            "Наши сумки и аксессуары сделают путешествие комфортным и удобным. Отправляйтесь в путь с надежным снаряжением.",
          icon: "ShoppingBagIcon",
          imageUrl: require("@/assets/images/slide_5.jpeg"),
        },
        {
          title: "Создайте уникальные воспоминания.",
          text:
            "Наши инновационные товары помогут вам создать незабываемые воспоминания. Исследуйте мир вместе с нами.",
          icon: "SparklesIcon",
          imageUrl: require("@/assets/images/slide_6.jpeg"),
        },
        {
          title: "Поделитесь весельем и комфортом.",
          text: "Объединяйтесь с нами и получайте скидки на наши товары!",
          icon: "UserGroupIcon",
          imageUrl: require("@/assets/images/slide_7.jpeg"),
        },
      ],
    };
  },

  methods: {
    onSwiper(swiper) {
      console.log("Swiper initialized", swiper);
    },
    onSlideChange: function () {
      console.log("Slide change");
    },
  },
};
</script>
